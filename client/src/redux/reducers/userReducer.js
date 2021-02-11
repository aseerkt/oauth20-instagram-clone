import { USERS_LOADED, USERS_LOADING, USERS_LOAD_FAIL } from '../actions/types';

const initialState = {
  data: [],
  isLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return initialState;
    case USERS_LOADED:
      return { data: action.payload, isLoading: false };
    case USERS_LOAD_FAIL:
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}
