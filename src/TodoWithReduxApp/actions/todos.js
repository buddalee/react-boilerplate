export const POST_TODO = 'POST_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const GET_ALL_TODOS = 'GET_ALL_TODOS';
export const GET_TODO = 'GET_TODO';
export const PUT_TODO = 'PUT_TODO';

const API = 'https://guarded-brushlands-26579.herokuapp.com/api/contacts';
let header = {
	mode: 'cors',
	body: {},
	'Content-Type': 'application/json',
	method: 'GET', 
};
export function getTodos() {
	header.body = {};
	header.method = 'GET';
	return (dispatch) => {
		return fetch(API, header).then((res) => res.json()).then((json) => dispatch({ type: GET_ALL_TODOS, datas: json}));
	}
}
export function postTodo (text) {
	header.body = text;
	header.method = 'POST';
	return (dispatch) => {
		return fetch(API, header).then(() => {
			header.body = {};
			header.method = 'GET';
			dispatch({
				type: POST_TODO,
			});
			fetch(API, header).then((res) => res.json()).then((json) => dispatch({ type: GET_ALL_TODOS, datas: json}));
		 }
		)
	};
}
// export function postTodo (data) {
//   return {
//   	type: POST_TODO,
//   	data,
//   }
// }

// export function getTodo (id) {
//   return {
//   	type: GET_TODO,
//   	id,
//   }
// }

// export function putTodo (data) {
//   return {
//   	type: PUT_TODO,
//   	data,
//   }
// }

// export function deleteTodo (id) {
//   return {
//   	type: DELETE_TODO,
//   	id,
//   }
// }
