import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Box, Grid, Typography, Card, TextField, CardContent, Button } from '@mui/material';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Box className="login_container">
      <Grid container sx={{ justifyContent: "center", alignItems: "center", display: "flex", height: "80vh" }}>
        <Card sx={{ width: "30%", height: "60%" }}>
          <Typography sx={{mt: 2}}align="center">
            Login
          </Typography>
            {errors.loginMessage && (
              <Typography sx={{fontSize: 10}} className="alert" role="alert">
                {errors.loginMessage}
              </Typography>
            )}
            {/* onSubmit? */}
            <CardContent onSubmit={login} component ="form" className="formPanel" sx={{ justifyContent: "center", alignItems: "center", height: '100%' }}>
              <TextField
                margin="dense"
                label="username"
                size="small"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                margin="dense"
                label="password"
                size="small"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button type="submit">
                Login
              </Button>
              <Typography align="center" sx={{fontSize: 14}} >Forgot Password?</Typography>
            </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}

export default LoginPage;
