import React, { Component, PropTypes } from 'react';
import './style.css';

export default class Progress extends Component {
  constructor(props) {
  	super(props);
  }
  render() {
  	const { progress } = this.props;
  	return (
  		<div style={{ width: `${progress}%vw` }} className="progress__meter">
  		</div>
  	);
  } 
};
Progress.propTypes = {
	progress: PropTypes.number,
};