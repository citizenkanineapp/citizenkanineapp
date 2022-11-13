import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLongPress } from 'use-long-press';
import './LoadBalancing.css';
//MUI
import { Box, Typography, Grid, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Chip, Avatar } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function LoadBalancing(){

    //window.oncontextmenu = function() { return false; } //disables menu while testing

    ////////////////////////dummy data////////////////////////
    const dawgs = [
      {id: 1, name: 'Fido', route: 'tangletown', flagged: false, notes: 'This dog has special needs!'},
      {id: 2, name: 'Fiona', route: 'tangletown', flagged: true, notes: 'This dog has special needs!'},
      {id: 3, name: 'Ferris', route: 'emerson', flagged: false, notes: 'This dog has special needs!'},
      {id: 4, name: 'Frenchie', route: 'emerson', flagged: false, notes: 'This dog has special needs!'},
      {id: 5, name: 'Fowler', route: 'emerson', flagged: true, notes: 'This dog has special needs!'},
      {id: 6, name: 'Froggy', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 7, name: 'Frodo', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 8, name: 'Flora', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 9, name: 'Flo', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 10, name: 'Fred', route: 'misfits', flagged: true, notes: 'This dog has special needs!'},
      {id: 11, name: 'Ferrah', route: 'misfits', flagged: false, notes: 'This dog has special needs!'},
      {id: 12, name: 'Forrest', route: 'misfits', flagged: true, notes: 'This dog has special needs!'},
      {id: 13, name: 'Fanny', route: 'misfits', flagged: false, notes: 'This dog has special needs!'},
      {id: 14, name: 'Flip', route: 'unassigned', flagged: false, notes: 'This dog has special needs!'},
      {id: 15, name: 'Fae', route: 'unassigned', flagged: false, notes: 'This dog has special needs!'},
      {id: 16, name: 'Fraaancheskah', route: 'unassigned', flagged: true, notes: 'This dog has special needs!'},
      {id: 120192, name: 'Fido', route: 'tangletown', flagged: false, notes: 'This dog has special needs!'},
      {id: 270017292, name: 'Fiona', route: 'tangletown', flagged: true, notes: 'This dog has special needs!'},
      {id: 3102792, name: 'Ferris', route: 'emerson', flagged: false, notes: 'This dog has special needs!'},
      {id: 4007592, name: 'Frenchie', route: 'emerson', flagged: false, notes: 'This dog has special needs!'},
      {id: 51072792, name: 'Fowler', route: 'emerson', flagged: true, notes: 'This dog has special needs!'},
      {id: 6701592, name: 'Froggy', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 7715902, name: 'Frodo', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 817012392, name: 'Flora', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 917259002, name: 'Flo', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 10201972, name: 'Fred', route: 'misfits', flagged: true, notes: 'This dog has special needs!'},
      {id: 11105792, name: 'Ferrah', route: 'misfits', flagged: false, notes: 'This dog has special needs!'},
      {id: 12001952, name: 'Forrest', route: 'misfits', flagged: true, notes: 'This dog has special needs!'},
      {id: 13014392, name: 'Fanny', route: 'misfits', flagged: false, notes: 'This dog has special needs!'},
      {id: 144092, name: 'Flip', route: 'unassigned', flagged: false, notes: 'This dog has special needs!'},
      {id: 15140092, name: 'Fae', route: 'unassigned', flagged: false, notes: 'This dog has special needs!'},
      {id: 1614092, name: 'Fraaancheskah', route: 'unassigned', flagged: true, notes: 'This dog has special needs!'},
      {id: 119004212, name: 'Fido', route: 'tangletown', flagged: false, notes: 'This dog has special needs!'},
      {id: 21904212, name: 'Fiona', route: 'tangletown', flagged: true, notes: 'This dog has special needs!'},
      {id: 31902412, name: 'Ferris', route: 'emerson', flagged: false, notes: 'This dog has special needs!'},
      {id: 40192412, name: 'Frenchie', route: 'emerson', flagged: false, notes: 'This dog has special needs!'},
      {id: 51942120, name: 'Fowler', route: 'emerson', flagged: true, notes: 'This dog has special needs!'},
      {id: 61392120, name: 'Froggy', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 71932120, name: 'Frodo', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 81932102, name: 'Flora', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 91923120, name: 'Flo', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 101932120, name: 'Fred', route: 'misfits', flagged: true, notes: 'This dog has special needs!'},
      {id: 111932120, name: 'Ferrah', route: 'misfits', flagged: false, notes: 'This dog has special needs!'},
      {id: 121932120, name: 'Forrest', route: 'misfits', flagged: true, notes: 'This dog has special needs!'},
      {id: 13199320102, name: 'Fanny', route: 'misfits', flagged: false, notes: 'This dog has special needs!'},
      {id: 14199021212, name: 'Flip', route: 'unassigned', flagged: false, notes: 'This dog has special needs!'},
      {id: 151992102123, name: 'Fae', route: 'unassigned', flagged: false, notes: 'This dog has special needs!'},
      {id: 161920912123, name: 'Fraaancheskah', route: 'unassigned', flagged: true, notes: 'This dog has special needs!'},
      {id: 11920192123, name: 'Fido', route: 'tangletown', flagged: false, notes: 'This dog has special needs!'},
      {id: 21920192123, name: 'Fiona', route: 'tangletown', flagged: true, notes: 'This dog has special needs!'},
      {id: 31921091203, name: 'Ferris', route: 'emerson', flagged: false, notes: 'This dog has special needs!'},
      {id: 419021299123, name: 'Frenchie', route: 'emerson', flagged: false, notes: 'This dog has special needs!'},
      {id: 519210291023, name: 'Fowler', route: 'emerson', flagged: true, notes: 'This dog has special needs!'},
      {id: 619021209123, name: 'Froggy', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 711002993, name: 'Frodo', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 8140992, name: 'Flora', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 919099932, name: 'Flo', route: 'far', flagged: false, notes: 'This dog has special needs!'},
      {id: 103991092, name: 'Fred', route: 'misfits', flagged: true, notes: 'This dog has special needs!'},
      {id: 11119092, name: 'Ferrah', route: 'misfits', flagged: false, notes: 'This dog has special needs!'},
      {id: 12019822, name: 'Forrest', route: 'misfits', flagged: true, notes: 'This dog has special needs!'},
      {id: 133008192, name: 'Fanny', route: 'misfits', flagged: false, notes: 'This dog has special needs!'},
      {id: 141808192, name: 'Flip', route: 'unassigned', flagged: false, notes: 'This dog has special needs!'},
      {id: 1528190002, name: 'Fae', route: 'unassigned', flagged: false, notes: 'This dog has special needs!'},
      {id: 163808008192, name: 'Fraaancheskah', route: 'unassigned', flagged: true, notes: 'This dog has special needs!'}
    ];

    const dayRoutes = {
      tangletown: dawgs.filter(dog => (dog.route === 'tangletown')), 
      emerson: dawgs.filter(dog => (dog.route === 'emerson')),
      far: dawgs.filter(dog => (dog.route === 'far')),
      misfits: dawgs.filter(dog => (dog.route === 'misfits')),
      unassigned: dawgs.filter(dog => (dog.route === 'unassigned'))
    };
    /////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_DAILY_ROUTES', payload: dayRoutes }); //should eventually trigger SAGA function to GET dailyDogs
  }, []);

  const dailyRoutes = useSelector(store => store.dnd.routes);
  const routes = Object.keys(dailyRoutes); //pulls route names out of route object

  //VIBRATES PHONE WHEN DND UNLOCKED
  const onDragStart = () => {
    console.log('dragracelol')
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const [draggingStatus, setDraggingStatus] = useState(true);
  //TRIGGERS DND LOGIC IN REDUCER
  const onDragEnd = (result) => {
    console.log(result);
    //setDraggingStatus(!draggingStatus);
    if (!result.destination) return; //prevents being triggered if outside of lists
    dispatch({ type: 'MOVE_DOG', payload: result });
   
  };

  //COLOR OF ROUTE HEADER
  const getRouteColor = (route) => {
    switch(route){
      case 'tangletown': return '#4a5061';
      case 'emerson': return '#539bd1';
      case 'far': return '#3DA49D';
      case 'misfits': return '#f5a572';
      case 'unassigned': return '#f37e2d';
      default: return '#f8614d';
    }
  }

  //DIALOG
  const [showDetails, setShowDetails] = useState(false);
  const [doggo, setDoggo] = useState({})
  const openDetailsDialog = (dog) => {
    if (dog.flagged === true){
      setDoggo(dog);
      setShowDetails(!showDetails);
    }
  }

  const handleClick = (e) => {
    console.log(e.detail);
    switch (e.detail) {
      case 1: {
        console.log('single click');
        break;
      }
      case 2: {
        console.log('double click');
        break;
      }
      case 3: {
        console.log('triple click');
        break;
      }
      default: {
        break;
      }
    }
  };


    return (
        <Grid container sx={{ height: '93%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>

            {/* maps through all five routes and creates a card for each */}
            {routes.map((route, i) => (       
              //*-------------CARD-------------*//
                <Box
                    key={route}
                    sx={{ 
                          height: '95%',
                          width: '18%', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          flexWrap: 'wrap',
                          bgcolor: '#F0ECE9',
                          borderRadius: '0.5rem',
                        }}
                    >
                    <Box sx={{ background: () => getRouteColor(route), 
                               width: '100%', 
                               height: '10%',
                               display: 'flex',
                               flexDirection: 'row', 
                               justifyContent: 'space-between',
                               alignItems: 'center',
                               borderTopLeftRadius: '0.5rem',
                               borderTopRightRadius: '0.5rem' }}>
                      <Typography sx={{ fontSize: '0.8rem', 
                                        fontStyle: 'italic', 
                                        pl: 1,
                                        color: 'whitesmoke' }}
                          >{route}</Typography>
                      <Avatar variant="outlined" sx={{ width: '17%', 
                                                       height: '70%', 
                                                       fontSize: '0.8rem', 
                                                       mr: 0.5, 
                                                       bgcolor: 'whitesmoke', 
                                                       color: () => getRouteColor(route) }}
                        >{dailyRoutes[route].length}</Avatar>
                    </Box>
              <Droppable droppableId={route} key={i}> 
                  {(provided, snapshot) => (        
                    <Box  {...provided.droppableProps} ref={provided.innerRef}
                      sx={{ height: '85%',
                            width: '100%',
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',  //if dragging doesn't work, change this to flex-start
                            justifyContent: 'flex-start',
                            overflow: 'auto',
                            my: 1 }}>

                    {/* maps through each dog in route list and creates a chip */}
                    {dailyRoutes && dailyRoutes[route].map((dog, index) => (dog.route === route &&  
                    <>

                    {/*------------DETAILS-------------*/}
                       {showDetails === true &&
                       <Popover
                            id={dog.id}
                            open={showDetails}
                            onClose={() => setShowDetails(!showDetails)}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}>
                        <Typography sx={{ p: 2 }}>{dog.details}</Typography>
                      </Popover>}


                      {/*-------------CHIP-------------*/}
                      <Draggable key={dog.id} draggableId={`${dog.id}`} index={index} isDragDisabled={false}> 
                        {(provided, snapshot) => (
                        <Box
                          key={dog.id} 
                          //{...bind()}
                          onTouchEnd={() => openDetailsDialog(dog)} //opens dog details
                          //----dnd----//
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps} 
                          ref={provided.innerRef}                             //changes color when dragging
                          style={{ backgroundColor: snapshot.isDragging ? '#D3CDC9' : 'transparent', ...provided.draggableProps.style }}
                          /////////////////////////
                          variant = 'outlined'
                          // className={snapshot.isDragging && "dog_chip"}
                          sx={{ 
                                width: '60%', 
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: 3,
                                border: '1px solid grey',
                                px: 1, my: 0.3, mx: 1
                                }}
                        >
                        <Typography sx={{ fontSize: '0.8rem', letterSpacing: '-0.01rem' }}>
                          {dog.name.length > 8 ? (dog.name).slice(0, 8) +  ".." : dog.name}
                        </Typography> 
                          {dog.flagged === true &&  //conditionally rendering if dog has flag status
                              <FlagIcon sx={{ fontSize: '1rem', fill: '#e0603f'}}/> } 
                        </Box>

                        )}

                      </Draggable>
                    </>
                  ))}
                    {/*------------------------------*/}

                      {/* creates space for possible new chip */}
                      {provided.placeholder}
                  </Box>
                    )}
                </Droppable>
                </Box>
              ))}
           {/*------------------------------*/}

          </DragDropContext>
        </Grid>
      );
}

export default LoadBalancing;



  //LONG PRESS EVENT
  // const [enabled, setEnabled] = useState(true);

  // const callback = useCallback(event => {
  //   setDraggingStatus(!draggingStatus);
  //   console.log('inhere')
  // }, []);

  // const bind = useLongPress(enabled ? callback : null, {
  //   onStart: event =>  setDraggingStatus(!draggingStatus),
  //   onFinish: event => console.log('Press finished'),
  //   onCancel: event => console.log('Press canceled'),
  //   filterEvents: event => true, // All events can potentially trigger long press
  //   threshold: 1000,
  //   captureEvent: true,
  //   cancelOnMovement: false,
  //   detect: 'both',
  // });
