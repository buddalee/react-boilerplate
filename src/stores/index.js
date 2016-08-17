import { createStore, applyMiddleware  } from 'redux'
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { Iterable } from 'immutable';
// import api from '../middlewares/api';
import createLogger from 'redux-logger';

const logger = createLogger({
	stateTransformer: (state) => {
		let newState = {};
		for (let i of Object.keys(state)) {
	    if (Iterable.isIterable(state[i])) {
	    	newState[i] = state[i].toJS();
	    } else {
	    	newState[i] = state[i];
	    }
		}
		return newState;
	}
});
// add api here
const store = createStore(
	rootReducer,
	applyMiddleware(thunk, logger),
);

export default store;
