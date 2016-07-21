import React, { Component } from 'react';
import './style/style.css';
import Watch from './components/Watch';
export default class App extends Component {
  render() {
    return (
      <div>
        <Watch />
        <h1 className="red">H  world  !</h1>
      </div>
    );
  }
}
