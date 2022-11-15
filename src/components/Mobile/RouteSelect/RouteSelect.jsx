import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarGroup, ListItemAvatar, Fab, CardMedia, Card, Paper, Stack, CardContent, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FlagIcon from '@mui/icons-material/Flag';

function RouteSelect() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_DAILY_ROUTES' });


    }, []);

    // reducer getting filled with a specific routes dogs
    const dailyRoutes = useSelector(store => store.dnd.routes);
    const allroutes = Object.keys(dailyRoutes); //pulls route names out of route object
    const routes = allroutes.slice(0, 4);

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
        dispatch({ type: 'GET_ROUTE_DETAILS', payload: routeID })
    }



    return (
        <Grid container spacing={2} sx={{ height: '85%', alignItems: 'center', justifyContent: 'center' }}>
            {/* route is the name of each route */}
            {routes.map((route, i) => (
                <Grid item xs={11} sx={{ height: '20%' }}>
                    {/* TANGLETOWN */}
                    <Card raised sx={{ background: () => getRouteColor(route) }} onClick={(event) => checkoutRoute((i + 1))}>
                        <Typography sx={{ color: 'white', textTransform: 'uppercase', textAlign: 'center' }}>
                            {route}
                        </Typography>
                        <CardContent>
                            <AvatarGroup>
                                {dailyRoutes && dailyRoutes[route].map((dog, index) => (

                                    <>
                                        {dog.image ?
                                            <Avatar src={dog.image} />
                                            :
                                            <Avatar>
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
        </Grid>

    );
}

export default RouteSelect;