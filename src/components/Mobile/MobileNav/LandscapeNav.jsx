function LandscapeNav(){
    return (
      <Grid item sx={{ 
            height: '7%',
            width: '100%',  
            display: {xs: 'none', sm: 'flex'},
            flexDirection: 'row', 
            bgcolor: '#e0923f' }}>

        <Button onClick={() => history.push('/m/user')} sx={{color: 'whitesmoke', width: '15%'}}>Home</Button>
        <Button onClick={() => history.push('/m/routes')} sx={{color: 'whitesmoke', width: '15%'}}>Routes</Button>
        <Button onClick={() => history.push('/m/map')} sx={{color: 'whitesmoke', width: '15%'}}>Map</Button>
        <Button onClick={() => history.push('/m/employees')} sx={{color: 'whitesmoke', width: '15%'}}>Schedule</Button>
      </Grid> 
    )
}

export default LandscapeNav;