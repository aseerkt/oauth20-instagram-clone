import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div
      className='d-flex flex-column justify-content-center align-items-center login'
      style={{ height: '100vh' }}
    >
      <Card className='col-md-5'>
        <CardContent className='h-100 d-flex flex-column justify-content-center align-items-center'>
          <img
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
            alt='Instagram Clone'
          />
          <h5 className='text-center pt-3'>MERN Instagram Clone v2.0</h5>
          <hr />
          <a
            className='btn btn-danger'
            href='http://localhost:5000/auth/google'
          >
            <i className='fab fa-google mr-2'></i> Login in with google
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
