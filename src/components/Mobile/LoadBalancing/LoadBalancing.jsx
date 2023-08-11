import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDoubleTap } from 'use-double-tap';
import './LoadBalancing.css';
//MUI
import { Box, Typography, Grid, Button, Popover, Avatar, Card, CardMedia, CardContent, Switch, Dialog, Divider } from '@mui/material';
import FlagCircleRoundedIcon from '@mui/icons-material/FlagCircleRounded';
import FlagIcon from '@mui/icons-material/Flag';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function LoadBalancing() {

  //window.oncontextmenu = function() { return false; } //disables menu while testing

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_DAILY_ROUTES' });
    //document.documentElement.requestFullscreen();   <------ TEST FOR LOCKING INTO LANDSCAPE
    //screen.orientation.lock("landscape");
  }, []);
  
  // pulling daily routes from the reducer 
  const dailyRoutes = useSelector(store => store.dailyDogz);
  // pulling route names out of dailyRoutes object
  const routes = Object.keys(dailyRoutes); 

  //COLOR OF ROUTE HEADER
  const getRouteColor = (route) => {
    switch (route) {
      case 'Tangletown': return '#6e6d6c';
      case 'Emerson': return '#6e6d6c';
      case 'Far': return '#878482';
      case 'Misfits': return '#a39f9d';
      case 'Unassigned': return '#c2bebb';
      default: return '#f8614d';
    }
  }


  // disables/enables dragging
  const [draggingStatus, setDraggingStatus] = useState(true);
  //VIBRATES PHONE WHEN DND UNLOCKED
  const onDragStart = (result) => {
    //console.log('drag start', result)

    //if(dailyRoutes[SourceBuffer.])
   
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };
  //TRIGGERS DND LOGIC IN REDUCER
  const onDragEnd = (result) => {
    //console.log('drag end');

    //prevents being triggered if outside of lists
    if (!result.destination) return; 
    // console.log('onDragEnd');
    dispatch({ type: 'MOVE_DOG', payload: result });
    dispatch({ type: 'UPDATE_ROUTE', payload: { routeName: result.destination.droppableId, dogID: result.draggableId } });
  };


  // dog notes for flagged dogs
  const [showDetails, setShowDetails] = useState(false);
  const [doggo, setDoggo] = useState({});
  //DOUBLE CLICK LISTENER FOR DOG DETAILS
  const openDialog = useDoubleTap((event) => {
    //console.log('Double tapped');
    if (doggo.flag === true){
      setShowDetails(!showDetails);
    }
  });


  return (
    <Grid container sx={{ height: '95%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1 }}>
      
      {/*-----PORTRAIT HEADER-----*/}
      <Grid item sx={{ display: { xs: 'flex', sm: 'none' }, height: '5%', width: '100%',  bgcolor: '#e0923f' }}>
        <Typography sx={{ color: 'transparent' }}>PACK CENTRAL</Typography>
      </Grid>

      {/*---PORTRAIT DIRECTIONS---*/}
      <Card sx={{display: { xs: 'flex', smDD: 'none' }, flexDirection: 'column', width: '60%', height: '40%' }}>
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
      <Box sx={{ height: '10%',
                 width: '100%',  
                 display: {xs: 'none', smDD: 'flex'},
                 flexDirection: 'row', 
                 justifyContent: 'space-between',
                 bgcolor: '#e0603f' }}>

        <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
          <Button onClick={() => history.push('/m/user')} sx={{color: 'whitesmoke', fontWeight: '800'}}>Home</Button>
          <Button onClick={() => history.push('/m/routes')} sx={{color: 'whitesmoke', fontWeight: '800'}}>Routes</Button>
          <Button onClick={() => history.push('/m/schedule')} sx={{color: 'whitesmoke', fontWeight: '800'}}>Schedule</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>  {/* conditional rendering to enable drag */}
          <Switch onChange={() => setDraggingStatus(!draggingStatus)} checked={draggingStatus === true ? false : true} size="small" 
            sx={{ p: 0.5, 
                  "& .Mui-checked": {color: "whitesmoke"}, 
                  "& .MuiSwitch-track": {backgroundColor: "whitesmoke !important"}
                  }}/>
          <Button onClick={() => setDraggingStatus(!draggingStatus)} sx={{color: 'whitesmoke', p: 0, fontWeight: '800'}}>Edit</Button>
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
              display: {xs: 'none', smDD: 'flex'},
              flexDirection: 'column',
              alignItems: 'center',
              flexWrap: 'wrap',
              bgcolor: '#F0ECE9',
              overflowx: 'scroll',
              borderRadius: '0.5rem',
              }}>
            <Box 
              sx={{
                background: () => getRouteColor(route),
                width: '100%',
                height: '10%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopLeftRadius: '0.5rem',
                borderTopRightRadius: '0.5rem',
                boxShadow: '0px 1px 1px #4c4b49'
                }}>
              <Typography 
                sx={{
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  pl: 1,
                  color: 'whitesmoke'
                  }}>
                {route}
              </Typography>
              <Avatar 
                variant="outlined" 
                sx={{
                  width: '17%',
                  height: '70%',
                  fontSize: '0.8rem',
                  mr: 0.5,
                  bgcolor: 'whitesmoke',
                  fontWeight: '800',
                  color: () => getRouteColor(route)
                  }}>
                {dailyRoutes[route].length}
              </Avatar>
            </Box>

            <Droppable droppableId={route}>
              {(provided, snapshot) => (
                <Box  {...provided.droppableProps} ref={provided.innerRef}
                  sx={{
                      height: '85%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifySelf: 'flex-end',
                      overflowY: 'scroll', pt: 2, p: 0, mt: 1,
                      boxShadow: '5px, 5px, 5px #4c4b49 !important'
                      }}>
                  {/* maps through each dog in route list and creates a chip */}
                  {dailyRoutes && dailyRoutes[route].map((dog, index) => 
                    <Grid container key={dog.id}
                        sx={{display: 'flex', 
                             flexDirection: 'column', 
                             gap: 1,
                             alignItems: 'center',
                             }}>
                        <Dialog open={dog.notes && showDetails === true} onClose={() => setShowDetails(!showDetails)}
                            hideBackdrop={true} 
                            sx={{
                              '& .css-1u4brho-MuiPaper-root-MuiDialog-paper': 
                                  { boxShadow: 'none !important',
                                    border: '0.2px solid  #cdc0b6',
                                    width: '30%' 
                                    }}}>
                          <Typography 
                              sx={{ fontSize: '0.9rem', 
                                  verticalAlign: 'center', 
                                  px: 2, pt: 2, pb: 1
                                  }}>
                            <FlagCircleRoundedIcon 
                                sx={{ fontSize: '1rem', 
                                    verticalAlign: -3, 
                                    py: 0, pr: 0.5, 
                                    fill: '#e0603f', 
                                    transform: 'rotate(-30deg)'
                                    }}/>
                              {doggo.name}
                          </Typography>
                          <Divider variant="middle"/>
                          <Typography 
                              sx={{ fontSize: '0.5rem', 
                              px: 2, pb: 2, pt: 1
                              }}>
                              {doggo.notes}
                          </Typography>
                        </Dialog>
                
                    {/*-------------CHIP-------------*/}                            {/*where drag is disabled*/}
                    <Draggable draggableId={`${dog.dog_id}`} index={index} isDragDisabled={draggingStatus} key={dog.dog_id} sx={{width: '100%'}}>
                      {(provided, snapshot) => (

                        <Box
                         //if dog has a flagged status and dragging is disabled, open details
                         {...openDialog} 
                         onTouchStart={() => setDoggo(dog)}
                          //----DND----//
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}                            
                          style={{ backgroundColor: dog.color ? dog.color : '#F0ECE9',  //sets color if in a household of more than one dog
                                   filter: snapshot.isDragging && 'brightness(0.94) saturate(110%)', //makes color slightly darker while dragging     
                                   boxShadow: snapshot.isDragging ? '0px 1px 1px #322f2d5c' : '1px 2px 1px #322f2d25', //creates a deeper shadow when picked up
                                   ...provided.draggableProps.style }}                                         
                          //----MUI----//
                          variant='outlined'
                          sx={{ 
                              width: '60%', 
                              height: '8vh',
                              display: 'flex', 
                              flexDirection: 'row', 
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              borderRadius: 1,
                              border: '0.5px solid #cbc7c7',
                              pl: 1, pr: 1, my: 0.3
                              }}>
                            <Typography 
                              sx={{ fontSize: '0.9rem', 
                                    fontWeight: '300', 
                                    color: dog.color ? 'whitesmoke' : '#444444'
                                    }}>
                              {dog.name.length > 8 ? dog.name.slice(0, 8) + "..." : dog.name}
                            </Typography>
                            {dog.flag === true &&  //conditionally rendering if dog has flag status
                              <FlagCircleRoundedIcon 
                                sx={{ fontSize: '1rem', 
                                      transform: 'rotate(-30deg)',
                                      fill: dog.color ? 'whitesmoke' : '#444444'
                                      }}/>}

                        </Box>

                      )}

                    </Draggable>
                    </Grid>
                  )}

       
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
