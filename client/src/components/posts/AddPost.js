import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  FormGroup,
  Button,
  Modal,
  IconButton,
} from '@material-ui/core';
import { Close, PostAdd } from '@material-ui/icons';
import { addPost } from '../../redux/actions/postActions';
import AlertInfo from '../layouts/AlertInfo';
import { ADD_POST_FAIL } from '../../redux/actions/types';
import { clearErrors } from '../../redux/actions/errorActions';

function AddPost() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);
  const posts = useSelector((state) => state.posts.data);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    setTitle('');
    setBody('');
    setFile(null);
  }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(title, body, file, setOpen));
  };

  const toggleModal = (e) => {
    setOpen(!open);
    dispatch(clearErrors());
  };

  return (
    <>
      <IconButton onClick={toggleModal}>
        <PostAdd color={open ? 'primary' : 'inherit'} />
      </IconButton>
      <Modal open={open} onClose={toggleModal} className='col-md-6 mx-auto'>
        <div className='bg-light p-3 mt-5'>
          <div className='d-flex justify-content-between align-items-center'>
            <h4>ADD POST</h4>
            <IconButton onClick={toggleModal}>
              <Close fontSize='small' />
            </IconButton>
          </div>
          <AlertInfo
            showAlert={error.type === ADD_POST_FAIL}
            errMess={error.msg}
          />
          <form onSubmit={handleSubmit} className='mt-4'>
            <FormGroup className='form-group'>
              <TextField
                size='small'
                variant='outlined'
                placeholder='Enter Post Title...'
                label='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup className='form-group'>
              <TextField
                multiline
                rows={4}
                size='small'
                variant='outlined'
                placeholder='Enter Post Body...'
                label='Body'
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </FormGroup>
            <FormGroup className='w-100 form-group'>
              <input
                type='file'
                name='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </FormGroup>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              UPLOAD POST
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default AddPost;
