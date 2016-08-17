import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
// import App from './App';
// import ChatWithFluxApp from './ChatWithFluxApp/ChatWithFluxApp';
// import AuthJWTApp from './AuthJWTApp/AuthJWTApp';
import store from './stores/';
import Routes from './TodoWithReduxApp/routes/route';
import 'react-select/dist/react-select.css';
// import { init } from './ChatWithFluxApp/ChatExampleData';
// import { getAllMessages } from './ChatWithFluxApp/utils/ChatAppUtils';

// init();
// getAllMessages();
const history = useRouterHistory(createHistory)({ 
  basename: '/',
});

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			{Routes}
		</Router>
	</Provider>, document.getElementById('root'));
