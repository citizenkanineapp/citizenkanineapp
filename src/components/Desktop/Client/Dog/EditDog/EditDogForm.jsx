import { useSelector, useDispatch } from "react-redux";
//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, Switch, IconButton } from "@mui/material";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";

function DogDetails(){
  const dispatch = useDispatch();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton width="5%"  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'DogDetails'})}>
              <ArrowBackIcon sx={{ fontSize: "2rem", fontWeight: "800"}}/>
            </IconButton>
          </Box>

          {/*-------------------- DETAILS --------------------*/}
          <Box sx={{ display: "flex", flexDirection: "row", height: "100%", width: "100%", justifyContent: "center", alignItems: "center", gap: 5 }}>
            <Card sx={{ width: "40%", height: "50%" }}>  {/*need to figure out aspect ratio and conditional rendering to change into image upload for editing image*/}
            <img src="https://images.ctfassets.net/sfnkq8lmu5d7/2jiEB2xKaHaQh5DLuT3lMI/204094de400b9dc16f0a8b20bc81ef68/The-Wildest_Editorial_Canine_Vertigo_is_Treatable_but_Scary_to_Witness_Hero.jpg?w=700&h=525&fl=progressive&q=80&fm=jpg"/>
            </Card>

            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "60%", gap: 3}}>
              <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", gap: 1 }}>
                <TextField value="Maggie" sx={{ pl: "10" }}></TextField>
                <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", alignItems: "center", gap: 1 }}>

                    {/* will need functionality to display correct status*/}
                    <Switch defaultChecked/>                
                    <FlagCircleIcon style={{ fontSize: 36, color: '#e0603f' }}/>    {/* could do conditional rendering for color here */}

                </Box>
              </Box> 
              <TextField value=
                "She needs some time to warm up to new friends."
                helperText="Notes" size="large" fullWidth multiline rows={4}/> {/* needs onChange/functionality */}
            </Box>
          </Box>

        {/*-------------------- BUTTONS --------------------*/}
            <Box display="flex" justifyContent="space-between">
              <Box width="25%" display="flex" justifyContent="space-between">
                <Button variant="outlined" color="info"
                    onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'DogDetails'})}>Cancel</Button> 
                <Button variant="contained"
                    onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'DogDetails'})}>Delete</Button> 
              </Box>
              <Button variant="contained" color="secondary"
                  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Save</Button> {/*PUT ROUTE*/}
            </Box>

        </Box>
      );
}

export default DogDetails;
