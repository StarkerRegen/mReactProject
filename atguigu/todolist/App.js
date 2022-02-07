import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

export default class App extends Component {
  state = {
    todos: [
      {id: '001', name: '早饭', done: true},
      {id: '002', name: '午饭', done: false}
    ]
  }

  addTodo = (todoObj) => {
    this.setState((prevState)=> ({todos: [todoObj, ...prevState.todos]}));
  }

  updateTodo = (id, done) => {
    const newTodos = this.state.todos.map((todo)=> todo.id === id? {...todo, done}:todo);
    this.setState({todos: newTodos});
  }

  deleteTodo = (id) => {
    const newTodos = this.state.todos.filter((todo)=> todo.id !== id);
    this.setState({todos: newTodos});
  }

  checkAllTodos = (done) => {
    const newTodos = this.state.todos.map((todo) => {
      return {...todo, done}
    });
    this.setState({todos: newTodos});
  }

  deleteFinishedTodos = () => {
    const newTodos = this.state.todos.filter((todo)=> !todo.done);
    this.setState({todos:newTodos});
  }

  render() {
    const {todos} = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo}/>
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
          <Footer todos={todos} checkAllTodos={this.checkAllTodos} deleteFinishedTodos={this.deleteFinishedTodos}/>
        </div>   
    </div>
    )
  }
}
