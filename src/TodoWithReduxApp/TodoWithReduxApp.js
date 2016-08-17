import React, { Component, PropTypes } from 'react';
import 'font-awesome/css/font-awesome.css';
import Window from '../components/Window/';
import { Link } from 'react-router';
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
  	let container = null;
  	if (this.props.children) {
  		container = (<div>{this.props.children}</div>)
  	} else {
  		container = (<div>
  			<div>我是母頁面!!!</div>
        <button onClick={this.handleOpenWin}>點我會出現視窗</button>
        {this.renderWin()}
        <div><Link to="/todolist">請點我TodoList 子頁面</Link></div>
  		</div>);
  	}
    return (
      <div>
      	{container}
      </div>
    );
  }
}

TodoWithReduxApp.propTypes = {
	children: PropTypes.object,
};
