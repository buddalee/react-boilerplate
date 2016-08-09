import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import ChatWithFluxApp from './ChatWithFluxApp';
import { init } from './ChatWithFluxApp/ChatExampleData';
import { getAllMessages } from './ChatWithFluxApp/utils/ChatAppUtils';

init();
getAllMessages();
fetch('https://guarded-brushlands-26579.herokuapp.com/api/contacts').then((res) => 
  res.json().then((data) => console.log(data))
);
ReactDOM.render(<ChatWithFluxApp />, document.getElementById('root'));
