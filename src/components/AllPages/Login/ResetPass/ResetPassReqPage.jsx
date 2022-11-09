import React from 'react';

import { useHistory } from 'react-router-dom';
import ResetPassReqForm from './ResetPassReqForm';

function ResetPassReqPage() {
  const history = useHistory();

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

export default ResetPassReqPage;
