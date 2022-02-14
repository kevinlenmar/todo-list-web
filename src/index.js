import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ToDoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            listdata: [
                {name: 'Kevin', age: '23'}, 
                {name: 'John', age: '25'}, 
                {name: 'Eric', age: '20'}, 
                {name: 'Justin', age: '18'}, 
            ]
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }
    
    handleSubmit(event) {
        console.log('An essay was submitted: ' + this.state.value);
        this.setState({
            value: '',
        });
    }

    render() {
        const list = this.state.listdata;

        const dataList = list.map((name, index) =>{
             
            return (
                <ul key={index} className='data-list'>Name: {name.name}, Age: {name.age}</ul>
            );
        });

        return(
            <div className='todo-list-page'>
                <h1 className='todo-title'> To Do Input </h1>
                <div className='todo-input'>
                    <input type='text' name='input-text' value={this.state.value} onChange={this.handleChange} />
                    <button className='newtask-button' onClick={() => this.handleSubmit()}> Add new task </button>
                </div>
                <div>
                    <h1 className='todo-title'>To Do List</h1>
                    <div>
                        <button className='todo-button-success'>All</button>
                        <button className='todo-button-success'>Done</button>
                        <button className='todo-button-success'>Todo</button>
                    </div>
                </div>
                <div className='todo-list'>
                    {dataList}
                </div>
                <div>
                    <button className='todo-button-delete'>Delete done task</button>
                    <button className='todo-button-delete'>Delete all task</button>
                </div>
            </div>
        );
        
    }
}


ReactDOM.render(
    <ToDoList />,
    document.getElementById('root')
);