import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PostRight from './posts/PostRight';
import Posts from './posts/Posts';
import { fetchPosts } from '../redux/actions/postActions';
import { ArrowUpward } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div id='top'></div>
      <div className='row mt-3'>
        <div className='col-md-9 mx-auto'>
          <div className='row'>
            <Posts />
            <PostRight />
          </div>
        </div>
      </div>
      <div className='top-nav hide-mobile d-none d-md-block'>
        <IconButton className='bg-primary text-black-50' href='#top'>
          <ArrowUpward />
        </IconButton>
      </div>
    </div>
  );
}

export default Home;
