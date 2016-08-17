import React, { Component, PropTypes } from 'react';
export default class Page extends Component {
	render() {
		return (<div>I am Page</div>)
	}
}
Page.propTypes = {
	children: PropTypes.object,
};