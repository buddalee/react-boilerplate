import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// import App from './App';
import ChatWithFluxApp from './ChatWithFluxApp';
import TodoWithReduxApp from './TodoWithReduxApp/TodoWithReduxApp';
import store from './TodoWithReduxApp/stores/todos';
// import { init } from './ChatWithFluxApp/ChatExampleData';
// import { getAllMessages } from './ChatWithFluxApp/utils/ChatAppUtils';

// init();
// getAllMessages();

ReactDOM.render(
	<Provider store={store}>
		<TodoWithReduxApp />
	</Provider>, document.getElementById('root'));
