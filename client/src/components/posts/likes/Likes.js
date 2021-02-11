import React, { useEffect, useState } from 'react';
import { CircularProgress, IconButton } from '@material-ui/core';
import { ThumbUp, ThumbUpOutlined } from '@material-ui/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Likes({ postId }) {
  const [likes, setLikes] = useState([]);
  const [like, setLike] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log('use triggered');
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/likes/${postId}`,
          { withCredentials: true }
        );
        // console.log(res.data);
        res.data.forEach((like) => {
          if (like.author._id === user._id) {
            // console.log('found current user like status');
            setLike(like.liked);
          }
        });
        setLikes(res.data.filter((like) => like.liked));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const toggleLike = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/likes/toggle-like',
        { postId },
        { withCredentials: true }
      );
      console.log(res.data);
      setLike(res.data.liked);
      if (res.data.liked) {
        setLikes((prevLikes) => [...prevLikes, res.data]);
      } else {
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like._id !== res.data._id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className='mx-auto'>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className='px-3 py-1 d-flex align-items-center'>
        <IconButton size='small' onClick={toggleLike}>
          {like ? <ThumbUp color='primary' /> : <ThumbUpOutlined />}
        </IconButton>
        <span className='ml-1'>
          <strong>{likes.length}</strong> like{likes.length === 1 ? '' : 's'}
        </span>
      </div>
    );
  }
}

export default Likes;
