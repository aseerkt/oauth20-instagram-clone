import { Avatar, CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../redux/actions/userActions';

function FollowSuggestions() {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const displayUsers = users.data.filter(
    (someUser) => someUser._id !== user._id
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  if (users.isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center h-25 p-4'>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className='border-top p-3'>
        <strong className='text-primary my-1'>Suggestion for you</strong>
        {displayUsers?.map((user) => (
          <div
            key={user._id}
            className='d-flex justify-content-between align-items-center'
          >
            <Link
              className='p-0 my-2 nav-link text-dark'
              to={`/${user.username}`}
            >
              <div className='d-flex justify-content-start align-items-center'>
                <Avatar
                  src={user.image}
                  alt='user_photo'
                  title={user.displayName}
                />
                <div>
                  <strong style={{ fontSize: '12px' }} className='ml-2'>
                    {user.username}
                  </strong>
                </div>
              </div>
            </Link>
            <button className='btn btn-sm btn-light text-primary'>
              Follow
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default FollowSuggestions;
