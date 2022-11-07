//this is the file responsible for image upload
//component

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

//MUI components
import Avatar from '@mui/material/Avatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function ImageUpload () {
    const dispatch = useDispatch();
    
    //useStates needed for image upload and image preview 
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const fileInputRef = useRef();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }
    //This is a function to allow the user to see
    //a preview before it is uploaded to the app
    const previewFile = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setPreviewSource(reader.result);
        }
    }

    //to handle the form submitting and sending to Cloudinary

    const handleSubmitFile = (e) => {
        e.preventDefault();
       if(!previewSource) return;
       uploadImage(previewSource);
    }
     
    const uploadImage = (base64EncodedImage) => {
        dispatch ({
            type: 'ADD_IMAGE',
            payload:{new_image_url:base64EncodedImage},
            headers:{'Content-type': 'application/json'}
        })
    }

    return(
        <div>
                <form onSubmit={handleSubmitFile}
                    className="form">
                    {/* avatar onclick calls that useRef variable */}
                    <Avatar
                        onClick={()=>fileInputRef.current.click()}
                        alt="New Dog Avatar"
                        sx={{ width: 150, height: 150 }}
                    >
                    { previewSource ?
                                <Avatar 
                                    src={previewSource}
                                    sx={{ width: 150, height: 150 }} />
                            :
                                <AddAPhotoIcon />
                     }  
                            </Avatar>
                    {/* enable confirm photo button if there is an image preview, 
                        otherwise button is disabled */}

                        { previewSource ?
                        <button type="submit" size="small" variant="outlined">Confirm</button>
                        :
                        <button disabled type="submit" size="small" variant="outlined">Confirm</button>
                        }
                    <input type="file" 
                        hidden
                        name="image" 
                        onChange={handleFileInputChange} 
                        value={fileInputState}
                        ref={fileInputRef}
                        className="form-input"/>
                    {/* <button className="btn" type="submit">Submit</button> */}
                </form>
               
        </div>
    )
}

export default ImageUpload;