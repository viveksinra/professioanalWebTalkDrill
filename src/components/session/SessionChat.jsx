'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function SessionChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input) return;
    setMessages((m) => [...m, { id: Date.now(), text: input }]);
    setInput('');
  };

  return (
    <Stack spacing={1} sx={{ width: 320 }}>
      <List dense>
        {messages.map((m) => (
          <ListItem key={m.id}><ListItemText primary={m.text} /></ListItem>
        ))}
      </List>
      <Stack direction="row" spacing={1}>
        <TextField size="small" fullWidth value={input} onChange={(e) => setInput(e.target.value)} />
        <Button variant="contained" onClick={send}>Send</Button>
      </Stack>
    </Stack>
  );
}


