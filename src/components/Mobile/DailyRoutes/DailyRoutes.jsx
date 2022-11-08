//MUI
import { Box, Typography, Paper, Chip, Grid, Card, CardContent, Button, CardHeader } from '@mui/material';

function DailyRoutes(){
  const dawgs = [
    {name: 'Fido', route: 'TangleTown', flagged: false},
    {name: 'Fiona', route: 'TangleTown', flagged: true},
    {name: 'Ferris', route: 'TangleTown', flagged: false},
    {name: 'Frenchie', route: 'TangleTown', flagged: false},
    {name: 'Fowler', route: 'Emerson', flagged: true},
    {name: 'Froggy', route: 'Emerson', flagged: false},
    {name: 'Frodo', route: 'Emerson', flagged: false},
    {name: 'Flora', route: 'Emerson', flagged: false},
    {name: 'Flo', route: 'Emerson', flagged: false},
    {name: 'Fred', route: 'Far', flagged: true},
    {name: 'Ferrah', route: 'Far', flagged: false},
    {name: 'Forrest', route: 'Far', flagged: true},
    {name: 'Fanny', route: 'Far', flagged: false},
    {name: 'Flip', route: 'Misfits', flagged: false},
    {name: 'Fae', route: 'Misfits', flagged: false},
    {name: 'Fork', route: 'Misfits', flagged: false},
  ];

    return (
        <Grid container sx={{ height: '90%', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        
          <Card sx={{ width: '90%', height: '15%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightGrey' }}>
            <Typography variant='b1'>TangleTown</Typography>
            <CardContent>
              {dawgs.map(dog => dog.route === 'TangleTown' && <Chip label={dog.name}/>)}      
            </CardContent>
          </Card>

          <Card sx={{ width: '90%', height: '15%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightGrey' }}>
            <Typography variant='b1'>Emerson</Typography>
            <CardContent>
              {dawgs.map(dog => dog.route === 'Emerson' && <Chip label={dog.name}/>)}
            </CardContent>
          </Card>

          <Card sx={{ width: '90%', height: '15%', bgcolor: 'lightGrey', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr'}}>
            {/* <CardHeader sx={{ width: '10%', bgcolor: 'lightBlue' }}> */}
              <Typography variant='b1' sx={{ transform: 'rotate(-90deg)' }}>Far</Typography>
            {/* </CardHeader> */}

            <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              {dawgs.map(dog => dog.route === 'Far' && <Chip label={dog.name}/>)}
            </CardContent>
          </Card>

          <Card sx={{ width: '90%', height: '15%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightGrey' }}>
            <Typography variant='b1'>Misfits</Typography>
            <CardContent>
              {dawgs.map(dog => dog.route === 'Misfits' && <Chip label={dog.name}/>)}  
            </CardContent> 
          </Card>

          <Card sx={{ width: '90%', height: '15%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightGrey' }}>
            <Typography variant='b1'>Misfits</Typography>
            <CardContent>
              {dawgs.map(dog => dog.route === 'Misfits' && <Chip label={dog.name}/>)}  
            </CardContent> 
          </Card>

        <Button>Edit</Button>
        </Grid>
      );
}

export default DailyRoutes;