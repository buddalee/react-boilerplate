import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import ChatWithFluxApp from './ChatWithFluxApp';
import TodoWithReduxApp from './TodoWithReduxApp/TodoWithReduxApp';
// import { init } from './ChatWithFluxApp/ChatExampleData';
// import { getAllMessages } from './ChatWithFluxApp/utils/ChatAppUtils';

// init();
// getAllMessages();

ReactDOM.render(<TodoWithReduxApp />, document.getElementById('root'));
