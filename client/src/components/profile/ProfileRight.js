import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProfileRight() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <Link to={`/${user.username}`} className='nav-link'>
        <div className='d-flex justify-content-start align-items-center'>
          <Avatar src={user.image} alt='profile' title={user.displayName} />
          <div className='ml-2 d-flex flex-column justify-content-end'>
            <strong style={{ color: 'black' }}>{user.username}</strong>
            <small className='text-muted'>{user.displayName}</small>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProfileRight;
