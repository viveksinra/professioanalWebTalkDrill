'use client';

import { useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { canJoinProfessionalSession, getJoinButtonText } from 'src/utils/sessionUtils';

export default function SessionLobby({ startTime, booking, onJoin }) {
  const [now, setNow] = useState(Date.now());
  const startBooking = useMemo(() => booking || { scheduledDateTimeUTC: startTime, duration: 60 }, [booking, startTime]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const canJoin = canJoinProfessionalSession(startBooking);
  const buttonText = getJoinButtonText(startBooking);

  return (
    <Stack spacing={2} alignItems="flex-start">
      <Typography variant="subtitle1">Session Lobby</Typography>
      <Typography variant="body2">Start time: {new Date(startBooking.scheduledDateTimeUTC).toLocaleString()}</Typography>
      <Button variant="contained" disabled={!canJoin} onClick={onJoin}>{buttonText}</Button>
    </Stack>
  );
}


