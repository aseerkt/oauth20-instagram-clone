import {
  USER_LOADED,
  USER_LOADING,
  USER_LOAD_FAIL,
  USER_LOGOUT,
} from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';

export const loadUser = () => (dispatch) => {
  dispatch({ type: USER_LOADING });
  (async () => {
    console.log('action on user loading starts');
    try {
      const res = await axios.get('http://localhost:5000/auth/user', {
        withCredentials: true,
      });
      // console.log(res);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOAD_FAIL,
      });
      dispatch(
        returnErrors(
          err.response?.data.error,
          err.response?.status,
          USER_LOAD_FAIL
        )
      );
    }
  })();
};

export const logoutUser = (history) => (dispatch) => {
  (async () => {
    try {
      await axios.get('http://localhost:5000/auth/user/logout', {
        withCredentials: true,
      });
      dispatch({
        type: USER_LOGOUT,
      });
      history.push('/login');
    } catch (err) {
      console.error('Logout ', err);
    }
  })();
};
