import React, { Component } from 'react';
import ThreadListItem from './ThreadListItem';
import ThreadStore from '../store/ThreadStore';
import UnreadThreadStore from '../store/UnreadThreadStore';
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
		// Store 綁定事件
		ThreadStore.addChangeListener(this.getStateFromStores);
		UnreadThreadStore.addChangeListener(this.getStateFromStores);
	}
	componentWillUnmount() {
		// Store 解除綁定
		ThreadStore.removeChangeListener(this.getStateFromStores);
		UnreadThreadStore.removeChangeListener(this.getStateFromStores);
	}
	getStateFromStores() {
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
      	<div className="">
          {unread}
        </div>
        <ul>
        	{threadListItems}
        </ul>
      </div>
    );
  }
}