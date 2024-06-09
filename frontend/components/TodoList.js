import React from "react";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    return (
      <>
        <h2>Todos:</h2>
        {this.props.todos.reduce((acc, todo) => {
          if (this.props.displayComplete || !todo.completed)
            return acc.concat(
              <div
                onClick={this.props.toggleTodoCompleted(todo.id)}
                key={todo.id}
                id={todo.completed ? "todo-complete" : "todo"}
              >
                {todo.name}
                {todo.completed ? " 🔥" : ""}
              </div>
            );
          return acc;
        }, [])}
      </>
    );
  }
}
