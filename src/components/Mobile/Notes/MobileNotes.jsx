import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import dayjs from 'dayjs'

//MUI
import { List, ListItem, ListItemText,  Button, Stack, TextField, Typography, Box } from "@mui/material";

function MobileNotes() {
    useEffect(() => {
        dispatch({ type: 'FETCH_ADMIN_NOTES' })
        user ? dispatch({ type: 'SET_NOTIFICATION_STATUS', payload: user.id }) : null ;
    }, []);

    const dispatch = useDispatch();
    const adminNotes = useSelector(store => store.adminNotesReducer).filter(note=> note.note_type==='topack');
    const user = useSelector(store => store.user);
    const [note, setNote] = useState('');

    const timeZoneAdjust = (date) => {
      return dayjs(date.split('T')[0]).format('MM/DD');
    }

    //sends notes to DB via button
    const submitNote = (e, notetype) => {
      e.preventDefault();
      const noteToSend = {notes: note, note_type:notetype};
      let type;
      if (notetype === 'topack') {
        type = 'SEND_NOTE_TO_PACK_MOBILE';
      } else if (notetype === 'frompack') {
        type = 'ADD_ADMIN_NOTES';
      }
      dispatch({
        type: type, 
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
            <>
              <Stack spacing={2} direction='row' alignItems='center' justifyContent='flex-end'  sx={{ pt: 2, width: '80vw'}}>                      
                <TextField
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  label='Send note?'
                  fullWidth
                  multiline
                  maxRows={5}
                  InputProps={{ margin: 'dense' }}
                  />
                { user.admin ? 
                <Stack direction='column' alignItems='center' justifyContent='center'  sx={{width: '20vw'}}>                      
                  <Button onClick={(e) => submitNote(e,'topack') }>Pack</Button>
                  <Button onClick={(e) => submitNote(e,'frompack') }>Admin</Button>
                </Stack> :
                  <Button onClick={(e) => submitNote(e,'frompack') }>Submit</Button>
                }
              </ Stack>
            </>
          </Stack>
        </Box>
          {/* } */}
      </>
    );
}

export default MobileNotes;
