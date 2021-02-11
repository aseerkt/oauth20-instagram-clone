import { CircularProgress } from '@material-ui/core';
import React from 'react';

function Loader() {
  return (
    <div className='d-block m-auto'>
      <CircularProgress />
    </div>
  );
}

export default Loader;
