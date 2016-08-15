import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TodoListItem from '../TodoListItem/';
import Window from '../../../components/Window/';
import { initialize } from 'redux-form';
import TodoListForm, { TodoListFormFields } from '../TodoListForm/';
import { postTodo, getTodos, getOptions } from '../../actions/todos';
class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      winType: '',
      isWinOpen: false,
    };
    this.handlePost = this.handlePost.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCloseWin= this.handleCloseWin.bind(this);
    this.renderWin = this.renderWin.bind(this);
  }
  componentDidMount() {
    this.props.getTodos();
    this.props.getOptions();
  }
  handleCloseWin(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      isWinOpen: false,
    });
  }
  // handleOpenWin(event) {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   this.setState({
  //     isWinOpen: true,
  //   });
  // }
  initFormData(datas) {
    if (typeof(datas) === 'undefined') {
      this.props.initialize('TodoListForm', {
        name: '',
        age: 0,
        relationship: '',
      }, TodoListFormFields);
    }
    // todo PUT
  }
  handlePost() {
    // this.props.postTodo(this.state.text);
    this.setState({
      winType: 'post',
      isWinOpen: true,
    });
    this.initFormData();
  }
  handleFormSubmit(datas) {
    this.setState({
      isWinOpen: false,
    });
    console.log('submit Here',datas);
    const postData = {
      name: datas.name,
      age: datas.age,
      relationship: datas.relationship
    };
    this.props.postTodo(postData);
  }
  saveTodo(event) {
    this.setState({
      text: event.target.value,
    });
  }
  renderWin() {
    const { options } = this.props.todoList;
    if (this.state.isWinOpen && this.state.winType === 'post') {
      return(
      <Window
        onClose={this.handleCloseWin}
      >
        <TodoListForm
          onSubmit={this.handleFormSubmit}
          options={options}
        />
      </Window>);
    }
  }
  render() {
    const { todos } = this.props.todoList;
    return (<div>
      {this.renderWin()}
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
  getOptions: PropTypes.func,
  initialize: PropTypes.func,
  options: PropTypes.array,
};    
TodoList.defaultProps = {
  todoList: PropTypes.shape({
    todos: PropTypes.array,
    todo: PropTypes.object,
    id: PropTypes.string,
  }),
};
function mapStateToProps(state) {
  const { todoList } = state;
  return {
    todoList,
  };
}
export default connect(mapStateToProps, {
  postTodo,
  getTodos,
  getOptions,
  initialize,
})(TodoList);