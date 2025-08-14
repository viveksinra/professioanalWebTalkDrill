'use client';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function WeekNavigation({ onPrev, onNext }) {
  return (
    <div>
      <IconButton onClick={onPrev} aria-label="previous week"><ChevronLeftIcon /></IconButton>
      <IconButton onClick={onNext} aria-label="next week"><ChevronRightIcon /></IconButton>
    </div>
  );
}


