import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/profile/Profile';
import { PrivateRoute } from './PrivateRoute';
import { loadUser } from './redux/actions/authActions';
import { CircularProgress } from '@material-ui/core';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userIsLoading = useSelector((state) => state.auth.isLoading);

  if (userIsLoading) {
    return (
      <div
        style={{ height: '100vh' }}
        className='d-flex justify-content-center align-items-center'
      >
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path='/'
          component={Home}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path='/:username'
          component={Profile}
        />
        <Route exact path='/login' component={Login} />
      </div>
    );
  }
}

export default App;
