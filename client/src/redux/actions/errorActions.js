import { CLEAR_ERRORS, RETURN_ERRORS } from './types';

export const returnErrors = (msg, status = null, type = null) => (dispatch) => {
  dispatch({
    type: RETURN_ERRORS,
    payload: {
      msg,
      status,
      type,
    },
  });
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
