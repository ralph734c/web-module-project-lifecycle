import React from "react";

export default class Todo extends React.Component {
  render() {
    return (
      <>
        <div
          onClick={this.props.toggleTodoCompleted(this.props.todo.id)}
          id={this.props.todo.completed ? "todo-complete" : "todo"}
        >
          {this.props.todo.name}
          {this.props.todo.completed ? " 🔥" : ""}
        </div>
      </>
    );
  }
}
