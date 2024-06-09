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
      displayComplete: true,
    };
  }

  handleTodoNameInput = (event) => {
    const { value } = event.target;
    this.setState({ ...this.state.newTodoName, newTodoName: value });
  };

  updateApiResponseError = (err) => {
    this.setState({
      ...this.state.error,
      error: err.response.data.message,
    });
  };

  resetForm = () => {
    this.setState({ ...this.state, todoName: "" });
  };

  postTodo = async () => {
    axios
      .post(URL, { name: this.state.newTodoName })
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(res.data.data),
        });
        this.resetForm();
      })
      .catch(this.updateApiResponseError);
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
      .catch(this.updateApiResponseError);
  };
  toggleTodoCompleted = (id) => () => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((todo) => {
            if (todo.id !== id) return todo;
            return res.data.data;
          }),
        });
      })
      .catch(this.updateApiResponseError);
  };

  clearCompletedTodos = () => {
    this.setState({
      ...this.state,
      displayComplete: !this.state.displayComplete,
    });
  };

  componentDidMount() {
    this.getTodos();
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          <div id="error">Error: {this.state.error}</div>
        ) : (
          "Success!"
        )}
        {this.state.todos.reduce((acc, todo) => {
          if (this.state.displayComplete || !todo.completed)
            return acc.concat(
              <div
                onClick={this.toggleTodoCompleted(todo.id)}
                key={todo.id}
                id={todo.completed ? "todo-complete" : "todo"}
              >
                {todo.name}
                {todo.completed ? " 🔥" : ""}
              </div>
            );
          return acc;
        }, [])}
        <form onSubmit={this.onTodoSubmit}>
          <input
            value={this.state.todoName}
            type="text"
            placeholder="Type a todo"
            onChange={this.handleTodoNameInput}
          />
          <button type="submit">Submit</button> <br />
          <br />
        </form>
        <button onClick={this.clearCompletedTodos}>
          {this.state.displayComplete ? "Hide" : "Show"} Completed
        </button>
      </div>
    );
  }
}
