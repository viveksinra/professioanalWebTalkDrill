'use client';

import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { getDeviceTimezone } from 'src/utils/timezones';

export default function TimezoneSelector({ value, onChange, options = [] }) {
  const [tz, setTz] = useState(value || '');

  useEffect(() => {
    if (!value) {
      setTz(getDeviceTimezone());
    }
  }, [value]);

  const handleChange = (e) => {
    setTz(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Timezone</Typography>
      <TextField select value={tz} onChange={handleChange} size="small">
        {[tz, ...options].filter(Boolean).filter((v, i, arr) => arr.indexOf(v) === i).map((z) => (
          <MenuItem key={z} value={z}>{z}</MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}


