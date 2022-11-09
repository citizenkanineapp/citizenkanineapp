import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ResetPassForm from './ResetPassForm';

function ResetPassPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=> {
    dispatch({ type: 'RESET_PASSWORD_ERROR'});
  },[]);


  return (
    <div>
      <ResetPassForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default ResetPassPage;
