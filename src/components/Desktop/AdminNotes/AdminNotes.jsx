import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import './AdminNotes.css'


//MUI
import { Button, TextField, Typography, Grid, Avatar, Box } from "@mui/material";

function AdminNotes(){
    useEffect(() => {
        dispatch({ type: 'FETCH_NOTES' })
      }, []);
    
    
    
    const dispatch = useDispatch();
    const adminNotes = useSelector(store => store.adminNotesReducer)

    const [toggleNotes, setToggleNotes] = useState(false);
    const [note, setNote] = useState('');

    const toggleMode = () => {
       console.log('testing')
        // if (plot.notes){
        //     setNote();
        // }
        setToggleNotes(!toggleNotes)
    }

    //sends notes to DB via 'Enter'
    const onEnterSubmit = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          dispatch({ type: 'ADD_NOTES', payload: {notes: note} });
          setNote('');
          setToggleNotes(!toggleNotes);
        };
        // console.log(note)
      };
    
    //sends notes to DB via button
    const buttonSubmit = () => {
        dispatch({ type: 'ADD_NOTES', payload: {notes: note}});
        setToggleNotes(!toggleNotes);
        setNote();
       
    };



  return (
        <>  
        {toggleNotes ?          ////EDIT MODE////
        <Box>
            <Grid container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className="notes_container" sx={{ m: 2, mx: 4, p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'20%', gap: 2 }}> 
                    <div className="notes_header">
                            <h4 className="notes_text">Notes:</h4>
                                {/* <button className="widget_button" onClick={() =>  buttonSubmit()}>⨉</button> */}
                               <IconButton onClick={() =>  buttonSubmit()}>
                                    <CheckBoxOutlinedIcon/>
                                </IconButton>
                    </div>
                    <div className="edit_notes">
                        <textarea type="text" 
                            className="notes_input"
                            value={note} 
                            onChange={(e) => setNote(e.target.value)}
                            onKeyDown={(e) => onEnterSubmit(e)}/>
                    </div>
                </div>
            </Grid>
        </Box>
                :               ////DISPLAY MODE////
                
        <Box>
            <Grid container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className="notes_container" sx={{ m: 2, mx: 4, p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'20%', gap: 2 }}>
                    <div className="notes_header">
                            <h4 className="notes_text"> Notes:</h4>
                                <button className="widget_button" >
                                    {/* edit above */}
                                    <EditIcon fontSize="small" onClick={() => toggleMode()}/>
                                </button>
                    </div>
                    <div className="notes_body">
                       {adminNotes.notes ? 
                        <p className="notes">{adminNotes.notes || ''}</p>
                        : null}
                    </div>
                </div>
            </Grid>
        </Box>
        }
    </>
    );
}

export default AdminNotes;