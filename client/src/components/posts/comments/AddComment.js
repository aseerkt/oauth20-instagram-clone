import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { SendRounded, EmojiEmotions } from '@material-ui/icons';
import axios from 'axios';
import Picker from 'emoji-picker-react';
import { ClickAwayListener } from '@material-ui/core';

function AddComment({ setComments, setShowAll, postId }) {
  const [comment, setComment] = useState('');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setOpenEmojiPicker(false);
    setComment((prevComment) => `${prevComment}${emojiObject.emoji}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/comments/${postId}`,
          { comment },
          { withCredentials: true }
        );
        setComments((prevComments) => [...prevComments, res.data]);
        setShowAll(true);
        setComment('');
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <>
      <div className='px-3 py-2'>
        <form
          className='d-flex justify-content-between align-items-center my-0 position-relative'
          onSubmit={handleSubmit}
        >
          <input
            className='w-100 text-dark'
            style={{ outline: 0, border: 0 }}
            type='text'
            value={comment}
            placeholder='Add Comment...'
            onChange={(e) => setComment(e.target.value)}
          />
          <ClickAwayListener
            onClickAway={() => {
              console.log('onclickaway triggered');
              setOpenEmojiPicker(false);
            }}
          >
            <>
              <IconButton
                size='small'
                onClick={(e) => setOpenEmojiPicker(!openEmojiPicker)}
              >
                <EmojiEmotions
                  color={openEmojiPicker ? 'primary' : 'inherit'}
                />
              </IconButton>

              {openEmojiPicker && (
                <div className='emoji-picker pb-4'>
                  <Picker onEmojiClick={onEmojiClick} disableAutoFocus />
                </div>
              )}
              <IconButton
                size='small'
                className='flex-1'
                type='submit'
                disabled={comment === ''}
              >
                <SendRounded />
              </IconButton>
            </>
          </ClickAwayListener>
        </form>
      </div>
    </>
  );
}

export default AddComment;
