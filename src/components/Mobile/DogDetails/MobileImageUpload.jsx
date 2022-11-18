//this is the file responsible for image upload
//component

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//MUI components
import { Avatar, Fab } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckIcon from '@mui/icons-material/Check';

function MobileImageUpload({ id }) {
    const dispatch = useDispatch();

    //useStates needed for image upload and image preview 
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const fileInputRef = useRef();

    const handleFileInputChange = (e, id) => {
        const file = e.target.files[0];
        previewFile(file, id);
    }
    //This is a function to allow the user to see
    //a preview before it is uploaded to the app
    const previewFile = (file, id) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
        uploadImage(reader.result, id)
    }

    //to handle the form submitting and sending to Cloudinary

    const handleSubmitFile = (e, id) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource, id);
    }

    const uploadImage = (base64EncodedImage, id) => {
        console.log('DOG ID IS:', id);
        dispatch({
            type: 'UPDATE_DOG_PHOTO',
            payload: { new_image_url: base64EncodedImage, dogID: id },
            headers: { 'Content-type': 'application/json' }
        })
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmitFile(e, id)}
                className="form">
                {/* avatar onclick calls that useRef variable */}
                <Fab color="primary" aria-label="add" size='small' sx={{ position: 'fixed', mt: 1, ml: 1 }} type='submit'>
                    <CheckIcon sx={{ fill: 'white' }} />
                </Fab>
                <Avatar
                    onClick={() => fileInputRef.current.click()}
                    alt="New Dog Avatar"
                    sx={{ width: 150, height: 150 }}
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

                {/* {previewSource ?
                    <button type="submit" size="small" variant="outlined">Confirm</button>
                    :
                    <button disabled type="submit" size="small" variant="outlined">Confirm</button>
                } */}
                <input type="file"
                    hidden
                    name="image"
                    onChange={(e) => handleFileInputChange(e, id)}
                    value={fileInputState}
                    ref={fileInputRef}
                    className="form-input" />
                {/* <button className="btn" type="submit">Submit</button> */}
            </form>

        </div>
    )
}

export default MobileImageUpload;