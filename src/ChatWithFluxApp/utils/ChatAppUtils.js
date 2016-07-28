import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import {
  RECEIVE_RAW_MESSAGES,
  RECEIVE_RAW_CREATED_MESSAGE,
} from '../actions/ChatServerAction';
import ThreadStore from '../stores/ThreadStore';

export const CHANGE_EVENT = 'CHANGE_EVENT';

export function markAllInThreadRead(threadID, messages) {
  for (var id in messages) {
    if (messages[id].threadID === threadID) {
      messages[id].isRead = true;
    }
  }
  return messages;
}


export function addMessages(rawMessages, messages) {
  rawMessages.forEach(function(messageItem) {
    if (!messages[messageItem.id]) {
      messages[messageItem.id] = this.convertRawMessage(
        messageItem,
        ThreadStore.getCurrentID()
      );
    }
  });
  return messages;
}

export function convertRawMessage (rawMessage, currentThreadID) {
  return {
    id: rawMessage.id,
    threadID: rawMessage.threadID,
    authorName: rawMessage.authorName,
    date: new Date(rawMessage.timestamp),
    text: rawMessage.text,
    isRead: rawMessage.threadID === currentThreadID
  };
},

export function getCreatedMessageData (text, currentThreadID) {
  const timestamp = Date.now();
  return {
    id: 'm_' + timestamp,
    threadID: currentThreadID,
    authorName: 'Bill', // hard coded for the example
    date: new Date(timestamp),
    text: text,
    isRead: true
  };
}

export function getAllMessages () {
    // simulate retrieving data from a database
  const rawMessages = JSON.parse(localStorage.getItem('messages'));
  ChatAppDispatcher.dispatch({
    type: RECEIVE_RAW_MESSAGES,
    rawMessages,
  });
}

export function createMessage (message, threadName) {
  // simulate writing to a database
  let rawMessages = JSON.parse(localStorage.getItem('messages'));
  const timestamp = Date.now();
  const id = 'm_' + timestamp;
  const threadID = message.threadID || ('t_' + Date.now());
  const createdMessage = {
    id: id,
    threadID: threadID,
    threadName: threadName,
    authorName: message.authorName,
    text: message.text,
    timestamp: timestamp
  };
  rawMessages.push(createdMessage);
  localStorage.setItem('messages', JSON.stringify(rawMessages));
  
  // simulate success callback
  setTimeout(function() {
    ChatAppDispatcher.dispatch({
      type: RECEIVE_RAW_CREATED_MESSAGE,
      rawMessage: createdMessage
    });
  }, 0);
}
