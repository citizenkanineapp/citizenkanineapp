import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarGroup, Card, CardContent, Avatar, Typography, Grid, Button } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FlagIcon from '@mui/icons-material/Flag';

function RouteSelect() {
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
            case 'tangletown': return '#4a5061';
            case 'emerson': return '#539bd1';
            case 'far': return '#3DA49D';
            case 'misfits': return '#f5a572';
            case 'unassigned': return '#f37e2d';
            default: return '#f8614d';
        }
    }

    const checkoutRoute = (routeID) => {
        // dispatch({ type: 'GET_ROUTE_DETAILS', payload: routeID })
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

                                    <>
                                        {dog.image ?
                                            <Avatar src={dog.image} key={index} />
                                            :
                                            <Avatar key={index}>
                                                {dog.name[0]}
                                            </Avatar>

                                        }
                                    </>
                                ))}
                            </AvatarGroup>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

            {user.admin ?
                <Grid item xs={12} sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
                    <Button variant='contained' color='secondary' onClick={() => history.push('/m/routes/admin')}>Load Balancing</Button>
                </Grid>
                :
                null
            }
        </Grid>

    );
}

export default RouteSelect;