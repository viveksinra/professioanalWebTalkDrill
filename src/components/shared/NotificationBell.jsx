'use client';

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from 'next/navigation';

import { useNotification } from 'src/contexts/notification/NotificationProvider';

export default function NotificationBell() {
  const router = useRouter();
  const { unread } = useNotification();
  return (
    <IconButton color="inherit" onClick={() => router.push('/notifications')} aria-label="notifications">
      <Badge badgeContent={unread} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}


