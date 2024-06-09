import React from "react";

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.onTodoSubmit}>
          <input
            value={this.props.todoName}
            type="text"
            placeholder="Type a todo"
            onChange={this.props.handleTodoNameInput}
          />
          <button type="submit">Submit</button> <br />
        </form>
        <button onClick={this.props.clearCompletedTodos}>
          {this.props.displayComplete ? "Hide" : "Show"} Completed
        </button>
      </>
    );
  }
}
