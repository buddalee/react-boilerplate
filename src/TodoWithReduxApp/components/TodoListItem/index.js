import React, { Component, PropTypes } from 'react';
export default class TodoListItem extends Component {
  render() {
  	const { todo } = this.props;
    return (
    <div>
    	<li>{todo._id}</li>
    </div>);
  }
}
TodoListItem.propTypes = {
	todo: PropTypes.object,
};    
TodoListItem.defaultProps = {
	todo: {},
}