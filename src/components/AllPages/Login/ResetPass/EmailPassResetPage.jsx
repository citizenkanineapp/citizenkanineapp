import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, Card, TextField, CardContent, Button } from '@mui/material';
import swal from 'sweetalert'


function ResetPassPage() {
  const [email, setEmail] = useState('');
  const errors = useSelector((store) => store.errors);
//   const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'CLEAR_PASSWORD_ERROR' });
  }, []);

  const sendResetEmail = (event) => {
    event.preventDefault();
  
      dispatch({
        type: 'EMAIL_PASS_RESET',
        payload: {
          email: email
        },
      });

      setEmail('');
    //   dispatch({ type: 'PASSWORD_RESET' });
      history.push('/home');
  }; // end resetPass

  return (
    <Box className="login_container">
      <Grid container sx={{ justifyContent: "center", alignItems: "center", display: "flex", height: "80vh" }}>
        <Grid item xs={10} sm={4}>
          <Card className="login_card" sx={{ height: '60%' }}>
            <Typography sx={{ mt: 2 }} align="center">
              Send Reset Link to:
            </Typography>
            {errors.resetPasswordMessage && (
              <Typography sx={{ fontSize: 10 }} align="center" className="alert" role="alert">
                {errors.resetPasswordMessage}
              </Typography>
            )}
            <CardContent onSubmit={sendResetEmail} component="form" className="formPanel" sx={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", height: '70%' }}>
              <TextField
                margin="dense"
                label="Email address"
                size="small"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
