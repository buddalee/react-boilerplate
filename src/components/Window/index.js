import React, { Component, PropTypes } from 'react';
import './style.css';

export default class Window extends Component {
  render() {
    const { title, onClose } = this.props;
    return (
      <div className="window__modal">
        <div className="window__wrapper">
          <div className="window__header">
            <div className="window__header--title">{title}</div>
            <div className="window__header--close">
              <i onClick={onClose} className="fa fa-times-circle-o" aria-hidden="true"></i>
            </div>
          </div>
          <div className="window__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
Window.propTypes = {
  children: PropTypes.object,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  width: PropTypes.string,
  title: PropTypes.string,
};    
Window.defaultProps = {
	title: '視窗',
	width: '300px',
	onConfirm: () => {},
	onClose: () => {},
  children: {},
}