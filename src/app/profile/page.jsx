"use client";

import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { professionalService } from 'src/services/professionalService';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: '', username: '', timezone: '' });
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const p = await professionalService.getProfile();
        setProfile({ name: p.name || '', username: p.username || '', timezone: p.timezone || '' });
      } catch {}
      setLoading(false);
    })();
  }, []);

  const onCheckUsername = async () => {
    const res = await professionalService.verifyUsername(profile.username);
    setAvailable(Boolean(res?.available));
  };

  const onSave = async () => {
    await professionalService.updateProfile(profile);
  };

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <Stack spacing={2} sx={{ maxWidth: 480 }}>
        <Typography variant="h5">Profile</Typography>
        <TextField label="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            label="Username"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <Button variant="outlined" onClick={onCheckUsername}>Check</Button>
          <Typography color={available ? 'success.main' : 'error.main'}>{available ? 'Available' : 'Taken'}</Typography>
        </Stack>
        <TextField label="Timezone" value={profile.timezone} onChange={(e) => setProfile({ ...profile, timezone: e.target.value })} />
        <Button variant="contained" onClick={onSave}>Save</Button>
      </Stack>
    </div>
  );
}


