import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col }  from 'react-bootstrap';
import { Container } from 'react-bootstrap';

class ToDoList extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            value: '',
            listData: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleOnCheck = this.handleOnCheck.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    handleChange(event) {

        this.setState({
            value: event.target.value
        });
    }
    
    handleSubmit() {

        let { listData, value } = this.state;
        listData.push({
            name: value,
            checked: false,
            done: false,
        });

        this.setState({
            listData: listData,
            value: '',
        });
    }

    handleCheckAll() {

        const list = this.state.listData;
        const dataList = list.map((todo, index) => {
            
            return Object.assign({}, todo, {
                checked: true, 
            });
        });

        this.setState({
            listData: dataList,
        });
    }

    handleOnCheck(event, position) {

        const checked = event.target.checked;
        const list = this.state.listData;

        const dataList = list.map((todo, index) => {
            
            if(position === index){
                if(checked){
                    return Object.assign({}, todo, {
                        checked: true,
                    });
                }
                else{
                    return Object.assign({}, todo, {
                        checked: false,
                    });
                }
            }
            
            return todo;
        });

        this.setState({
            listData: dataList,
        });
    }

    handleDone(){
        const list = this.state.listData;
        const dataList = list.map((todo, index) => {

            if(todo.checked){
                return Object.assign({}, todo, {
                    done: true,
                });
            }

            return todo;
        });

        this.setState({
            listData: dataList,
        });
    }

    render() {
        const list = this.state.listData;

        const dataList = list.map((todo, index) =>{
             
            return (
                <Container key={index} className='p-2'>
                    <Row className='p-2 bg-white border'>
                        <Col className='col-10'>
                            {todo.name}
                        </Col>
                        <Col className='col-2'>
                            <Form.Check id={index} type='checkbox' name='checkbox' checked={todo.checked} onChange={(event) => this.handleOnCheck(event, index)} disabled={todo.done} />
                        </Col>
                    </Row>
                </Container>
            );
            
        });

        return(
            <Container className='p-5'>
                <h1 className='header'>To Do Input</h1>
                <Container className='p-5 bg-light'>
                    <Container className='d-grid gap-2'>
                        <Form.Control type='text' value={this.state.value} onChange={this.handleChange} />
                        <Button type='button' variant='primary' size='lg' onClick={() => this.handleSubmit()}> Add new task </Button>
                    </Container>
                </Container>
                <Container className='p-5'>
                    <h1 className='header'>To Do List</h1>
                    <Container className='gap-2 d-flex'>
                        <Button className='col-3 me-auto' type='button' variant='primary' size='lg' onClick={() => this.handleCheckAll()}>All</Button>
                        <Button className='col-3' type='button' variant='primary' size='lg' onClick={() => this.handleDone()}>Done</Button>
                        <Button className='col-3 ms-auto' type='button' variant='primary' size='lg'>Todo</Button>
                    </Container>
                </Container>
                <Container className='p-5 bg-light'>
                    {dataList}
                </Container>
                <Container className='p-5'>
                    <Container className='gap-2 d-flex'>
                        <Button className='col-3 me-auto' type='button' variant='danger' size='lg'>Delete done task</Button>
                        <Button className='col-3 ms-auto' type='button' variant='danger' size='lg'>Delete all task</Button>
                    </Container>
                </Container>
            </Container>
        );
        
    }
}


ReactDOM.render(
    <ToDoList />,
    document.getElementById('root')
);