import { Box,Typography, Grid } from '@mui/material';

function MobileTopNav(){
 return(
    <Box item sx={{  display: {xs: 'flex', sm: 'none'}, height: '25px', width: '105%',  bgcolor: '#e0923f' }}>
        <Typography sx={{ color: 'transparent' }}>PACK CENTRAL</Typography>
    </Box>
 )
}

export default MobileTopNav;