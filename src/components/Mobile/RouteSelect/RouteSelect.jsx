import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarGroup, Card, CardContent, Avatar, Typography, Grid, Button } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FlagIcon from '@mui/icons-material/Flag';

function RouteSelect() {
    // this screen gives an employee the option to select which route they are assigned for the day
    // it gives a snapshot of how many dogs are on the route, and shows their avatars on a card
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_DAILY_ROUTES' });


    }, []);

    // reducer getting filled with a specific routes dogs
    const user = useSelector(store => store.user);
    const dailyRoutes = useSelector(store => store.dailyDogz);
    const allroutes = Object.keys(dailyRoutes); //pulls route names out of route object
    // const routes = allroutes.slice(0, 4);

    const getRouteColor = (route) => {
        switch (route) {
            case 'Tangletown': return '#4a5061';
            case 'Emerson': return '#539bd1';
            case 'Far': return '#3DA49D';
            case 'Misfits': return '#f5a572';
            case 'Unassigned': return '#f37e2d';
            default: return '#f8614d';
        }
    }

    const checkoutRoute = (routeID) => {
        dispatch({ type: 'GET_ROUTE_DETAILS', payload: routeID })
        history.push(`/m/route/${routeID}`);
    }



    return (
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-evenly', mt: 2, mb: 3 }}>

            {/* route is the name of each route */}
            {allroutes.map((route, i) => (
                <Grid item xs={11} key={i} >
                    <Card raised sx={{ background: () => getRouteColor(route) }} onClick={(event) => checkoutRoute((i + 1))}>
                        <Typography sx={{ color: 'white', textTransform: 'uppercase', textAlign: 'center' }}>
                            {route} {dailyRoutes[route].length}
                        </Typography>
                        <CardContent>
                            <AvatarGroup>
                                {dailyRoutes && dailyRoutes[route].map((dog, index) => (

                                    <div>
                                        {
                                            dog.image ?
                                                <Avatar src={dog.image} key={index} />
                                                :
                                                <Avatar key={index}>
                                                    {dog.name[0]}
                                                </Avatar>

                                        }

                                    </div>

                                ))}
                            </AvatarGroup>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

            {user.admin ?
                <Grid item xs={12} sx={{ justifyContent: 'space-around', alignItems: 'center', mb: 15 }}>
                    <Button variant='contained' color='info' onClick={() => history.push('/m/routes/admin')} sx={{ position: 'absolute', left: '31%' }}>Load Balancing</Button>
                </Grid>
                :
                null
            }
        </Grid>

    );
}

export default RouteSelect;