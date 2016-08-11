import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import Window from '../components/Window/';
import TodoList from './components/TodoList/'
export default class TodoWithReduxApp extends Component {
	constructor() {
		super();
		this.state = {
			isWinOpen: false,
		};
		this.handleCloseWin = this.handleCloseWin.bind(this);
		this.handleOpenWin = this.handleOpenWin.bind(this);
	}
	handleCloseWin() {
		this.setState({
			isWinOpen: false,
		});
	}
	handleOpenWin() {
		this.setState({
			isWinOpen: true,
		});
	}
	renderWin() {
		if(this.state.isWinOpen) {
			return (
			<Window
        title={'我是視窗'}
        onClose={this.handleCloseWin}
      ><h1>我是內容拉</h1>
      </Window>);
		}
		return null;
	}
  render() {
    return (
      <div>
        Todo List
        <button onClick={this.handleOpenWin}>點我會出現視窗</button>
        {this.renderWin()}
        <div><TodoList /></div>
      </div>
    );
  }
}