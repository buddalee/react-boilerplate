// import { CALL_API } from '../../middlewares/api';
import { fromJS, toJS } from 'immutable';
import { combineReducers } from 'redux';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// login 
function requestLogin (creds) {
  return {
    type: LOGIN_REQUEST,
    creds,
  };
}

function receiveLogin(user) {
  return {
  	type: LOGIN_SUCCESS,
  	id_token: user.id_token,
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message,
  };
}

// logout
function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function loginUser(creds) {
	let config = {
    method: 'POST',
    headers: {
    	'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${creds.username}&password=${creds.password}`,
	};
	return (dispatch) => {
		dispatch(requestLogin(creds));
		return fetch('');
	}
}

function auth (state = fromJS({
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  user: '',
  errorMessage: '',
}), action) {
  switch (action.type) {
  	case LOGIN_REQUEST:
  	  return state.merge({
  	  	isFetching: true,
  	  	isAuthenticated: false,
  	  }).toJS();
  	case LOGIN_SUCCESS:
  	  return state.merge({
  	  	isFetching: false,
  	  	isAuthenticated: true,
  	  	errorMessage: '',
  	  }).toJS();
  	case LOGIN_FAILURE:
  	  return state.merge({
  	  	isFetching: false,
  	  	isAuthenticated: false,
  	  	errorMessage: action.errorMessage,
  	  }).toJS();
  	case LOGOUT_FAILURE:
  	  return state.merge({
        isFetching: false,
  	  }).toJS();
  	case LOGOUT_REQUEST:
  	  return state.merge({
        isFetching: true,
  	  }).toJS();
  	case LOGOUT_SUCCESS:
  	  return state.merge({
        isFetching: false,
        isAuthenticated: false
  	  }).toJS();
  	default:
  		return state;
  }
}

export default combineReducers({
  auth,
  // quotes,
});
