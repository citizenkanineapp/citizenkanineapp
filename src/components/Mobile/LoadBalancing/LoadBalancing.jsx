import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLongPress } from 'use-long-press';
import './LoadBalancing.css';
//MUI
import { Box, Typography, Grid, Button, Popover, Avatar, Card, CardMedia, CardContent, Switch } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function LoadBalancing() {

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_DAILY_ROUTES' });
  }, []);
  
  // pulling daily routes from the reducer 
  const dailyRoutes = useSelector(store => store.dnd.routes);
  // pulling route names out of dailyRoutes object
  const routes = Object.keys(dailyRoutes); 
  // disables/enables dragging
  const [draggingStatus, setDraggingStatus] = useState(true);
  // dog notes for flagged dogs
  const [showDetails, setShowDetails] = useState(false);

  //VIBRATES PHONE WHEN DND UNLOCKED
  const onDragStart = () => {
    console.log('dragracelol')
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  //TRIGGERS DND LOGIC IN REDUCER
  const onDragEnd = (result) => {
    console.log('RESULT IS', result);

    //prevents being triggered if outside of lists
    if (!result.destination) return; 
    
    dispatch({ type: 'MOVE_DOG', payload: result });
    dispatch({ type: 'UPDATE_ROUTE', payload: { routeName: result.destination.droppableId, dogID: result.draggableId } });
  };

  //COLOR OF ROUTE HEADER
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


  return (
    <Grid container sx={{ height: '95%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1 }}>
      
      {/*-----PORTRAIT HEADER-----*/}
      <Grid item sx={{ display: { xs: 'flex', sm: 'none' }, height: '5%', width: '100%',  bgcolor: '#e0923f' }}>
        <Typography sx={{ color: 'transparent' }}>PACK CENTRAL</Typography>
      </Grid>

      {/*---PORTRAIT DIRECTIONS---*/}
      <Card sx={{display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', width: '60%', height: '40%' }}>
          <CardMedia
            component="img"
            height="50%"
            image="https://static.vecteezy.com/system/resources/thumbnails/000/210/848/small_2x/abstract-border-collie-dog-portrait-in-low-poly-vector-design.jpg"
            alt="dog with glasses on"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Hello!
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', fontAlign: 'center'}}>
              Please turn phone sideways to view this feature
            </Typography>
          </CardContent>
      </Card>
      
      {/*----LANDSCAPE NAV----*/}
      <Box sx={{ height: '7%',
                 width: '100%',  
                 display: {xs: 'none', sm: 'flex'},
                 flexDirection: 'row', 
                 justifyContent: 'space-between',
                 bgcolor: '#e0923f' }}>

        <Box>
          <Button onClick={() => history.push('/m/user')} sx={{color: 'whitesmoke', width: '15%', p: 0 }}>Home</Button>
          <Button onClick={() => history.push('/m/routes')} sx={{color: 'whitesmoke', width: '15%', p: 0 }}>Routes</Button>
          <Button onClick={() => history.push('/m/map')} sx={{color: 'whitesmoke', width: '15%', p: 0 }}>Map</Button>
          <Button onClick={() => history.push('/m/employees')} sx={{color: 'whitesmoke', width: '15%', p: 0 }}>Schedule</Button>
        </Box>

        <Box sx={{ justifyContent: 'center'}}>  {/* conditional rendering to enable drag */}
          <Switch onChange={() => setDraggingStatus(!draggingStatus)} checked={draggingStatus === true ? false : true} size="small" sx={{ p: 0.5 }}/>
          <Button onClick={() => setDraggingStatus(!draggingStatus)} sx={{color: 'whitesmoke', p: 0 }}>Edit</Button>
        </Box>
      
      </Box>
    

      {/*----LANDSCAPE VIEW----*/}
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>

        {/* maps through all five routes and creates a card for each */}
        {routes.map((route, i) => (
        //*------ROUTES-----*//
          <Box
            key={i}
            sx={{
              height: '90%',
              width: '18%',
              display: {xs: 'none', sm: 'flex'},
              flexDirection: 'column',
              alignItems: 'center',
              flexWrap: 'wrap',
              bgcolor: '#F0ECE9',
              overflowx: 'scroll',
              borderRadius: '0.5rem',
            }}
          >
            <Box sx={{
              background: () => getRouteColor(route),
              width: '100%',
              height: '10%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopLeftRadius: '0.5rem',
              borderTopRightRadius: '0.5rem'
            }}>
              <Typography sx={{
                fontSize: '0.8rem',
                fontStyle: 'italic',
                pl: 1,
                color: 'whitesmoke'
              }}
              >{route}</Typography>
              <Avatar variant="outlined" sx={{
                width: '17%',
                height: '70%',
                fontSize: '0.8rem',
                mr: 0.5,
                bgcolor: 'whitesmoke',
                color: () => getRouteColor(route)
              }}
              >{dailyRoutes[route].length}</Avatar>
            </Box>
            <Droppable droppableId={route}>
              {(provided, snapshot) => (
                <Box  {...provided.droppableProps} ref={provided.innerRef}
                  sx={{
                    height: '85%',
                    width: '75%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifySelf: 'flex-end',
                    overflowY: 'scroll', pt: 1
                  }}>
                  {/* maps through each dog in route list and creates a chip */}
                  {dailyRoutes && dailyRoutes[route].map((dog, index) => 
                  <div key={dog.id}>
                  {/*-----------DOG NOTES----------*/}         
                    <Popover
                          open={showDetails}
                          onClose={() => setShowDetails(!showDetails)}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}>
                        <Typography sx={{ p: 2 }}>{dog.notes}</Typography>
                    </Popover>

                    {/*-------------CHIP-------------*/}                             {/*where drag is disabled*/}
                    <Draggable draggableId={`${dog.dog_id}`} index={index} isDragDisabled={draggingStatus}>
                      {(provided, snapshot) => (

                        <Box
                          key={dog.id}    //if dog has a flagged status and dragging is disabled, open details
                          onTouchEnd={() => {(dog.flag === true && draggingStatus === true) && setShowDetails(!showDetails)}} 
                          //----DND----//
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}                             //changes color when dragging
                          style={{ backgroundColor: snapshot.isDragging ? '#D3CDC9' : 'transparent', ...provided.draggableProps.style }}
                          //----MUI----//
                          variant='outlined'
                          sx={{ 
                                width: '60%', 
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: 3,
                                border: '1px solid grey',
                                px: 1, my: 0.3, mx: 1
                                }}>
                          <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.005rem' }}>
                            {dog.name.length > 8 ? (dog.name.toUpperCase()).slice(0, 8) + "..." : dog.name.toUpperCase()}
                          </Typography>
                          {dog.flag === true &&  //conditionally rendering if dog has flag status
                            <FlagIcon sx={{ fontSize: '1rem', fill: '#e0603f' }} />}
                        </Box>

                      )}

                    </Draggable>
                  </div>
                  )}
                  {/*------------------------------*/}

                  {/* creates space for possible new chip */}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        ))}
       
      </DragDropContext>

    </Grid>
  );
}

export default LoadBalancing;
