// import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';

// ThreadStore data here 
let currentID = null;
let threads = {};

const ThreadStore = {
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
 				lastMessage: {

 				},
 			};
  	}, this);

  	if (!currentID) {
  		const allChrono = this.getAllChrono();
  	}
  }
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
  }

  getCurrentID: function() {
  	return currentID;
  }

  getCurrentThread: function() {
    const currentID = this.getCurrentID();
    return threads[currentID];
  }
}
export default ThreadStore;