import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
// import { EventEmitter } from 'event';
const { EventEmitter } = require('events');
import { CLICK_THREAD } from '../actions/ChatThreadAction';
import { RECEIVE_RAW_MESSAGES } from '../actions/ChatServerAction';
import { 
  CHANGE_EVENT,
  convertRawMessage
} from '../utils/ChatAppUtils';
// ThreadStore data here 
let currentID = null;
let threads = {};

const ThreadStoreConfig = {
  init: function(rawMessages) {
  	rawMessages.forEach(function(message) {
 			const threadID = message.threadID;
 			const thread = threads[threadID];
 			if (thread && thread.lastMessage.timestamp > message.timestamp) {
 				return;
 			}
 			threads[threadID] = {
 				id: threadID,
 				name: message.threadName,
 				lastMessage: convertRawMessage(message, currentID),
 			};
  	}, this);

  	if (!currentID) {
  		const allChrono = this.getAllChrono();
      currentID = allChrono[allChrono.length - 1].id;
  	}

    threads[currentID].lastMessage.isRead = true;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getAllChrono: function() { // threads 排序後回傳
    let orderedThreads = [];
    for (let id in threads) {
    	const thread = threads[id];
    	orderedThreads.push(thread);
    }
    orderedThreads.sort(function(a, b) {
      if (a.lastMessage.date < b.lastMessage.date) {
        return -1;
      } else if (a.lastMessage.date > b.lastMessage.date) {
        return 1;
      }
      return 0;
    });
    return orderedThreads;
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAll: function() {
    return threads;
  },
  getCurrentID: function() {
  	return currentID;
  },

  getCurrentThread: function() {
    const currentID = this.getCurrentID();
    return threads[currentID];
  },
}
const ThreadStore = Object.assign({}, EventEmitter.prototype, ThreadStoreConfig);

ThreadStore.dispatchToken = ChatAppDispatcher.register(function(action) {

  switch(action.type) {
    case CLICK_THREAD:
      currentID = action.threadID;
      threads[currentID].lastMessage.isRead = true;
      ThreadStore.emitChange();
      break;

    case RECEIVE_RAW_MESSAGES:
      ThreadStore.init(action.rawMessages);
      ThreadStore.emitChange();
      break;

    default:
      return true;
  }
});

export default ThreadStore;
