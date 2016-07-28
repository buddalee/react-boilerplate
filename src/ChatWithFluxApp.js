import React, { Component } from 'react';
import ThreadSection from './ChatWithFluxApp/components/ThreadSection';
// import MessageSection from './ChatWithFluxApp/components/MessageSection';
export default class ChatWithFluxApp extends Component {
  render() {
    return (
      <div>
        這是聊天室拉
        <ThreadSection />
        {/* <MessageSection /> */}
      </div>
    );
  }
}