import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ResetPassReqForm() {
  const [email, setEmail] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const resetPassword = (event) => {
    event.preventDefault();

    dispatch({
      type: 'RESETPASS',
      payload: {
        username: username,
        password: password,
      },
    });
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
          Email address:
          <input
            type="text"
            name="username"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>

      <div>
        <input className="btn" type="submit" name="submit" value="Reset Password" />
      </div>
    </form>
  );
}

export default ResetPassReqForm;
