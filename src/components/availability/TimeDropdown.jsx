'use client';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const generateTimes = (intervalMinutes = 30) => {
  const times = [];
  for (let h = 0; h < 24; h += 1) {
    for (let m = 0; m < 60; m += intervalMinutes) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      times.push(`${hh}:${mm}`);
    }
  }
  return times;
};

export default function TimeDropdown({ value, onChange, interval = 30 }) {
  const times = generateTimes(interval);
  return (
    <TextField select size="small" value={value ?? ''} onChange={(e) => onChange?.(e.target.value)}>
      {times.map((t) => (
        <MenuItem key={t} value={t}>{t}</MenuItem>
      ))}
    </TextField>
  );
}


