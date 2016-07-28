import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import { EventEmitter } from 'event';
import { 
  CHANGE_EVENT,
  convertRawMessage,
  getCreatedMessageData,
  addMessages,
  markAllInThreadRead,
} from '../utils/ChatAppUtils';
import { CREATE_MESSAGE } from '../actions/ChatMessageAction';
import { CLICK_THREAD } from '../actions/ChatThreadAction';
import ThreadStore from './ThreadStore';

let messages = {};

const MessageStoreConfig = {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  get: function(id) {
    return messages[id];
  },
  getAll: function() {
    return messages;
  },
  getAllForThread: function(threadID) {
    var threadMessages = [];
    for (var id in _messages) {
      if (messages[id].threadID === threadID) {
        threadMessages.push(messages[id]);
      }
    }
    threadMessages.sort(function(a, b) {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
    return threadMessages;
  },
  getAllForCurrentThread: function() {
    return this.getAllForThread(ThreadStore.getCurrentID());
  }
}

const MessageStore = Object.assign({}, EventEmitter.prototype, MessageStoreConfig);


MessageStore.dispatchToken = ChatAppDispatcher.register(function(action) {

  switch(action.type) {

    case CLICK_THREAD:
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      messages = Object.assign({}, messages, markAllInThreadRead(ThreadStore.getCurrentID(), messages));
      MessageStore.emitChange();
      break;

    case CREATE_MESSAGE:
      var message = getCreatedMessageData(
        action.text,
        action.currentThreadID
      );
      messages[message.id] = message;
      MessageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      messages = Object.assign({}, messages, addMessages(action.rawMessages, messages));
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      messages = Object.assign({}, messages, markAllInThreadRead(ThreadStore.getCurrentID(), messages));
      MessageStore.emitChange();
      break;

    default:
      return true;
  }
});

export default MessageStore;
