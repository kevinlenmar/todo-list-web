import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ToDoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            listData: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }
    
    handleSubmit() {
        console.log('An essay was submitted: ' + this.state.value);
        let { listData, value } = this.state;
        listData.push(value);
        console.log(listData);
    }

    render() {
        const list = this.state.listData;

        const dataList = list.map((todo, index) =>{
             
            return (
                <ul key={index} className='data-list'>{todo}</ul>
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