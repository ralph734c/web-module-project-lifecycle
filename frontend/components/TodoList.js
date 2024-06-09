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
              <Todo
                key={todo.id}
                toggleTodoCompleted={this.props.toggleTodoCompleted}
                todo={todo}
              />
            );
          return acc;
        }, [])}
      </>
    );
  }
}
