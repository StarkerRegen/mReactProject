import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
    handleChange = (event)=> {
        this.props.checkAllTodos(event.target.checked);
    }
    render() {
        const {todos, deleteFinishedTodos} = this.props;
        const finished = todos.reduce((pre, cur)=> pre + (cur.done ? 1:0), 0);
        const total = todos.length;
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked={finished === total && finished? true:false} onChange={this.handleChange}/>
                </label>
                <span>已完成{finished}/全部{total}</span>
                <button className="btn btn-danger" onClick={deleteFinishedTodos}>清除已完成任务</button>
            </div>
        )
    }
}
