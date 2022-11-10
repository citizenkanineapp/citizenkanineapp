import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography, Card, TextField, CardContent, Button } from '@mui/material';


function ResetPassReqPage() {
  const history = useHistory();
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


    <Box className="login_container">
      <Grid container sx={{ justifyContent: "center", alignItems: "center", display: "flex", height: "80vh" }}>
        <Card className="login_card" sx={{ width: "30%", height: "60%" }}>
          <Typography sx={{mt: 2}}align="center">
            Request Password Reset
          </Typography>
            {errors.loginMessage && (
              <Typography sx={{fontSize: 10}} align="center" className="alert" role="alert">
                {errors.loginMessage}
              </Typography>
            )}
          <CardContent onSubmit={resetPassword} component ="form" className="formPanel" sx={{ justifyContent: "center", alignItems: "center", height: '100%' }}>
            <TextField
              margin="dense"
              label="email"
              size="small"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button type="submit">
              Submit
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Box>    
  
    // <div>
    //   <ResetPassForm />

    //   <center>
    //     <button
    //       type="button"
    //       className="btn btn_asLink"
    //       onClick={() => {
    //         history.push('/login');
    //       }}
    //     >
    //       Login
    //     </button>
    //   </center>
    // </div>
  );
}

export default ResetPassReqPage;
