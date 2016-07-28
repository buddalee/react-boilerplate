import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import { EventEmitter } from 'event';
import MessageStore from './MessageStore';
import ThreadStore from './ThreadStore';
import { CHANGE_EVENT } from '../utils/ChatAppUtils';
import { CLICK_THREAD } from '../actions/ChatThreadAction';
import { RECEIVE_RAW_MESSAGES } from '../actions/ChatServerAction';

const UnreadThreadStoreConfig  = {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	getCount: function() {
		const threads = ThreadStore.getAll();
		let unreadCount = 0;
    for (let id in threads) {
      if (!threads[id].lastMessage.isRead) {
        unreadCount++;
      }
    }
    return unreadCount;
	}
}

const UnreadThreadStore = Object.assign({}, EventEmitter.prototype, UnreadThreadStoreConfig);

UnreadThreadStore.dispatchToken = ChatAppDispatcher.register(function(action) {
  
  ChatAppDispatcher.waitFor([
    ThreadStore.dispatchToken,
   	MessageStore.dispatchToken
	]);

	switch (action.type) {

    case CLICK_THREAD:
      UnreadThreadStore.emitChange();
      break;

    case RECEIVE_RAW_MESSAGES:
      UnreadThreadStore.emitChange();
      break;

    default:
      return true;
  }
});

export default UnreadThreadStore;