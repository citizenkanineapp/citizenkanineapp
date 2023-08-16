import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import '../../Desktop/AdminNotes/AdminNotes.css'
import dayjs from 'dayjs'



//MUI
import { ListItemButton, Fab, Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Button, Stack, TextField, Typography, Grid, Avatar, Box } from "@mui/material";

function MobileNotes() {
    useEffect(() => {
        dispatch({ type: 'FETCH_ADMIN_NOTES' })
    }, []);

    const dispatch = useDispatch();
    const adminNotes = useSelector(store => store.adminNotesReducer)

    const [toggleNotes, setToggleNotes] = useState(false);
    const [note, setNote] = useState('');

    const toggleMode = () => {
       //console.log('testing')
        setToggleNotes(!toggleNotes)
    }

    //sends notes to DB via 'Enter'
    const onEnterSubmit = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            console.log('note is:', note)
            const noteObject = {notes: note, note_type: 'admin'}
            dispatch({ type: 'ADD_ADMIN_NOTES', payload: noteObject });
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
        // console.log(id)
        dispatch({ type: 'DELETE_ADMIN_NOTES', payload: id })
    }

    const sendNoteToPackLeaders = (id) => {
        dispatch({
            type: 'SEND_NOTE_TO_PACK', 
            payload: id
        })
    }

    const noteType = (type) => {
        if (type === 'admin') {
            return '#fbfaf8';
        } else if (type === 'topack') {
            return '#a3ddd9';
        } else if (type === 'frompack') {
            return '#87b8df'
        } else {
            return '#4A5061'
        }
    }

    return (
        <>
            {/* {toggleNotes ?          ////EDIT MODE////
                <Box>
                    <Grid container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent sx={{width: '27vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 4, p: 1, pr: 3, mt: 1.5, ml: 3}}>
                                <TextField sx={{width: '85%'}}
                                    type='text' value={note} placeholder='Add a new note' helperText='Press enter to Submit' onChange={(e) => setNote(e.target.value)} onKeyDown={(e) => onEnterSubmit(e)}></TextField>
                                <Fab size="small" edge='end' color="primary" onClick={() => toggleMode()} sx={{justifySelf: 'flex-end'}}>
                                    <RemoveIcon sx={{ fill: 'white' }} />
                                </Fab>
                                </CardContent>
                                <CardContent sx={{pt: 0}}>
                                    <List sx={{height: '30vh', width: '100%', overflow: 'auto'}}>
                                        {adminNotes.map((notes) => (
                                            <ListItem
                                                className="notes"
                                                key={notes.id}
                                                secondaryAction={
                                                    <IconButton onClick={() => deleteNote(notes.id)} sx={{ ml: 10 }}>
                                                        <DeleteIcon sx={{ fontSize: 20, color: '#341341'}} />
                                                    </IconButton>                                             
                                                }
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
                :               ////DISPLAY MODE//// */}
                <Box sx={{ height: '80vh'}}>
                  <Stack direction="column" spacing={2} alignItems="center">
                    <Typography
                      sx={{display: 'flex', alignItems: 'start', ml: 2.5, fontSize: '2rem', fontWeight: '800', pt: 2}}
                    >
                      Notes:
                    </Typography>
                    <List sx={{ mt:1, height: '50vh', overflow: 'auto', border:'solid', borderColor:'gray', borderSize:'1px'}}>
                      {adminNotes.map((notes) => (
                        <ListItem
                          className="notes"
                          key={notes.id}
                          sx={{
                              px: 2,
                              backgroundColor: () => noteType(notes.note_type),
                          }}
                          secondaryAction={
                              <IconButton onClick={() => deleteNote(notes.id)} edge="end">
                                  <DeleteIcon sx={{ fontSize: 20, color: '#341341' }}/>
                              </IconButton>}
                          dense
                        >
                          {/* conditional rendering. send icon only appears if notes are created by admin (note_type: admin)
                          or sent to admin by a single packleader (note_type:) */}
                          { notes.note_type === 'admin' ?
                            <IconButton onClick={() => sendNoteToPackLeaders(notes.id)} edge="start" >
                                <SendIcon sx={{ fontSize: 20, color: '#341341' }} />
                            </IconButton>
                          :
                            <IconButton edge="start" disabled >
                              <SendIcon sx={{
                                fontSize: 20,
                                color: () => noteType(notes.note_type)
                                }}
                              />
                            </IconButton>
                          }
                          <ListItemText sx={{mr: 2, fontSize: '1rem' }}>{dayjs(notes.date).format('MM/DD')}:      {notes.notes}</ListItemText>
                        </ListItem>
                      ))}
                    </List>
                    {/* {editStatus ? */}
                    <>
                      <Stack spacing={2} direction='row' alignItems='center' justifyContent='flex-end'  sx={{ pt: 2, width: '90%'}}>                      
                        <TextField
                          value={ ''}
                          onChange={(event) => dispatch({ type: 'EDIT_DOG_NOTE', payload: event.target.value })}
                          label='Dog Notes'
                          fullWidth
                          multiline
                          Rows={5}
                          InputProps={{ margin: 'dense' }}
                          helperText="click to edit notes"
                          />
                        <Button onClick={(event) => buttonSubmit() }>Submit</Button>

                        {/* :
                        <TextField
                        value={''}
                        label='Dog Notes'
                        fullWidth
                        multiline
                        Rows={5}
                        helperText="click to edit notes"
                        InputProps={{ readOnly: true }}
                        sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
                        // onClick={(event) => setEditStatus(true)}
                        />
                      } */}
                    </Stack>
                  </>
                </Stack>
                </Box>
            {/* } */}
        </>
    );
}

export default MobileNotes;

//get rid of edit. 
//have plus and input
//delete from main view