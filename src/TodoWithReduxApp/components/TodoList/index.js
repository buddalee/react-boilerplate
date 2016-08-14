import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TodoListItem from '../TodoListItem/';
import { postTodo, getTodos } from '../../actions/todos';
class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
    this.handlePost = this.handlePost.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
  }
  componentDidMount() {
    this.props.getTodos();
  }
  handlePost() {
    this.props.postTodo(this.state.text);
  }
  saveTodo(event) {
    this.setState({
      text: event.target.value,
    });
  }
  render() {
    const { todos } = this.props.todoList; 
    return (<div>
      <input type="text" placeholder="請輸入你的Todo" onChange={this.saveTodo} />
      <button onClick={this.handlePost}>送出Todo</button>
      <ul>
        {todos.map((todo) => <TodoListItem todo={todo} key={todo._id} />)}
      </ul>
    </div>);
  }
}
TodoList.propTypes = {
  todos: PropTypes.array,
  postTodo: PropTypes.func,
  getTodos: PropTypes.func,
};    
TodoList.defaultProps = {
  todoList: PropTypes.shape({
    todos: PropTypes.array,
    todo: PropTypes.object,
    id: PropTypes.string,
  }),
};
function mapStateToProps(state) {
  console.log(state);
  const { todoList } = state;
  return {
    todoList,
  };
}
export default connect(mapStateToProps, {
  postTodo,
  getTodos,
})(TodoList);