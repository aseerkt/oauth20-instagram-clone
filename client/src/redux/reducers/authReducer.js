import {
  USER_LOADED,
  USER_LOADING,
  USER_LOAD_FAIL,
  USER_LOGOUT,
} from '../actions/types';

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return initialState;
    case USER_LOAD_FAIL:
    case USER_LOGOUT:
      return { ...initialState, isLoading: false };
    case USER_LOADED:
      return { user: action.payload, isAuthenticated: true, isLoading: false };
    default:
      return state;
  }
}
