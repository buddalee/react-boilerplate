import React, { Component } from 'react';
import ThreadListItem from './ThreadListItem';
import ThreadStore from '../stores/ThreadStore';
import UnreadThreadStore from '../stores/UnreadThreadStore';
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';

export default class ThreadSection extends Component {
	constructor() {
		super();
		this.state = {
			threads: ThreadStore.getAllChrono(),
			currentThreadID: ThreadStore.getCurrentID(),
			unreadCount: UnreadThreadStore.getCount(),
		};
		this.getStateFromStores = this.getStateFromStores.bind(this);
	}
	componentDidMount() {
		// Store 綁定 更新事件
		ThreadStore.addChangeListener(this.getStateFromStores);
		UnreadThreadStore.addChangeListener(this.getStateFromStores);
	}
	componentWillUnmount() {
		// Store 解除 更新事件
		ThreadStore.removeChangeListener(this.getStateFromStores);
		UnreadThreadStore.removeChangeListener(this.getStateFromStores);
	}
	getStateFromStores() {
		// 由Store取資料, 更新View state
		this.setState({
			threads: ThreadStore.getAllChrono(),
			currentThreadID: ThreadStore.getCurrentID(),
			unreadCount: UnreadThreadStore.getCount(),
		});
	}
  render() {
  	const threadListItems = this.state.threads.map((thread) => 
		 	<ThreadListItem
	      key={thread.id}
	      thread={thread}
	      currentThreadID={this.state.currentThreadID}
	    />);
	   const unread = this.state.unreadCount === 0 ? null : (<span>未讀: {this.state.unreadCount}</span>);
    return (
      <div className="thread-section">
      	<div className="thread-count">
          {unread}
        </div>
        <ul className="thread-list">
        	{threadListItems}
        </ul>
      </div>
    );
  }
}