import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../layouts/Loader';
import ProfileInfo from './ProfileInfo';

function Profile({ match }) {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const username = match.params.username;

  // console.log(userId);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/u/${username}`,
          { withCredentials: true }
        );
        setProfile(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [username]);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className='row'>
        <div className='col-md-9 mx-auto mt-5 card'>
          <ProfileInfo profile={profile} />
        </div>
      </div>
    );
  }
}

export default Profile;
