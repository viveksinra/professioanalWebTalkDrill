'use client';

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

export default function Legend() {
  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ mr: 1 }}>Legend:</Typography>
      <Chip size="small" label="Upcoming" color="primary" variant="outlined" />
      <Chip size="small" label="Completed" color="success" variant="outlined" />
      <Chip size="small" label="Cancelled" color="error" variant="outlined" />
      <Chip size="small" label="Pending" color="warning" variant="outlined" />
    </Stack>
  );
}


