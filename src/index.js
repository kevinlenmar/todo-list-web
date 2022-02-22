import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form }  from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrashFill, BsCheckSquareFill, BsFillBookmarkCheckFill, BsFillBookmarkPlusFill, BsFillPatchCheckFill } from "react-icons/bs";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoInput: '',
            todoUpdate: '',
            listData: [],
            renderUpdate: false,
            errorTodoInput: '',
            errorTodoUpdate: '',
            checkAll: false,
            hasList: false,
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
        this.handleDoneTask = this.handleDoneTask.bind(this);
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
                errorTodoInput: 'Task cannot be empty',
            });
        }
        else if(listData.filter(e => e.name.trim() === todoInput.trim()).length > 0){
            this.setState({
                errorTodoInput: 'Task has the same name in the list',
            });
        }
        else{
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
                errorTodoInput: '',
                hasList: true,
            });
        }
    }

    handleCheckAll(event) {
        const value = event.target.checked;
        const list = this.state.listData;

        const dataList = list.map((todo, index) => {
            if(todo.done === false && todo.todo === false){
                return Object.assign({}, todo, {
                    checked: value, 
                });
            }

            return todo;
        });

        this.setState({
            listData: dataList,
            checkAll: value,
        });
    }

    handleOnCheck(event, position) {
        const checked = event.target.checked;
        const list = this.state.listData;

        const dataList = list.map((todo, index) => {
            if(position === todo.id){
                return Object.assign({}, todo, {
                    checked: checked,
                });
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
            checkAll: (dataList.length === 0) ? false : this.state.checkAll,
            hasList: (dataList.length === 0) ? false : true,
        });
    }

    handleDeleteAll(){
        this.setState({
            listData: [],
            checkAll: false,
            hasList: false,
        });
    }

    handleDeleteTask(id){
        const list = this.state.listData;
        const dataList = list.filter(e => e.id !== id);

        this.setState({
            listData: dataList,
            checkAll: (dataList.length === 0) ? false : this.state.checkAll,
            hasList: (dataList.length === 0) ? false : true,
        });
    }

    handleUpdateTodo(todoInput, id){
        this.setState({
            todoUpdate: todoInput,
            renderUpdate: id,
            errorTodoUpdate: '',
        });
    }

    handleUpdate(id){
        let { listData, todoUpdate } = this.state;

        if(todoUpdate.trim() === ''){
            this.setState({
                errorTodoUpdate: 'Task cannot be empty',
            });
        }
        else if(listData.filter(e => e.id !== id && e.name.trim() === todoUpdate.trim()).length > 0 ){
            this.setState({
                errorTodoUpdate: 'Task has the same name in the list',
            });
        }
        else{
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
                errorTodoUpdate: '',
            });
        }
    }

    handleDoneTask(id){
        const list = this.state.listData;
        const dataList = list.map((todo, index) => {

            if(todo.id === id){
                const element = document.getElementById(todo.id);
                if(todo.todo){
                    element.classList.remove('todo-active');
                }
                element.classList.add('crossed-line');

                return Object.assign({}, todo, {
                    done: true,
                    checked: true,
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
                    <Container key={todo.id} className='col-sm-12 p-2'>
                        {this.state.renderUpdate === todo.id ? (
                            <Container className='col-sm-12 form-control bg-white d-sm-flex flex-row justify-content-sm-end align-items-center align-content-stretch'>
                                <Container className='d-sm-flex flex-row'>
                                    <Form.Control className='bg-white' id={todo.id} type='text' name='todoUpdate' value={this.state.todoUpdate} onChange={this.handleChange} />
                                        {this.state.errorTodoUpdate.length !== 0 ?(
                                            <span className='error-span'>{this.state.errorTodoUpdate}</span>
                                        ) : (
                                            <span></span>
                                        )}
                                </Container>
                                <Container className='d-inline-flex flex-row justify-content-end align-items-center align-content-stretch'>
                                    <div className='d-inline-flex flex-row'>
                                        <BsCheckSquareFill className='text-primary' title='Update Task' onClick={() => this.handleUpdate(todo.id)}/>
                                    </div>
                                </Container>
                            </Container>
                        ) : (
                            <Container className='col-sm-12 form-control bg-white d-sm-flex flex-row justify-content-sm-end align-items-center align-content-stretch'>
                                <Container className='d-sm-flex flex-row'>
                                    <Form.Control className='bg-white' id={todo.id} type='text' name='todoName' value={todo.name} disabled/>
                                </Container>
                                <Container className='d-inline-flex flex-row gap-3 justify-content-end align-items-center align-content-stretch'>
                                    <Form.Check title='Check Task' id={todo.id} checked={todo.checked} onChange={(event) => this.handleOnCheck(event, todo.id)} disabled={todo.done || todo.todo} />
                                    <div className='d-inline-flex flex-row'>
                                        <BsFillPatchCheckFill className='text-success' title='Done Task' onClick={() => this.handleDoneTask(todo.id)} />
                                    </div>
                                    <div className='d-inline-flex flex-row'>
                                        <BsFillPencilFill className='text-info' title='Edit Task' onClick={() => this.handleUpdateTodo(todo.name, todo.id)} />
                                    </div>
                                    <div className='d-inline-flex flex-row'>
                                        <BsFillTrashFill className='text-danger' title='Delete Task' onClick={() => this.handleDeleteTask(todo.id)}/>
                                    </div>
                                </Container>
                            </Container>
                        )}
                    </Container>
            );
        });

        return(
            <Container className='col-sm-12'>
                <Container className='col-sm-12 p-3'>
                    <h1 className='header'>To Do List</h1>
                </Container>
                <Container className='col-sm-12 p-5 bg-light'>
                    <Container className='col-sm-12 p-2 d-grid gap-2 d-sm-flex justify-content-sm-between'>
                        <Form.Control type='text' name='todoInput' value={this.state.todoInput} onChange={this.handleChange} />
                        <Button type='button' variant='primary' size='lg' onClick={() => this.handleSubmit()}>Add</Button>
                    </Container>
                    <Container className='col-sm-12 d-sm-flex justify-content-sm-start'>
                        {this.state.errorTodoInput.length !== 0 ? (
                            <span className='error-span'>{this.state.errorTodoInput}</span>
                        ): (
                            <span></span>
                        )}
                    </Container>
                    <Container className='col-sm-12 mt-3 table-wrapper'>
                        {this.state.hasList ? (
                            <Container className='col-sm-12 p-2 d-inline-flex flex-row gap-3 justify-content-end align-items-center align-content-stretch'>
                                <Form.Check title='Group Check' checked={this.state.checkAll} onChange={(event) => this.handleCheckAll(event)}/>
                                <div className='d-inline-flex flex-row'>
                                    <BsFillBookmarkCheckFill className='text-success' title='Done Task' onClick={() => this.handleDone()} />
                                </div>
                                <div className='d-inline-flex flex-row'>
                                    <BsFillBookmarkPlusFill className='text-primary' title='To Do Task' onClick={() => this.handleTodo()} />
                                </div>
                            </Container>
                        ) : (
                            <span></span>
                        )}
                        {dataList}
                    </Container>
                </Container>
                <Container className='col-sm-12 p-5'>
                    {this.state.hasList ? (
                        <Container className='col-sm-12 d-grid gap-2 d-sm-flex justify-content-sm-between'>
                            <Button className='col-sm-3' type='button' variant='danger' size='lg' onClick={() => this.handleDeleteDone()}>Delete done task</Button>
                            <Button className='col-sm-3' type='button' variant='danger' size='lg' onClick={() => this.handleDeleteAll()}>Delete all task</Button>
                        </Container>
                    ) : (
                        <span></span>
                    )}
                </Container>
            </Container>
        );
        
    }
}


ReactDOM.render(
    <ToDoList />,
    document.getElementById('root')
);