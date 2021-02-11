import { USERS_LOADING, USERS_LOADED, USERS_LOAD_FAIL } from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';

export const getAllUsers = () => (dispatch, getState) => {
  dispatch({ type: USERS_LOADING });
  (async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/all', {
        withCredentials: true,
      });
      // console.log(res);

      dispatch({
        type: USERS_LOADED,
        payload: res.data.filter(
          (user) => user._id !== getState().auth.user._id
        ),
      });
    } catch (err) {
      // console.error(err);
      dispatch(
        returnErrors(
          err.response?.data.error,
          err.response?.status,
          USERS_LOAD_FAIL
        )
      );
      dispatch({
        type: USERS_LOAD_FAIL,
      });
    }
  })();
};
