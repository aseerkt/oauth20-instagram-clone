import React from 'react';
import FollowSuggestions from '../follows/FollowSuggestions';
import ProfileRight from '../profile/ProfileRight';

function PostRight() {
  return (
    <div className='col-md-4 mx-auto order-1 order-md-2'>
      <ProfileRight />
      <FollowSuggestions />
    </div>
  );
}

export default PostRight;
