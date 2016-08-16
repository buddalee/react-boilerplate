import React, { Component } from 'react';
import Progress from '../components/Progress/';

export default class AuthJWTApp extends Component {
	constructor() {
		super();
	}
  render() {
  	const progress = 100;
    return (
      <div>
      	<Progress progress={progress} />
      </div>
    );
  }
}