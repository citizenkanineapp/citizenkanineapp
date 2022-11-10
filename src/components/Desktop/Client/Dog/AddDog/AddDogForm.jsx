import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Button, TextField, Typography, Card, CardActions, Box, CardContent, CardMedia, Grid, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";

function AddDogForm (){
  const dispatch = useDispatch();

  const dogUrl = useSelector(store => store.dogPhotoReducer);
  const client = useSelector(store => store.clientReducer)
  const dogs = useSelector(store => store.dogReducer)
  const clientSchedule = useSelector(store => store.clientScheduleReducer)


 

  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [schedule, setSchedule] = useState({
    monday: clientSchedule.monday,
    tuesday: clientSchedule.tuesday,
    wednesday: clientSchedule.wednesday,
    thursday: clientSchedule.thursday,
    friday: clientSchedule.friday,
});


  // this should gather info on what days are clicked to adjust the weekly schedule...
  // currently only works for one day
  const handleClick = (event) => {
    // toggle
    switch (event){
      case "Monday":
        setMonday(current => !current);
        dispatch({type: 'SET_MONDAY', payload: !monday})
        break;
      case "Tuesday":
        setTuesday(current => !current);
        dispatch({type: 'SET_TUESDAY', payload: !tuesday})
        break;
      case "Wednesday":
        setWednesday(current => !current);
        dispatch({type: 'SET_WEDNESDAY', payload: !wednesday})
        break;
      case "Thursday":
        setThursday(current => !current);
        dispatch({type: 'SET_THURSDAY', payload: !thursday})
        break;
      case "Friday":
        setFriday(current => !current);
        dispatch({type: 'SET_FRIDAY', payload: !friday})
        break;
    } 
   
    // console.log(event)
   
  };

  const back = event => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddClient'});
    dispatch({type: 'CLEAR_DOGS'});
  }

  const saveDogs = (view) => {
    console.log(dogs);
    dispatch({type: 'ADD_DOGS', payload: dogs})
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view})

  }
  
 const saveSchedule = (view) => {
    // console.log(schedule);
    console.log(clientSchedule)
    dispatch({type: 'ADD_SCHEDULE', payload: clientSchedule})
    dispatch({type: 'ADD_DOGS', payload: dogs})
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view})
    // dispatch({type: 'CLEAR_SCHEDULE'})
 }


    return (
      <>
        {/* <div className="container">
          <h1>Add Dog</h1>

          <ImageUpload />
            <TextField 
                value={dogs.dog_name || ''} 
                onChange={(event) => dispatch({type: 'ADD_DOG_NAME', payload: event.target.value})}
                helperText="Dog Name"  
                size="small" /> 
        </div> */}
  <h1>Add Dog</h1>
  <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1 }}>

      {dogs.map((singleDog, index)=> (
        // singleDog = {name:'', image:''}
      <Card key={index} sx={{width: '30%', m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
            <ImageUpload index={index} />
            <TextField 
                    value={singleDog.dog_name} 
                    onChange={(e) => {
                      dispatch({
                        type: 'ADD_DOG_NAME',
                        payload: {
                          dog_name: e.target.value,
                          index: index
                        }
                      })
                    }}
                    helperText="Dog Name"  
                    size="small" 
                    /> 

        </Card>
        ))}

        
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={()=> {
                dispatch({type: 'ADD_DOG_INPUT'})
              // This is adding another dog object to dog.
              // setDog([...dog, {dogName:'sam', image:''}]);
            }}/>
          </Fab>
      






        {/* Other Cards */}
        {/* <Card sx={{width: '35%', m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
            <ImageUpload />
            <TextField 
                    value={dogs.dog_name || ''} 
                    onChange={(event) => dispatch({type: 'ADD_DOG_NAME', payload: event.target.value})}
                    helperText="Dog Name"  
                    size="small" /> 
        </Card>
        <Card sx={{width: '35%', m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
            <ImageUpload />
            <TextField 
                    value={dogs.dog_name || ''} 
                    onChange={(event) => dispatch({type: 'ADD_DOG_NAME', payload: event.target.value})}
                    helperText="Dog Name"  
                    size="small" /> 
        </Card> */}
    </Grid>
      <div>
      <h2>Weekly Schedule</h2>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Monday')} >
            <CardContent sx={{ backgroundColor: monday ? '#7BCEC8' : null }}>
              Monday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2} >
          <Card raised onClick={(event) => handleClick('Tuesday')} >
            <CardContent sx={{ backgroundColor: tuesday ? '#7BCEC8' : null }}>
              Tuesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Wednesday')}>
            <CardContent sx={{ backgroundColor: wednesday? '#7BCEC8' : null }}>
              Wednesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Thursday')} >
            <CardContent sx={{ backgroundColor: thursday? '#7BCEC8' : null }}>
              Thursday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Friday')}>
            <CardContent sx={{ backgroundColor: friday? '#7BCEC8' : null }}>
              Friday
            </CardContent>
          </Card>

        </Grid>

      </Grid>
        <Box sx={{mt: 6, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={back}>Cancel</Button> 
          {/* need to make the bottom save data */}
          {/* <Button onClick={() => saveDogs('AddClient')}>Save</Button>  */}
          <Button onClick={() => saveSchedule('ConfirmClient')}>Save</Button> 
        </Box>
      </div>
      </>
        
      );
}

export default AddDogForm;




{/* <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1 }}>
<Card sx={{width: '35%', m: 1}}>
        <ImageUpload />
    </Card>

    <Card sx={{width: '35%', m: 1}}>
        <ImageUpload />
    </Card>
    <Card sx={{width: '35%', m: 1}}>
        <ImageUpload />
    </Card>

</Grid> */}



// <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1 }}>
//       {dog &&  dog.map((singleDog, index)=> (
//         // singleDog = {name:'', image:''}
//       <Card key={index} sx={{width: '35%', m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
//             <ImageUpload />
//             <TextField 
//                     value={singleDog.dogName} 
//                     onChange={(e)=> {
//                       setDog(current => current.map(obj => {
//                         console.log('current dog:',dog)
//                         if (dog.indexOf(obj)=== index ){
//                           console.log('current dog2:',dog)
//                           return {...obj, dogName: e.target.value, image: singleDog.image}
//                         }
//                         // console.log('current2:',current)
//                       }) )
//                     }}
//                     helperText="Dog Name"  
//                     size="small" 
//                     /> 
//                     {/*setEmployees(current =>
//                      current.map(obj => {
//                       if (obj.id === 2) {
//                         return {...obj, name: 'Sophia', country: 'Sweden'};
//                       } */}
//         </Card>
//         ))}
//         <Card>
//           <Fab color="primary" aria-label="add">
//             <AddIcon onClick={()=> {
//               // This is adding another dog object to dog.
//               setDog([...dog, {dogName:'sam', image:''}]);
//             }}/>
//           </Fab>
//         </Card>





// was 103--161
//         {/* Other Cards */}
//         {/* <Card sx={{width: '35%', m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
//             <ImageUpload />
//             <TextField 
//                     value={dogs.dog_name || ''} 
//                     onChange={(event) => dispatch({type: 'ADD_DOG_NAME', payload: event.target.value})}
//                     helperText="Dog Name"  
//                     size="small" /> 
//         </Card>
//         <Card sx={{width: '35%', m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
//             <ImageUpload />
//             <TextField 
//                     value={dogs.dog_name || ''} 
//                     onChange={(event) => dispatch({type: 'ADD_DOG_NAME', payload: event.target.value})}
//                     helperText="Dog Name"  
//                     size="small" /> 
//         </Card> */}
//     </Grid>