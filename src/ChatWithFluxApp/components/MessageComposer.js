import React, { Component, PropTypes } from 'react';
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import {
	ENTER_KEY_CODE,
} from '../utils/ChatAppUtils';
import { CREATE_MESSAGE } from '../actions/ChatMessageAction';
export default class MessageComposer extends Component {
	constructor() {
		super();
		this.state = {
			text: '',
		};
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
	}
	handleOnChange(event) {
		this.setState({text: event.target.value});
	}
	handleOnKeyDown(event) {
		if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        ChatAppDispatcher.dispatch({
        	type: CREATE_MESSAGE,
        	text,
        	currentThreadID: this.props.threadID,
        });
      }
      this.setState({text: ''});
    }
	}
	render() {
		return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this.handleOnChange}
        onKeyDown={this.handleOnKeyDown}
      />
    );
	}
}

MessageComposer.propTypes = {
	threadID: PropTypes.string.isRequired,
};