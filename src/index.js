import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col }  from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";

class ToDoList extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            todoInput: '',
            todoUpdate: '',
            listData: [],
            renderUpdate: false,
            errorTodoInput: false,
            errorTodoUpdate: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleOnCheck = this.handleOnCheck.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleTodo = this.handleTodo.bind(this);
        this.handleDeleteDone = this.handleDeleteDone.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(event) {

        const value = event.target.value;
        this.setState({
            [event.target.name]: value,
        });
    }
    
    handleSubmit() {
        
        let { listData, todoInput } = this.state;

        if(todoInput.trim() === ''){

            this.setState({
                errorTodoInput: true,
            });

        }else{

            const list = listData;
            let id = 1;

            if(list.length > 0){
                const item = list.slice(-1);
                id = 1 + item[0].id;
            }

            listData.push({
                id: id,
                name: todoInput,
                checked: false,
                done: false,
                todo: false,
            });

            this.setState({
                listData: listData,
                todoInput: '',
                errorTodoInput: false,
            });
        }
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
            
            if(position === todo.id){
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

                const element = document.getElementById(todo.id);
                if(todo.todo){
                    element.classList.remove('todo-active');
                }
                element.classList.add('crossed-line');

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

    handleTodo(){
        const list = this.state.listData;
        const dataList = list.map((todo, index) => {
            
            if(todo.checked){

                if(todo.done === false){
                    const element = document.getElementById(todo.id);
                    element.classList.add('todo-active');
                }
                
                return Object.assign({}, todo, {
                    todo: true,
                });
            }

            return todo;
        });

        this.setState({
            listData: dataList,
        });
    }

    handleDeleteDone(){
        const list = this.state.listData;
        const dataList = list.filter(e => e.done === false);

        this.setState({
            listData: dataList,
        });
    }

    handleDeleteAll(){
        this.setState({
            listData: []
        });

        console.log(this.state.listData);
    }

    handleDeleteTask(id){
        const list = this.state.listData;
        const dataList = list.filter(e => e.id !== id);

        this.setState({
            listData: dataList,
        });
    }

    handleUpdateTodo(todoInput, id){
        this.setState({
            todoUpdate: todoInput,
            renderUpdate: id,
        });
    }

    handleUpdate(id){

        let { listData, todoUpdate } = this.state;
        const list = listData;
        
        const dataList = list.map((todo, index) => {
            
            if(todo.id === id){
                
                return Object.assign({}, todo, {
                    name: todoUpdate,
                });
            }

            return todo;
        });

        this.setState({
            listData: dataList,
            renderUpdate: false,
        });
    }

    render() {
        const list = this.state.listData;

        const dataList = list.map((todo, index) =>{
             
            return (
                <Container key={todo.id} className='p-2'>
                        {this.state.renderUpdate === todo.id ? (
                            <Row>
                                <Col id={todo.id} className='col-11'>
                                    <Form.Control id={todo.id} type='text' name='todoUpdate' value={this.state.todoUpdate} onChange={this.handleChange} />
                                </Col>
                                <Col className='col-1 d-flex'>
                                    <AiFillCheckCircle onClick={() => this.handleUpdate(todo.id)}/>
                                </Col>
                            </Row>
                        ) : (
                            <Row className='bg-white border'>
                                <Col id={todo.id} className='col-11'>
                                    {todo.name}
                                </Col>
                                <Col className='col-1 d-flex'>
                                    <Form.Check className='me-auto' id={todo.id} type='checkbox' name='checkbox' checked={todo.checked} onChange={(event) => this.handleOnCheck(event, todo.id)} disabled={todo.done} />
                                    <BsFillPencilFill onClick={() => this.handleUpdateTodo(todo.name, todo.id)}/>
                                    <BsFillTrashFill className='ms-auto' onClick={() => this.handleDeleteTask(todo.id)}/>
                                </Col>
                            </Row>
                        )}
                </Container>
            );
        });

        return(
            <Container className='p-5'>
                <h1 className='header'>To Do Input</h1>
                <Container className='p-5 bg-light'>
                    <Container className='d-grid gap-2'>
                        <Form.Control type='text' name='todoInput' value={this.state.todoInput} onChange={this.handleChange} />
                        {this.state.errorTodoInput ? (
                            <span>Todo Input cannot be empty</span>
                        ): (
                            <span></span>
                        )}
                        <Button type='button' variant='primary' size='lg' onClick={() => this.handleSubmit()}> Add new task </Button>
                    </Container>
                </Container>
                <Container className='p-5'>
                    <h1 className='header'>To Do List</h1>
                    <Container className='gap-2 d-flex'>
                        <Button className='col-3 me-auto' type='button' variant='primary' size='lg' onClick={() => this.handleCheckAll()}>All</Button>
                        <Button className='col-3' type='button' variant='primary' size='lg' onClick={() => this.handleDone()}>Done</Button>
                        <Button className='col-3 ms-auto' type='button' variant='primary' size='lg' onClick={() => this.handleTodo()}>Todo</Button>
                    </Container>
                </Container>
                <Container className='p-5 bg-light'>
                    {dataList}
                </Container>
                <Container className='p-5'>
                    <Container className='gap-2 d-flex'>
                        <Button className='col-3 me-auto' type='button' variant='danger' size='lg' onClick={() => this.handleDeleteDone()}>Delete done task</Button>
                        <Button className='col-3 ms-auto' type='button' variant='danger' size='lg' onClick={() => this.handleDeleteAll()}>Delete all task</Button>
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