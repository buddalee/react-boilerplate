
import {
	POST_TODO,
	DELETE_TODO,
	GET_ALL_TODOS,
	GET_TODO,
	PUT_TODO,
	GET_ALL_OPTIONS,
} from '../actions/todos';
export default function todos(state = {
	todos: [],
	options: [],
	todo: {},
	id: '',
}, action) {
	switch (action.type) {
		case POST_TODO:
			return state;
		case DELETE_TODO:
			{
				return Object.assign({}, state, { id: action.id });
			}
		case GET_ALL_TODOS:
			{
				return Object.assign({}, state, { todos: action.datas });
			}
		case GET_ALL_OPTIONS:
			{
				return Object.assign({}, state, {options: action.options });
			}
		case GET_TODO:
		case PUT_TODO:
		default :
			return state;
	}
}