import React, { Component } from 'react';
import ThreadSection from './components/ThreadSection';
import MessageSection from './components/MessageSection';
import './style/style.css';
export default class ChatWithFluxApp extends Component {
  render() {
    return (
      <div>
        這是聊天室拉
        <ThreadSection />
        <MessageSection />
      </div>
    );
  }
}