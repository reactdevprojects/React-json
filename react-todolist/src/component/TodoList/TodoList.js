import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { getTodos, addTodo, removeTodo, updateTodo } from "../../apis/TodoApis";

import "./TodoList.css";

class TodoList extends React.Component {
  state = {
    editId: null,
    todos: [],
    inputText: "",
  };

  handleEdit = (id) => {
    this.setState({
      editId:id
    })
  }

handleUpdate=(id,title) =>{
  updateTodo(id,title).then((res)=>{
    this.setState({
      editId:null,
      todos: this.state.todos.map(item =>{
       if(item.id === id){
        return res
      }else{
return item
        }
      } )
    })
  })
}

handleCompleted = (id) => {
  this.setState({
      todos: this.state.todos.map((item) => {
          if (item.id === id) {
              return { ...item, completed: !item.completed }
          } else {
              return item;
          }
      }),
  })
}

  handleInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText.trim() === "") {
      return;
    } else {
      const newTodo = {
        title: this.state.inputText,
        completed: false,
      };

      addTodo(newTodo).then((todo) => {
        this.setState({
          todos: [...this.state.todos, todo],
          inputText: "",
        });
      });
    }
  };

  handleDelete = (id) => {
    removeTodo(id).then(() => {
      this.setState({
        todos: this.state.todos.filter((todo) => id !== todo.id),
      });
    });
  };

  render() {
    console.log(this.state.editId)
    const pendingTodos = this.state.todos.filter((item) => !item.completed);
    const completedTodos = this.state.todos.filter((item) => item.completed);
    return (
      <section className="todolist">
        <header className="todolist__header">
          <h4>Todo List</h4>
        </header>
        <form className="todolist__form">
          <input
            type="text"
            className="todolist__input"
            onChange={this.handleInputChange}
            value={this.state.inputText}
          />
          <button className="btn btn--primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        <ul className="todolist__content">
          {pendingTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} isEdit={todo.id === this.state.editId} handleEdit={this.handleEdit} handleUpdate={this.handleUpdate} handleCompleted={this.handleCompleted} onDelete={this.handleDelete} />
          ))}
          <hr/>
      
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} isEdit={todo.id === this.state.editId} handleEdit={this.handleEdit} handleUpdate={this.handleUpdate} handleCompleted={this.handleCompleted} onDelete={this.handleDelete} />
          ))}
        </ul>
      </section>
    );
  }

  componentDidMount() {
    getTodos().then((data) => {
      console.log(data);
      this.setState({
        todos: data,
      });
    });
  }
}

export default TodoList;
