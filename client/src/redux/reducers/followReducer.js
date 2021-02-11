import {
  ADD_FOLLOWING,
  ADD_FOLLOWING_FAIL,
  FOLLOWERS_LOADED,
  FOLLOWERS_LOAD_FAIL,
  FOLLOWINGS_LOADED,
  FOLLOWINGS_LOADING,
} from '../actions/types';

const initialState = {
  followersLoading: true,
  followingsLoading: true,
  followers: [],
  followings: [],
  updatingFollow: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FOLLOWINGS_LOADING:
      return { ...state, followingsLoading: true };
    case FOLLOWERS_LOADING:
      return { ...state, followersLoading: true };
    case FOLLOWINGS_LOADED:
      return { ...state, followings: action.payload, followingsLoading: false };
    case FOLLOWERS_LOADED:
      return { ...state, followers: action.payload, followersLoading: false };
    case FOLLOWINGS_LOAD_FAIL:
      return { ...state, followings: [], followingsLoading: false };
    case FOLLOWERS_LOAD_FAIL:
      return { ...state, followers: [], followersLoading: false };
    case ADDING
    case ADD_FOLLOWING:
      return { ...state, followings: [...state.followings, action.payload] };
    case ADD_FOLLOWING_FAIL:
    default:
      return state;
  }
}
