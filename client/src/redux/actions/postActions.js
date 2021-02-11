import {
  ADD_POST,
  ADD_POST_FAIL,
  POSTS_LOADED,
  POSTS_LOADING,
  POSTS_LOAD_FAIL,
  USER_POSTS_LOADED,
  USER_POSTS_LOADING,
  USER_POSTS_LOAD_FAIL,
} from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';

export const fetchPosts = () => (dispatch) => {
  dispatch({
    type: POSTS_LOADING,
  });
  (async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts/all', {
        withCredentials: true,
      });
      dispatch({
        type: POSTS_LOADED,
        payload: res.data.reverse(),
      });
    } catch (err) {
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          POSTS_LOAD_FAIL
        )
      );
      dispatch({
        type: POSTS_LOAD_FAIL,
      });
    }
  })();
};

export const addPost = (title, body, file, setOpen) => (dispatch) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);
  formData.append('file', file);

  (async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/posts/add-new',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
      setOpen(false);
      return;
    } catch (err) {
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          ADD_POST_FAIL
        )
      );
      dispatch({ type: ADD_POST_FAIL });
      return;
    }
  })();
};

export const fetchUserPosts = (userId) => (dispatch) => {
  dispatch({ type: USER_POSTS_LOADING });
  (async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/u/${userId}`,
        { withCredentials: true }
      );
      dispatch({
        type: USER_POSTS_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch(
        returnErrors(
          err.response.data.error,
          err.response.status,
          USER_POSTS_LOAD_FAIL
        )
      );
      dispatch({
        type: USER_POSTS_LOAD_FAIL,
      });
    }
  })();
};
