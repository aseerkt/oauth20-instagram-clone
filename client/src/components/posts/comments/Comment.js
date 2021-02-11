import React from 'react';
import moment from 'moment';

function Comment({ comment }) {
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <span style={{ fontSize: '13px' }} className='font-smaller'>
        <strong>{comment.author.username}</strong>
        <span className='ml-2'>{comment.comment}</span>
      </span>
      <small className='text-muted'>
        {moment(comment.updatedAt).fromNow()}
      </small>
    </div>
  );
}

export default Comment;
