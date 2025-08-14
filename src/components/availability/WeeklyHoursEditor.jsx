'use client';

import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WeeklyHoursEditor({ value = {}, onChange }) {
  const [hours, setHours] = useState(value);
  const handleChange = (day, key, val) => {
    const next = { ...hours, [day]: { ...hours[day], [key]: val } };
    setHours(next);
    onChange?.(next);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Weekly Working Hours</Typography>
      <Grid container spacing={1}>
        {days.map((d) => (
          <Grid key={d} size={{ xs: 12, sm: 6, md: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ width: 40 }}>{d}</Typography>
              <TextField type="time" size="small" onChange={(e) => handleChange(d, 'start', e.target.value)} />
              <TextField type="time" size="small" onChange={(e) => handleChange(d, 'end', e.target.value)} />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}


