import { combineReducers } from 'redux';
import todoList from '../TodoWithReduxApp/reducers/todos';
import authJWT from '../AuthJWTApp/reducers/';

export default combineReducers({
  todoList,
  authJWT,
});
