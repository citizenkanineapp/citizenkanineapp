//this is the file responsible for image upload
//component

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//MUI components
import { Avatar, Button, Grid } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function ImageUpload({ index }) {
    const dispatch = useDispatch();
    console.log('does index get here?', index)
    //useStates needed for image upload and image preview 
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [showButton, setShowButton] = useState(false);
    const client = useSelector(store => store.clientReducer)

    const fileInputRef = useRef();

    const handleFileInputChange = (e, index) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
        // uploadImage(reader.result, index);
        setShowButton(!showButton);
    }


    //to handle the form submitting and sending to Cloudinary

    const handleSubmitFile = (e, index) => {
        e.preventDefault();
        // console.log(index)
        if (!previewSource) return;
        uploadImage(previewSource, index);
        setShowButton(!showButton);
    }

    const uploadImage = (base64EncodedImage, index) => {
        console.log('index last step', index)
        dispatch({
            type: 'ADD_IMAGE',
            payload: { new_image_url: base64EncodedImage, index: index },
            headers: { 'Content-type': 'application/json' }
        })
    }

    return (
        <Grid container sx={{height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justfyContent: 'flex-end', gap: 2}}>
            {/* avatar onclick calls that useRef variable */}
            <Avatar
                    onClick={() => fileInputRef.current.click()}
                    alt="New Dog Avatar"
                    sx={{ width: 150, height: 150, justifySelf: 'center' }}
                >
                    {previewSource ?
                        <Avatar
                            src={previewSource || client.dogs[index][image]}
                            sx={{ width: 150, height: 150 }} />
                        :
                        <AddAPhotoIcon />
                    }
                </Avatar>
                {/* enable confirm photo button if there is an image preview, 
                        otherwise button is disabled */}

            
            <form onSubmit={(e) => handleSubmitFile(e, index)}
                className="form">
                <input type="file"
                    hidden
                    name="image"
                    onChange={(e) => handleFileInputChange(e, index)}
                    value={fileInputState}
                    ref={fileInputRef}
                    className="form-input" />

                {showButton &&
                    <Button type="submit" size="small" variant="contained" sx={{px:  11 }}>Confirm</Button>}
            
            </form>

        </Grid>
    )
}

export default ImageUpload;