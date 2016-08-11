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
    const { todos } = this.props; 
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
  todos: [],
};
function mapStateToProps(state) {
  const { todos } = state;
  return {
    todos,
  };
}
export default connect(mapStateToProps, {
  postTodo,
  getTodos,
})(TodoList);