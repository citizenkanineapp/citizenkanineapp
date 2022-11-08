import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, IconButton } from "@mui/material";

import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";

function DogDetails(){
  const dispatch = useDispatch();

  const dogUrl = useSelector(store => store.dogPhotoReducer);

  let [dogName, setDogName] = useState('');
  let [dogImage, setDogImage] = useState('');
 

    return (
        <div className="container">
          <h1>Add Dog</h1>
          <ImageUpload />
            <TextField 
                value={dogName} 
                onChange={(event) => setDogName(event.target.value)}
                helperText="Dog Name"  
                size="small" /> 
          <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddClient'})}>Cancel</Button> 
          <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Save</Button> {/*PUT ROUTE*/}
        </div>
      );
}

export default DogDetails;