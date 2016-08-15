import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import App from './App';
// import ChatWithFluxApp from './ChatWithFluxApp/ChatWithFluxApp';
import TodoWithReduxApp from './TodoWithReduxApp/TodoWithReduxApp';
import store from './stores/';
import 'react-select/dist/react-select.css';
// import { init } from './ChatWithFluxApp/ChatExampleData';
// import { getAllMessages } from './ChatWithFluxApp/utils/ChatAppUtils';

// init();
// getAllMessages();

ReactDOM.render(
	<Provider store={store}>
		<TodoWithReduxApp />
	</Provider>, document.getElementById('root'));
