import { useSelector, useDispatch } from "react-redux";
//MUI
import { Box } from "@mui/system";
import { Button, TextField, Grid, Typography, Card, Switch, IconButton, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";

function AddDogFromEdit(){
  const dispatch = useDispatch();
  const dog = useSelector(store => store.dogReducer)
  const client = useSelector(store => store.clientReducer)
  const index = 0;

  const saveDog = event => {

    dispatch({type: 'ADD_ONE_DOG', payload: dog})
    dispatch({type: 'ADD_NEW_DOG', payload: client})
    //add screen change
  }

//this form is only for adding dogs from the edit client path
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>

          <Box display="flex" justifyContent="flex-end">
            <IconButton width="5%"  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>
              <ArrowBackIcon sx={{ fontSize: "2rem", fontWeight: "800"}}/>
            </IconButton>
          </Box>

          {/*-------------------- DETAILS --------------------*/}
          <Box sx={{ display: "flex", flexDirection: "row", height: "100%", width: "100%", justifyContent: "center", alignItems: "center", gap: 5 }}>
          <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1}}>


<Card sx={{width: '100%', m: 1, mt:0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
      <ImageUpload index ={index}  />
  </Card>

</Grid>

              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "60%", gap: 3}}>
                <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", gap: 1 }}>
                  <Typography variant="h3" sx={{ pl: "10" }}>New Dog</Typography>
                  <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", alignItems: "center", gap: 1 }}>

                      {/* will need functionality to display correct status*/}
                      <Switch disabled defaultChecked/>             
                      <FlagCircleIcon style={{ fontSize: 36, color: '#e0603f' }}/>   {/* could do conditional rendering for color here */}

                  </Box>
                </Box> 
                <TextField 
                    value={dog.dog_name}
                    onChange={(e) => {
                      dispatch({
                        type: 'ADD_DOG_NAME', 
                        payload: { 
                        dog_name: e.target.value,
                        index: index
                        }
                      })
                    }}
                    helperText="Name" size="large" fullWidth />
                <TextField 
                    value={dog.dog_notes}
                    onChange={(e) => {
                      dispatch({
                        type: 'ADD_DOG_NOTES',
                        payload: {
                          dog_notes: e.target.value,
                          index: index
                        }
                      })
                    }}
                  helperText="Notes" size="large" fullWidth  multiline rows={3}/>
              </Box> 
          </Box>


            {/*-------------------- BUTTONS --------------------*/}
            <Box display="flex" justifyContent="space-between">
              <Button variant="outlined" color="info"
                  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Back</Button> 
              <Button variant="contained" color="success"
                  onClick={saveDog}>Save</Button> 
            </Box>

        </Box>
      );
}

export default AddDogFromEdit;

// to do:
// clear dog reducer on submit
//toggle as part of post route