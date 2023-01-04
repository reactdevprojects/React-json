import React from "react";

import "./TodoItem.css";

class TodoItem extends React.Component {
  state= {
    input: this.props.todo.title
  }
  handleChange = (event) =>{
    this.setState({
      input:event.target.value
    })
    console.log(this.state.input)
  }
  render() {
    const { id, title } = this.props.todo;
    const { onDelete, isEdit, handleEdit, handleUpdate } = this.props;
    return (
      <li className="todoitem">
       {/* {(()=>{
        if(isEdit){
          return <input/>
        }else{
         return <span>{title}</span>
        }
       
       })()} */}

       {isEdit?<input value={this.state.input} onChange={this.handleChange}/>:<span>{title}</span>}
       {isEdit?<button onClick={()=>{
        handleUpdate(id,this.state.input)
       }}>Update</button>:<button onClick={()=>handleEdit(id)}>Edit</button>}
       
        <button className="btn btn--delete" onClick={() => onDelete(id)}>
          delete
        </button>
      </li>
    );
  }
}
// id, title, completed, delete button

export default TodoItem;
