import React from 'react';
import { Avatar, Card, IconButton } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import moment from 'moment';
import Comments from './comments/Comments';
import { Link } from 'react-router-dom';
import Likes from './likes/Likes';

function Post({ post }) {
  return (
    <Card className='mb-3'>
      <div>
        <div className='d-flex flex-column'>
          {/* POST_HEADER */}
          <div className='px-3 py-2 border-bottom d-flex justify-content-between align-items-center'>
            <div>
              <Link
                className='p-0 d-flex justify-content-start align-items-center nav-link'
                to={`/${post.author.username}`}
              >
                <Avatar
                  src={post.author.image}
                  alt='post_author'
                  title={post.author.username}
                />

                <strong className='ml-2' style={{ color: 'black' }}>
                  {post.author.username}
                </strong>
              </Link>
            </div>
            <IconButton>
              <MoreHoriz />
            </IconButton>
          </div>

          {/* POST_CONTENT */}
          <div className='border-bottom'>
            <img
              src={post.imageURL}
              alt='post_image'
              style={{ width: '100%', height: 'auto' }}
            />
            <div className='border-bottom'>
              <Likes postId={post._id} />
            </div>
            <div className='px-3 py-2 d-flex justify-content-between align-items-center'>
              <div>
                <h5>{post.title}</h5>
                <span>{post.body}</span>
              </div>
              <span
                style={{ fontSize: '10px' }}
                className='text-muted text-uppercase'
              >
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
          </div>

          {/* COMMENTS */}
          <Comments postId={post._id} />
        </div>
      </div>
    </Card>
  );
}

export default Post;
