import { combineReducers } from 'redux';
import todoList from '../TodoWithReduxApp/reducers/todos';
import authJWT from '../AuthJWTApp/reducers/';
import { reducer as formReducer } from 'redux-form';
export default combineReducers({
  todoList,
  authJWT,
  form: formReducer
});
