import React from 'react';
import { Alert } from '@material-ui/lab';

function AlertInfo({ showAlert, errMess }) {
  return (
    <div className='my-1'>
      {showAlert && <Alert severity='info'>{errMess}</Alert>}
    </div>
  );
}

export default AlertInfo;
