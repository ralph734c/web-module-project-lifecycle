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
      error: "",
      newTodoName: "",
    };
  }

  handleTodoNameInput = (event) => {
    const { value } = event.target;
    this.setState({ ...this.state.newTodoName, newTodoName: value });
  };

  postTodo = async () => {
    axios
      .post(URL, { name: this.state.newTodoName })
      .then((res) => {
        this.getTodos();
        this.setState({ ...this.state, todoName: "" });
      })
      .catch((err) => {
        this.setState({
          ...this.state.error,
          error: err.response.data.message,
        });
      });
  };

  onTodoSubmit = (event) => {
    event.preventDefault();
    this.postTodo();
  };

  getTodos = async () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) => {
        this.setState({
          ...this.state.error,
          error: err.response.data.message,
        });
      });
  };

  componentDidMount() {
    this.getTodos();
    // const todosResponse = this.getTodos();
    // this.setState({ todos: todosResponse });
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          <div id="error">Error: {this.state.error}</div>
        ) : (
          "Success!"
        )}
        {this.state.todos.map((todo) => {
          return <div key={todo.id}>{todo.name}</div>;
        })}
        <form onSubmit={this.onTodoSubmit}>
          <input
            value={this.state.todoName}
            type="text"
            placeholder="Type a todo"
            onChange={this.handleTodoNameInput}
          />
          <button type="submit">Submit</button> <br />
          <br />
          <button>Hide Completed</button>
        </form>
      </div>
    );
  }
}
