"use client";

import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { useNotification } from 'src/contexts/notification/NotificationProvider';

export default function NotificationsPage() {
  const { items, unread, refresh, markAllRead, markRead, remove } = useNotification();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div style={{ padding: 24 }}>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">Notifications ({unread} unread)</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={refresh}>Refresh</Button>
          <Button variant="outlined" onClick={markAllRead}>Mark all read</Button>
        </Stack>
      </Stack>

      <List>
        {items?.map((n) => (
          <ListItem key={n.id} secondaryAction={
            <Stack direction="row" spacing={1}>
              {!n.read && <Button size="small" onClick={() => markRead(n.id)}>Read</Button>}
              <Button size="small" color="error" onClick={() => remove(n.id)}>Delete</Button>
            </Stack>
          }>
            <ListItemText primary={n.subject || n.title || 'Notification'} secondary={n.date || ''} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}


