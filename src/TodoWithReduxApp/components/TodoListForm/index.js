import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

class TodoListForm extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			fields: {
				name,
				age,
				relationship,
			},
			handleSubmit, // 接資料用
			options,
			submitting, // reduxForm 提供
		} = this.props;
		return(<form onSubmit={handleSubmit}>
			<div>
				<label>Name</label>
				<input 
					type="text"
					{...name}
					onFocus={(val) => { console.log(val); name.onChange(val);}}
					disabled={submitting}
				/>
				{name.error && name.touched && <label>{name.error}</label>}
			</div>
			<div>
				<label>Age</label><input type="text" {...age} disabled={submitting} />
				{age.error && age.touched && <label>{age.error}</label>}
			</div>
			<div>
				<label>RelationShip</label><Select
					options={options}
					valueKey="relationshipCode"
					labelKey="relationshipName"
					value={relationship.value}
					clearable={false}
					onChange={(val) => { relationship.onChange(val.relationshipCode);} }
				/>
				{relationship.error && relationship.touched && <label>{relationship.error}</label>}
			</div>
			<button type="submit">Submit</button>
		</form>);
	}
}
// reduxForm 欄位
export const TodoListFormFields = [
  'name',
  'age',
  'relationship'
];
TodoListForm.propTypes = {
  fields: PropTypes.object,
  options: PropTypes.arrayOf(
  	PropTypes.shape({
  		relationshipCode: PropTypes.string,
			relationshipName: PropTypes.string,
  	}),
  ),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

// 驗證規則 !
// 更嚴謹一點
TodoListForm.validate = (datas) => {
  const { name, age, relationship } = datas;
  const errors = {};
  if (!name) {
  	errors.name = 'Name is required';
  } else if (name.trim().length > 5) {
    errors.name = 'Name has at most 5 words';
  }
  if (!age) {
  	errors.age = 'Age is required';
  } else if(age && parseInt(age, 10) > 100) {
    errors.age = 'Age is at most 100';
  }
  if (!relationship) {
  	errors.relationship = 'Relationship is required';
  }
  return errors;
};
TodoListForm = reduxForm({
	form: 'TodoListForm', // form reducer 的名稱
  fields: TodoListFormFields, //欄位
  validate: TodoListForm.validate,
})(TodoListForm);
export default TodoListForm;
