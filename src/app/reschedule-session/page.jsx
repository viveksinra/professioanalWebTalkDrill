import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RescheduleSessionPage() {
  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Reschedule Session</Typography>
      <Stack direction="row" spacing={1}>
        <TextField type="date" size="small" />
        <TextField type="time" size="small" />
        <Button variant="contained">Confirm</Button>
      </Stack>
    </div>
  );
}


