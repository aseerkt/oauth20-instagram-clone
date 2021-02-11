import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import AddComment from './AddComment';
import axios from 'axios';
import './Comments.css';

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [twoComments, setTwoComments] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/comments/${postId}`,
          { withCredentials: true }
        );
        setTwoComments(res.data.reverse().slice(0, 2));
        setComments(res.data.reverse());
      } catch (err) {
        console.error(err);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='d-flex flex-column justify-content-start border-bottom px-3 py-2'>
        <button
          onClick={(e) => setShowAll(true)}
          hidden={showAll || comments.length < 3}
          className='btn btn-link text-left text-muted p-0'
        >
          <small>View all {comments.length} comments</small>
        </button>
        {comments.length > 0 ? (
          !showAll ? (
            twoComments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))
          ) : (
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))
          )
        ) : (
          <small>No comments</small>
        )}
      </div>
      {/* ADD_COMMENT */}
      <AddComment
        postId={postId}
        setShowAll={setShowAll}
        setComments={setComments}
      />
    </div>
  );
}

export default Comments;
