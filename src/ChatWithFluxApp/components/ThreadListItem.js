import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import { CLICK_THREAD } from '../actions/ChatThreadAction';

export default class ThreadListItem extends Component {
    constructor() {
    	super();
    	this.threadItemClick = this.threadItemClick.bind(this);
    }
    threadItemClick() {
    	const { id } = this.props.thread;
    	ChatAppDispatcher.dispatch({
    		type: CLICK_THREAD,
    		threadID: id,
    	});
    }
    render() {
    const {
    	thread,
    	currentThreadID,
    } = this.props;
    return (
    	<li
    	  className={classNames({
    	  	'thread-list-item': true,
    	  	'active': thread.id === currentThreadID
    	  })}
    	  onClick={this.threadItemClick}
    	>
    	<h5 className="thread-name">{thread.name}</h5>
    	<div className="thread-time">
    			{thread.lastMessage.date.toLocaleTimeString()}
    	</div>
    	<div className="thread-last-message">
    		{thread.lastMessage.text}
    	</div>
    </li>);
  }
}
ThreadListItem.propTypes = {
	thread: PropTypes.object,
	currentThreadID: PropTypes.string,
};