import { createStore, applyMiddleware  } from 'redux'
import todos from '../reducers/todos';
import thunk from 'redux-thunk';
const store = createStore(
	todos,
	applyMiddleware(thunk),
);

export default store;