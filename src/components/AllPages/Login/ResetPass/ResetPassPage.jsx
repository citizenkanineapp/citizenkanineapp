import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, Card, TextField, CardContent, Button } from '@mui/material';


function ResetPassPage() {
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const errors = useSelector((store) => store.errors);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=> {
    dispatch({ type: 'CLEAR_PASSWORD_ERROR'});
  },[]);

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
      history.push('/home');
    } else {
      dispatch({ type: 'PASSWORD_INPUT_ERROR' });

    }
  }; // end resetPass

  return (
    <Box className="login_container">
      <Grid container sx={{ justifyContent: "center", alignItems: "center", display: "flex", height: "80vh" }}>
        <Card className="login_card" sx={{ width: "30%", height: "60%" }}>
          <Typography sx={{mt: 2}}align="center">
            Reset Password
          </Typography>
            {errors.loginMessage && (
              <Typography sx={{fontSize: 10}} align="center" className="alert" role="alert">
                {errors.loginMessage}
              </Typography>
            )}
          <CardContent onSubmit={resetPassword} component ="form" className="formPanel" sx={{ justifyContent: "center", alignItems: "center", height: '100%' }}>
            <TextField
              margin="dense"
              label="New password"
              size="small"
              value={newPass}
              onChange={(event) => setNewPass(event.target.value)}
            />
            <TextField
              margin="dense"
              label="Confirm password"
              size="small"
              value={confPass}
              onChange={(event) => setConfPass(event.target.value)}
            />
            <Button type="submit">
              Login
            </Button>
            <Link to="/resetpassreq">
              <Typography gutterBottom align="center" sx={{fontSize: 14}} >Forgot Password?</Typography>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Box>




  //   <form className="formPanel" onSubmit={resetPassword}>
  //     <h2>Reset Password</h2>
  //     {errors.resetPasswordMessage && (
  //       <h3 className="alert" role="alert">
  //         {errors.resetPasswordMessage}
  //       </h3>
  //     )}
  //     <div>
  //       <label htmlFor="username">
  //         New Password:
  //         <input
  //           type="text"
  //           name="username"
  //           value={newPass}
  //           required
  //           onChange={(event) => setNewPass(event.target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label htmlFor="username">
  //         Confirm New Password:
  //         <input
  //           type="text"
  //           name="username"
  //           value={confPass}
  //           required
  //           onChange={(event) => setConfPass(event.target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <input className="btn" type="submit" name="submit" value="Reset Password" />
  //     </div>
  //   </form>
  );
}

export default ResetPassPage;
