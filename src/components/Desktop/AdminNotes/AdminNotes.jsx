import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './AdminNotes.css'



//MUI
import { ListSubheader, Fab, Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Button, TextField, Typography, Grid, Avatar, Box } from "@mui/material";

function AdminNotes() {
    useEffect(() => {
        dispatch({ type: 'FETCH_ADMIN_NOTES' })
    }, []);



    const dispatch = useDispatch();
    const adminNotes = useSelector(store => store.adminNotesReducer)

    const [toggleNotes, setToggleNotes] = useState(false);
    const [note, setNote] = useState('');

    const toggleMode = () => {
        console.log('testing')
        setToggleNotes(!toggleNotes)
    }

    //sends notes to DB via 'Enter'
    const onEnterSubmit = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            dispatch({ type: 'ADD_ADMIN_NOTES', payload: note });
            setNote('');
            setToggleNotes(!toggleNotes);
        };
    };

    //sends notes to DB via button
    const buttonSubmit = () => {
        setToggleNotes(!toggleNotes);
        setNote('');

    };

    const deleteNote = (id) => {
        console.log(id)
        dispatch({ type: 'DELETE_ADMIN_NOTES', payload: id })
    }



    return (
        <>
            {toggleNotes ?          ////EDIT MODE////
                <Box>
                    <Grid container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent sx={{width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4, p: 1, mt: 2, ml: 2.5}}>
                                <TextField sx={{width: '85%'}}
                                    type='text' value={note} placeholder='Add a new note' helperText='Press enter to Submit' onChange={(e) => setNote(e.target.value)} onKeyDown={(e) => onEnterSubmit(e)}></TextField>
                                <Fab size="small" edge='end' color="primary" onClick={() => toggleMode()} sx={{justifySelf: 'flex-end'}}>
                                    <RemoveIcon sx={{ fill: 'white' }} />
                                </Fab>
                                </CardContent>
                                <CardContent sx={{pt: 0}}>
                                    <List>
                                        {adminNotes.map((notes) => (
                                            <ListItem className="notes" key={notes.id}
                                                secondaryAction={
                                                    <IconButton onClick={() => deleteNote(notes.id)} sx={{ ml: 10 }}>
                                                        <DeleteIcon sx={{ fontSize: 20, color: '#341341' }} />
                                                    </IconButton>
                                                }>
                                                <ListItemText>{notes.notes}</ListItemText>
                                            </ListItem>
                                        ))}

                                    </List>

                                </CardContent>

                            </Card>

                        </Grid>

                    </Grid>
                </Box>
                :               ////DISPLAY MODE////

                <Box>
                    <Grid container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12}>
                            <Card>
                                <Fab size="small" edge='end' color="primary" onClick={() => toggleMode()} sx={{ position: 'absolute', mt: 3, ml: 41 }}>
                                    <AddIcon sx={{ fill: 'white' }} />
                                </Fab>

                                <CardContent>
                                    <List>
                                        <ListSubheader>
                                            Notes:
                                        </ListSubheader>
                                        {adminNotes.map((notes) => (
                                            <ListItem className="notes" key={notes.id}
                                                secondaryAction={<IconButton onClick={() => deleteNote(notes.id)}>
                                                    <DeleteIcon />

                                                </IconButton>}
                                                sx={{ mx: 1 }}
                                            >
                                                <ListItemText>{notes.notes}</ListItemText>

                                            </ListItem>
                                        ))}
                                    </List>

                                </CardContent>

                            </Card>

                        </Grid>

                    </Grid>
                </Box>
            }
        </>
    );
}

export default AdminNotes;

//get rid of edit. 
//have plus and input
//delete from main view