'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SessionCard({ session, onDetails, onJoin }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1">{session?.title || 'Session'}</Typography>
        <Typography variant="body2" color="text.secondary">
          {session?.start} - {session?.end}
        </Typography>
        <Typography variant="body2">Student: {session?.studentName || '-'}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onDetails?.(session)}>Details</Button>
        <Button size="small" variant="contained" onClick={() => onJoin?.(session)}>Join</Button>
      </CardActions>
    </Card>
  );
}


