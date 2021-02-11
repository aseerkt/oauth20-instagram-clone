import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@material-ui/core';
import Loader from '../layouts/Loader';

function Posts() {
  const posts = useSelector((state) => state.posts.all);
  const isLoading = useSelector((state) => state.posts.isLoading);

  if (isLoading) {
    return (
      <div className='col-md-8 order-2 order-md-1'>
        <Loader />
      </div>
    );
  }
  return (
    <div className='col-md-8 mx-auto order-2 order-md-1'>
      {posts?.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <Card>
          <CardContent>
            <h2> No posts </h2>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Posts;
