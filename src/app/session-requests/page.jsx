import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function SessionRequestsPage() {
  const requests = [];
  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Session Requests</Typography>
      <List>
        {requests.map((r) => (
          <ListItem key={r.id} secondaryAction={
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="contained">Approve</Button>
              <Button size="small" color="error" variant="outlined">Decline</Button>
            </Stack>
          }>
            <ListItemText primary={r.title} secondary={r.date} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}


