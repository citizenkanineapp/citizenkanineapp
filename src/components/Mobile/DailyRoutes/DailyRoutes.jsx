import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//MUI
import { Box, Typography, Paper, Chip, Grid, Card, CardContent, Button, CardHeader } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const removeFromList = (list, index) => {  
//   const result = Array.from(list);  
//   const [removed] = result.splice(index, 1);  
//   return [removed, result]  
// }  

// const addToList = (list, index, element) => {  
//   const result = Array.from(list);  
//   result.splice(index, 0, element);  
//   return result  
// }

function DailyRoutes(){
  const dispatch = useDispatch();

    //dummy data
    const dawgs = [
      {id: 1, name: 'Fido', route: 'tangletown', flagged: false},
      {id: 2, name: 'Fiona', route: 'tangletown', flagged: true},
      {id: 3, name: 'Ferris', route: 'emerson', flagged: false},
      {id: 4, name: 'Frenchie', route: 'emerson', flagged: false},
      {id: 5, name: 'Fowler', route: 'emerson', flagged: true},
      {id: 6, name: 'Froggy', route: 'far', flagged: false},
      {id: 7, name: 'Frodo', route: 'far', flagged: false},
      {id: 8, name: 'Flora', route: 'far', flagged: false},
      {id: 9, name: 'Flo', route: 'far', flagged: false},
      {id: 10, name: 'Fred', route: 'misfits', flagged: true},
      {id: 11, name: 'Ferrah', route: 'misfits', flagged: false},
      {id: 12, name: 'Forrest', route: 'misfits', flagged: true},
      {id: 13, name: 'Fanny', route: 'misfits', flagged: false},
      {id: 14, name: 'Flip', route: 'unassigned', flagged: false},
      {id: 15, name: 'Fae', route: 'unassigned', flagged: false},
      {id: 16, name: 'Fork', route: 'unassigned', flagged: false},
    ];

    const dayRoutes = {
      tangletown: dawgs.filter(dog => (dog.route === 'tangletown')), 
      emerson: dawgs.filter(dog => (dog.route === 'emerson')),
      far: dawgs.filter(dog => (dog.route === 'far')),
      misfits: dawgs.filter(dog => (dog.route === 'misfits')),
      unassigned: dawgs.filter(dog => (dog.route === 'unassigned'))
    };

  useEffect(() => {
    dispatch({ type: 'SET_DAILY_ROUTES', payload: dayRoutes });
  }, []);

  const dailyRoutes = useSelector(store => store.dnd.routes);
  const routes = Object.keys(dailyRoutes);

  function onDragEnd(result) {
    console.log(result);
    if (!result.destination) return; //prevents being triggered if outside of lists

    dispatch({ type: 'MOVE_DOG', payload: result });

  }


    return (
        <Grid container sx={{ height: '90%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <DragDropContext onDragEnd={onDragEnd}>
          {routes.map((route, i) => (
            <Droppable droppableId={route} direction="horizontal" key={i}>
            {(provided) => (
              <Card {...provided.droppableProps} ref={provided.innerRef}
                sx={{ width: '90%', height: '15%', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', alignItems: 'center', bgcolor: 'lightGrey' }}>
                <CardContent sx={{display: 'flex', flexDirection: 'row', gap: 0.5}}>
                  {dailyRoutes && dailyRoutes[route].map((dog, index) => (dog.route === route && 
                   
                    <Draggable key={dog.id} draggableId={`${dog.id}`} index={index}> 
                      {(provided) => (
                      <Chip {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={dog.id} 
                          icon={dog.flagged === true ? <FlagIcon sx={{ fontSize: 'xsmall', fill: '#e0603f'}}/> : null} label={dog.name} size="small" variant="outlined"/>
                      )}
                    </Draggable>))}
                    {provided.placeholder}      
                </CardContent>
              </Card>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        <Button>Edit</Button>
        </Grid>
      );
}

export default DailyRoutes;