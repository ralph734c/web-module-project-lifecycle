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
          ""
        )}
        <TodoList
          toggleTodoCompleted={this.toggleTodoCompleted}
          todos={this.state.todos}
          displayComplete={this.state.displayComplete}
        />
        <Form
          onTodoSubmit={this.onTodoSubmit}
          handleTodoNameInput={this.handleTodoNameInput}
          clearCompletedTodos={this.clearCompletedTodos}
          todoName={this.state.todoName}
          displayComplete={this.state.displayComplete}
        />
      </div>
    );
  }
}
