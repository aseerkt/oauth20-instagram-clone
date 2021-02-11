import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  posts: postReducer,
  users: userReducer,
});
