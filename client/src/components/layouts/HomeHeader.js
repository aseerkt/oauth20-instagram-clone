import React, { useRef, useState } from 'react';
import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/authActions';
import {
  Home,
  HomeOutlined,
  Person,
  PersonOutline,
  Notifications,
} from '@material-ui/icons';
import AddPost from '../posts/AddPost';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function HomHeader() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const path = document.location.pathname;

  const logoutEvent = (e) => {
    e.preventDefault();
    dispatch(logoutUser(history));
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className='w-100 sticky-top bg-white border-bottom'>
      <div className='row'>
        <Toolbar className='col-md-9 mx-auto'>
          <Typography variant='h6' className={classes.title}>
            <div className='navbar-brand'>
              <Link to='/' className='nav-link text-dark p-0'>
                <img
                  src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                  alt='instagram'
                />
              </Link>
            </div>
          </Typography>
          <Link className='text-dark' to='/'>
            <IconButton title='Home'>
              {path === '/' ? <Home color='primary' /> : <HomeOutlined />}
            </IconButton>
          </Link>
          {/* ADD POST MODAL */}
          <AddPost />
          {/* NOTIFICATION_DROPDOWN */}
          <IconButton title='Notification'>
            <Notifications />
          </IconButton>
          {/* <Link className='text-dark' to={`/u/${user._id}`}>
            <IconButton title='Profile'>
              {path === `/u/${user._id}` ? (
                <Person color='primary' />
              ) : (
                <PersonOutline />
              )}
            </IconButton>
          </Link> */}
          <IconButton
            className='p-1'
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}
          >
            <Avatar
              src={user.image}
              alt='profile_photo'
              title={user.displayName}
            />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper elevation={3}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='menu-list-grow'
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        onClick={() => history.push(`/${user.username}`)}
                      >
                        Profile
                      </MenuItem>
                      {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                      <MenuItem onClick={logoutEvent}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </div>
    </div>
  );
}

export default HomHeader;
