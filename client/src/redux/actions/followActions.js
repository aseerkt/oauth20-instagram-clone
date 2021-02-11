import { FOLLOWINGS_LOAD_FAIL } from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';

export const getFollowings = () => (dispatch) => {
  dispatch({ type: FOLLOWINGS_LOADING });
  (async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/follow/ings', {
        withCredentials: true,
      });
      dispatch({
        type: FOLLOWINGS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          FOLLOWINGS_LOAD_FAIL
        )
      );
      dispatch({
        type: FOLLOWINGS_LOAD_FAIL,
      });
    }
  })();
};

export const getFollowers = () => (dispatch) => {
  dispatch({ type: FOLLOWERS_LOADING });
  (async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/follow/ers', {
        withCredentials: true,
      });
      dispatch({
        type: FOLLOWERS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          FOLLOWERS_LOAD_FAIL
        )
      );
      dispatch({
        type: FOLLOWERS_LOAD_FAIL,
      });
    }
  })();
};

export const addFollowing = (userId) => (dispatch) => {
  dispatch({ type: FOLLOWINGS_LOADING });
  (async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/follow/ings', {
        withCredentials: true,
      });
      dispatch({
        type: FOLLOWINGS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          FOLLOWINGS_LOAD_FAIL
        )
      );
      dispatch({
        type: FOLLOWINGS_LOAD_FAIL,
      });
    }
  })();
};
