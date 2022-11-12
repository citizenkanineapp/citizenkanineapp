import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLongPress, LongPressDetectEvents } from "use-long-press";
//MUI
import { Box, Typography, Grid, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Chip, Avatar } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function LoadBalancing() {
  ////////////////////////dummy data////////////////////////
  // const dawgs = [
  //   { id: 1, name: 'Fido', route: 'tangletown', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 2, name: 'Fiona', route: 'tangletown', flagged: true, notes: 'This dog has special needs!' },
  //   { id: 3, name: 'Ferris', route: 'emerson', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 4, name: 'Frenchie', route: 'emerson', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 5, name: 'Fowler', route: 'emerson', flagged: true, notes: 'This dog has special needs!' },
  //   { id: 6, name: 'Froggy', route: 'far', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 7, name: 'Frodo', route: 'far', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 8, name: 'Flora', route: 'far', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 9, name: 'Flo', route: 'far', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 10, name: 'Fred', route: 'misfits', flagged: true, notes: 'This dog has special needs!' },
  //   { id: 11, name: 'Ferrah', route: 'misfits', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 12, name: 'Forrest', route: 'misfits', flagged: true, notes: 'This dog has special needs!' },
  //   { id: 13, name: 'Fanny', route: 'misfits', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 14, name: 'Flip', route: 'unassigned', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 15, name: 'Fae', route: 'unassigned', flagged: false, notes: 'This dog has special needs!' },
  //   { id: 16, name: 'Fraaancheskah', route: 'unassigned', flagged: true, notes: 'This dog has special needs!' },
  // ];

  // const dawgs = useSelector(store => store.dnd);

  // 

  /////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_DAILY_ROUTES' });
    // dispatch({ type: 'SET_DAILY_ROUTES', payload: dayRoutes }); //should eventually trigger SAGA function to GET dailyDogs
  }, []);
  // pulling daily routes from the reducer 
  const dailyRoutes = useSelector(store => store.dnd.routes);
  const routes = Object.keys(dailyRoutes); //pulls route names out of route object

  const onDragStart = () => {
    // good times
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; //prevents being triggered if outside of lists
    dispatch({ type: 'MOVE_DOG', payload: result });
  };

  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const [placeholderProps, setPlaceholderProps] = useState({});

  const onDragUpdate = update => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
      .slice(0, destinationIndex)
      .reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
    });
  };

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

  const [showDetails, setShowDetails] = useState(false);
  const [doggo, setDoggo] = useState({})

  //DIALOG
  const openDetailsDialog = (dog) => {
    if (dog.flag === true) {
      setDoggo(dog);
      setShowDetails(!showDetails);
    }
  }

  return (
    <Grid container sx={{ height: '93%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>

        {/* maps through all five routes and creates a card for each */}
        {routes.map((route, i) => (

          //*-------------CARD-------------*//
          <Droppable droppableId={route} key={i}>
            {(provided, snapshot) => (              //allows for list to be horizontal
              <Box {...provided.droppableProps} ref={provided.innerRef}
                sx={{
                  height: '90%',
                  width: '18%',
                  display: 'flex',
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
                <Box
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
                  {dailyRoutes && dailyRoutes[route].map((dog, index) => (dog.route === route &&

                    //*-------------CHIP-------------*//
                    <Draggable key={dog.id} draggableId={`${dog.id}`} index={index} isDragDisabled={true}>
                      {(provided, snapshot) => (

                        <Box
                          key={dog.id}
                          onTouchStart={() => openDetailsDialog(dog)}
                          // onDragStart={onDragStart}
                          //----dnd----//
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}                             //changes color when dragging
                          style={{ backgroundColor: snapshot.isDragging ? '#D3CDC9' : 'transparent', ...provided.draggableProps.style }}
                          /////////////////////////
                          variant='outlined'
                          sx={{
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 2,
                            border: '1px solid grey',
                            px: 1, my: 0.5
                          }}
                        >
                          <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.005rem' }}>
                            {dog.name.length > 8 ? (dog.name.toUpperCase()).slice(0, 8) + "..." : dog.name.toUpperCase()}
                          </Typography>
                          {dog.flag === true &&  //conditionally rendering if dog has flag status
                            <FlagIcon sx={{ fontSize: '1rem', fill: '#e0603f' }} />}
                        </Box>

                      )}

                    </Draggable>
                  ))}
                  {/*------------------------------*/}

                  {/* creates space for possible new chip */}
                  {provided.placeholder}
                </Box>
              </Box>
            )}
          </Droppable>
        ))}
        {/*------------------------------*/}

      </DragDropContext>

      {showDetails === true &&
        <Dialog
          open={showDetails}
          onClose={() => setShowDetails(!showDetails)}>
          <DialogTitle>{doggo.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>{doggo.notes}</DialogContentText>
          </DialogContent>
        </Dialog>}
    </Grid>
  );
}

export default LoadBalancing;