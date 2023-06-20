import { AppBar, ToolBar, Box } from '@mui/material';

function MobileTopNav() {
    return (
        <AppBar position='static' sx={{ display: { xs: 'flex', sm: 'none' }, top: 0, left: 0, right: 0, height: '35px', width: '100%', bgcolor: '#e0923f', mb: 1 }}>

        </AppBar>
        // <Box item >
        //     <Typography sx={{ color: 'transparent' }}>PACK CENTRAL</Typography>
        // </Box>
    )
}

export default MobileTopNav;