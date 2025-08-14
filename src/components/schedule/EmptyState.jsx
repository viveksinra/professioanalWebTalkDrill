'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function EmptyState({ message = 'No sessions scheduled.' }) {
  return (
    <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
}


