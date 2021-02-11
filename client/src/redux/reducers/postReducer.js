import {
  ADD_POST,
  ADD_POST_FAIL,
  POSTS_LOADED,
  POSTS_LOADING,
  POSTS_LOAD_FAIL,
  USER_POSTS_LOADED,
  USER_POSTS_LOADING,
  USER_POSTS_LOAD_FAIL,
} from '../actions/types';

const initialState = {
  all: [],
  isLoading: true,
  userPostsIsLoading: true,
  userPosts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING: {
      return { ...state, isLoading: true, all: [] };
    }
    case POSTS_LOADED:
      return { ...state, isLoading: false, all: action.payload };
    case POSTS_LOAD_FAIL:
      return { ...state, isLoading: false, all: [] };

    case USER_POSTS_LOADING: {
      return { ...state, userPostsIsLoading: true, userPosts: [] };
    }
    case USER_POSTS_LOADED:
      return { ...state, userPostsIsLoading: false, userPosts: action.payload };
    case USER_POSTS_LOAD_FAIL:
      return { ...state, userPostsIsLoading: false, userPosts: [] };

    case ADD_POST:
      return { ...state, all: [action.payload, ...state.all] };
    case ADD_POST_FAIL:
    default:
      return state;
  }
}
