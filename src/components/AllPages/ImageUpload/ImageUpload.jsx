//this is the file responsible for image upload
//component

import { useState } from 'react';
import { useDispatch } from 'react-redux';

function ImageUpload () {
    const dispatch = useDispatch();
    
    //useStates needed for image upload and image preview 
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');

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
            <h1>Image Upload</h1>
            <form onSubmit={handleSubmitFile}
                className="form">
                <input type="file" 
                    name="image" 
                    onChange={handleFileInputChange} 
                    value={fileInputState}
                    className="form-input"/>
                <button className="btn" type="submit">Submit</button>
            </form>
                {previewSource && (
                    <img src={previewSource} alt="preview of selected image"
                    style={{height: '300px'}}/>
                )}
        </div>
    )
}

export default ImageUpload;