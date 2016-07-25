import React, { Component } from 'react';
import './style/style.css';
import Watch from './components/Watch';
import data from './data.json';
import 'whatwg-fetch'; 
export default class App extends Component {
  render() {
    fetch('./todos.json').then((response) =>
      response.json()
    ).then(json => console.log(json));
    return (
      <div>
        <Watch />
        <h1 className="red">H  world  !</h1>
        <h1>{data[0]['userName']}</h1>
      </div>
    );
  }
}
