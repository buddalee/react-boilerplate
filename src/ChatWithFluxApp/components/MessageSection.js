import React, { Component, PropTypes } from 'react';
import MessageListItem from './MessageListItem';
import MessageComposer from './MessageComposer';
import MessageStore from '../stores/MessageStore';
import ThreadStore from '../stores/ThreadStore';
export default class MessageSection extends Component {
	constructor() {
		super();
		this.state = {
			messages: MessageStore.getAllForCurrentThread(),
    	thread: ThreadStore.getCurrentThread(),
		};
		this.handleChange = this.handleChange.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);
	}
  componentDidMount() {
    this.scrollToBottom();
    MessageStore.addChangeListener(this.handleChange);
    ThreadStore.addChangeListener(this.handleChange);
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentWillUnmount() {
    MessageStore.removeChangeListener(this.handleChange);
    ThreadStore.removeChangeListener(this.handleChange);
  }
	handleChange() {
		this.setState({
			messages: MessageStore.getAllForCurrentThread(),
    	thread: ThreadStore.getCurrentThread(),
		});
	}
	scrollToBottom() {
		const ul = this.refs.messageList;
    ul.scrollTop = ul.scrollHeight;
	}
	render() {
		const { thread, messages } = this.state;
		const messageListItems = messages.map((item) =>
	    <MessageListItem
	      key={item.id}
	      message={item}
	    />
		);
		return (
      <div className="message-section">
        <h3 className="message-thread-heading">{thread.name}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadID={thread.id}/>
      </div>
    );
	}
}
