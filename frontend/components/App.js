import React from "react";
import axios from "axios";
import Form from "./Form";
import TodoList from "./TodoList";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  getTodos = async () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch((err) => {
        debugger
      });
  };

  componentDidMount() {
    this.getTodos()
    // const todosResponse = this.getTodos();
    // this.setState({ todos: todosResponse });
  }

  render() {
    return (
      <div>
        <div id="error">Error: No error here</div>
        {
          this.state.todos.map(todo => {
            return <div key={todo.id}>{todo.name}</div>
          })
        }
      </div>
    );
  }
}
