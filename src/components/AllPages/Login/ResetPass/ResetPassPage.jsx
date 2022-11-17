import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, Card, TextField, CardContent, Button } from '@mui/material';
import swal from 'sweetalert'


function ResetPassPage() {
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const errors = useSelector((store) => store.errors);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'CLEAR_PASSWORD_ERROR' });
  }, []);

  const resetPassword = (event) => {
    event.preventDefault();
    if ((newPass === confPass) && (newPass != '')) {
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
      swal("Password changed!");
      // history.push('/home');
    } else {
      console.log('password input fail!');
      dispatch({ type: 'PASSWORD_INPUT_ERROR' });
    }
  }; // end resetPass

  return (
    <Box className="login_container">
      <Grid container sx={{ justifyContent: "center", alignItems: "center", display: "flex", height: "80vh" }}>
        <Grid item xs={10} sm={4}>
          <Card className="login_card" sx={{ height: '60%' }}>
            <Typography sx={{ mt: 2 }} align="center">
              Reset Password
            </Typography>
            {errors.resetPasswordMessage && (
              <Typography sx={{ fontSize: 10 }} align="center" className="alert" role="alert">
                {errors.resetPasswordMessage}
              </Typography>
            )}
            <CardContent onSubmit={resetPassword} component="form" className="formPanel" sx={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", height: '70%' }}>
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
                SUBMIT
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default ResetPassPage;
