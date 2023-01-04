import React from "react";

import "./TodoItem.css";

class TodoItem extends React.Component {
  render() {
    const { id, title } = this.props.todo;
    const { onDelete } = this.props;
    return (
      <li className="todoitem">
        <span>{title}</span>
        <button className="btn btn--delete" onClick={() => onDelete(id)}>
          delete
        </button>
      </li>
    );
  }
}
// id, title, completed, delete button

export default TodoItem;
