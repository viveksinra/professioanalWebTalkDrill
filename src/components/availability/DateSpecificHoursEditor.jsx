'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function DateSpecificHoursEditor({ value = [], onChange }) {
  const [overrides, setOverrides] = useState(value);

  const addOverride = () => {
    const next = [...overrides, { date: '', start: '', end: '' }];
    setOverrides(next);
    onChange?.(next);
  };

  const change = (idx, key, val) => {
    const next = overrides.map((o, i) => (i === idx ? { ...o, [key]: val } : o));
    setOverrides(next);
    onChange?.(next);
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h6">Date-specific overrides</Typography>
      {overrides.map((o, i) => (
        <Stack key={i} direction="row" spacing={1} alignItems="center">
          <TextField type="date" size="small" value={o.date} onChange={(e) => change(i, 'date', e.target.value)} />
          <TextField type="time" size="small" value={o.start} onChange={(e) => change(i, 'start', e.target.value)} />
          <TextField type="time" size="small" value={o.end} onChange={(e) => change(i, 'end', e.target.value)} />
        </Stack>
      ))}
      <Button variant="outlined" onClick={addOverride}>Add date override</Button>
    </Stack>
  );
}


