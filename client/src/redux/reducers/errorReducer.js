import { CLEAR_ERRORS, RETURN_ERRORS } from '../actions/types';

const initialState = {
  msg: null,
  status: null,
  type: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RETURN_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
}
