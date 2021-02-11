import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

function ProfileInfo({ profile }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className='row'>
      <div className='col-sm-3 col-4 py-1'>
        <Avatar
          className='m-3'
          style={{ width: '100%', height: 'auto' }}
          src={profile.image}
          alt='profile_photo'
          title={profile.displayName}
        />
      </div>
      <div className='d-block d-sm-none my-auto col-6'>
        <h4>{profile.username}</h4>
        <p className='text-muted'>{user.displayName}</p>
        {user._id === profile._id && (
          <button className='btn btn-light p-1'>Edit Profile</button>
        )}
      </div>
      <div className='offset-sm-1 col-sm-4 my-auto'>
        <div className='d-none d-sm-block'>
          <h4>{profile.username}</h4>
          <p className='text-muted'>{profile.displayName}</p>
          {profile._id === profile._id && (
            <button className='btn btn-light p-1'>Edit Profile</button>
          )}
        </div>
        <div className='d-flex border-top pt-2 justify-content-between align-items-center'>
          <div>
            <span className='font-weight-bold'>0 </span>
            <span>posts</span>
          </div>
          <div>
            <span className='font-weight-bold'>95 </span>
            <span>followers</span>
          </div>
          <div>
            <span className='font-weight-bold'>110 </span>
            <span>following</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
