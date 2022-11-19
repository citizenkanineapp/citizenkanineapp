import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography, Card, TextField, CardContent, Button } from '@mui/material';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect')
    dispatch({ type: 'CLEAR_LOGIN_ERROR' });
  }, []);

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

  const mobilelogin = (event) => {
    // event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      history.push('/m/user');

    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login


  return (
    <Box className="login_container">
      <Grid container sx={{ justifyContent: "center", alignItems: "center", display: "flex", height: "80vh" }}>
        <Card className="login_card" sx={{ width: "30%", height: "70%" }}>
          <Typography sx={{ mt: 2 }} align="center">
            Login
          </Typography>
          {errors.loginMessage && (
            <Typography sx={{ fontSize: 10 }} align="center" className="alert" role="alert">
              {errors.loginMessage}
            </Typography>
          )}
          <CardContent onSubmit={login} component="form" className="formPanel" sx={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", height: '80%' }}>
            <TextField
              margin="dense"
              label="username"
              size="small"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              margin="dense"
              type="password"
              label="password"
              size="small"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button sx={{ display: { xs: 'block', sm: 'none', color: 'primary' } }} onClick={(event) => mobilelogin()}>
              Login
            </Button>
            <Button type="submit" sx={{ display: { xs: 'none', sm: 'block', color: 'primary' } }}>
              Login
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}

export default LoginPage;
