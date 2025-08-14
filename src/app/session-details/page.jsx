import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function SessionDetailsPage() {
  return (
    <div style={{ padding: 24 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Session Details</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" href="/reschedule-session">Reschedule</Button>
          <Button variant="outlined" href="/professional-session-call">Go to call</Button>
        </Stack>
      </Stack>
    </div>
  );
}


