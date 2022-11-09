import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ResetPassForm() {
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const errors = useSelector((store) => store.errors);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const resetPassword = (event) => {
    event.preventDefault();
    if ((newPass === confPass)  && (newPass != '')) {
      dispatch({
        type: 'RESETPASS',
        payload: {
          password: newPass,
          id: user.id
        },
      });

      setNewPass('');
      setConfPass('');
      dispatch({ type: 'PASSWORD_RESET' });
    } else {
      dispatch({ type: 'PASSWORD_INPUT_ERROR' });

    }
  }; // end resetPass

  return (
    <form className="formPanel" onSubmit={resetPassword}>
      <h2>Reset Password</h2>
      {errors.resetPasswordMessage && (
        <h3 className="alert" role="alert">
          {errors.resetPasswordMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          New Password:
          <input
            type="text"
            name="username"
            value={newPass}
            required
            onChange={(event) => setNewPass(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Confirm New Password:
          <input
            type="text"
            name="username"
            value={confPass}
            required
            onChange={(event) => setConfPass(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Reset Password" />
      </div>
    </form>
  );
}

export default ResetPassForm;
