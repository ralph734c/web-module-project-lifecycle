import React from "react";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    return (
      <>
        <h2>Todos:</h2>
        <Todo />
      </>
    );
  }
}
