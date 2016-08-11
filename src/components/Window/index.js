import React, { Component, PropTypes } from 'react';
import './style.css';

// https://github.com/marcio/react-skylight/blob/master/src/skylightstateless.jsx
export default class Window extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}
Window.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  width: PropTypes.number,
  title: PropTypes.string,
};
Winodw.defaultProps = {
	title: '視窗',
	width: '300px',
	onConfirm: () => {},
	onClose: () => {},
}