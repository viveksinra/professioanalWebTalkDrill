'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ScheduleHeader({ currentWeekLabel = '', onPrev, onNext, onToday }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
      <Typography variant="h6">Schedule</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="outlined" onClick={onPrev}>Prev</Button>
        <Button variant="outlined" onClick={onToday}>Today</Button>
        <Button variant="outlined" onClick={onNext}>Next</Button>
      </Stack>
      <Typography variant="subtitle1">{currentWeekLabel}</Typography>
    </Stack>
  );
}


