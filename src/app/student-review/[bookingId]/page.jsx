"use client";

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { studentReviewService } from 'src/services/studentReviewService';

export default function StudentReviewPage({ params }) {
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await studentReviewService.submitReview(params.bookingId, { rating, comments });
      // no-op
    } catch (err) {
      // no-op
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Student Review for booking {params.bookingId}</Typography>
      <form onSubmit={onSubmit}>
        <Stack spacing={2} sx={{ maxWidth: 480 }}>
          <TextField label="Rating (1-5)" value={rating} onChange={(e) => setRating(e.target.value)} size="small" />
          <TextField label="Comments" multiline minRows={3} value={comments} onChange={(e) => setComments(e.target.value)} size="small" />
          <Button type="submit" variant="contained" disabled={submitting}>Submit</Button>
        </Stack>
      </form>
    </div>
  );
}


