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
    const adminNotes = useSelector(store => store.adminNotesReducer).filter(note=> note.note_type==='topack');

    const [note, setNote] = useState('');

    const timeZoneAdjust = (date) => {
      return dayjs(date.split('T')[0]).format('MM/DD');
    }

    //sends notes to DB via button
    const submitNote = (e) => {
      e.preventDefault();
      const noteToSend = {notes: note, note_type:'frompack'};
      dispatch({
        type: 'ADD_ADMIN_NOTES', 
        payload: noteToSend
      })
      setNote('');
      dispatch({ type: 'FETCH_ADMIN_NOTES' });
    };

    return (
      <>
        <Box sx={{ height: '80vh',pb: 40}}>
          <Stack direction="column" spacing={2} alignItems="center">
            <Typography
              sx={{display: 'flex', alignItems: 'start', ml: 1, fontSize: '1.75em', fontWeight: '800', pt: 2}}
            >
              Notes to packleaders
            </Typography>
            <List sx={{ mt:1, height: '50vh', width: '80vw', overflow: 'auto', border:'solid', borderColor:'gray', borderSize:'1px'}}>
              {adminNotes.map((notes) => (
                <ListItem
                  className="notes"
                  key={notes.id}
                  sx={{px: 2.5}}
      
                  dense
                >
                  <ListItemText sx={{mr: 2, fontSize: '1rem' }}>{timeZoneAdjust(notes.date)}:      {notes.notes}</ListItemText>
                </ListItem>
              ))}
            </List>
            {/* {editStatus ? */}
            <>
              <Stack spacing={2} direction='row' alignItems='center' justifyContent='flex-end'  sx={{ pt: 2, width: '80vw'}}>                      
                <TextField
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  label='Send note to admin?'
                  fullWidth
                  multiline
                  maxRows={5}
                  InputProps={{ margin: 'dense' }}
                  />
                <Button onClick={(e) => submitNote(e) }>Submit</Button>

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