"use client";

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

export default function NotificationSettingsPage() {
  const [prefs, setPrefs] = useState({ bookings: true, sessions: true, payouts: true });
  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Notification Settings</Typography>
      <Stack>
        <FormControlLabel control={<Switch checked={prefs.bookings} onChange={() => toggle('bookings')} />} label="Bookings" />
        <FormControlLabel control={<Switch checked={prefs.sessions} onChange={() => toggle('sessions')} />} label="Sessions" />
        <FormControlLabel control={<Switch checked={prefs.payouts} onChange={() => toggle('payouts')} />} label="Payouts" />
      </Stack>
    </div>
  );
}


