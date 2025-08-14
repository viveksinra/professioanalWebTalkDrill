// Time utilities ported for web

export function canJoinProfessionalSession(booking, professionalTimezone = 'UTC') {
  if (!booking) return false;
  if (booking.status === 'cancelled_by_student' || booking.status === 'cancelled_by_professional') return false;

  try {
    const start = new Date(booking.scheduledDateTimeUTC);
    const end = new Date(booking.endDateTimeUTC ?? start.getTime() + booking.duration * 60 * 1000);
    const joinWindowStart = new Date(start.getTime() - 5 * 60 * 1000);
    const now = Date.now();
    return now >= joinWindowStart.getTime() && now <= end.getTime();
  } catch {
    return false;
  }
}

export function shouldStartSessionImmediately(booking, professionalTimezone = 'UTC') {
  if (!booking) return false;
  try {
    const start = new Date(booking.scheduledDateTimeUTC);
    return Date.now() >= start.getTime();
  } catch {
    return false;
  }
}

export function getJoinButtonText(booking, professionalTimezone = 'UTC') {
  if (!booking || !booking.scheduledDateTimeUTC) return 'Session Ended';
  if (booking.status === 'cancelled_by_student' || booking.status === 'cancelled_by_professional') return 'Session Ended';

  const start = new Date(booking.scheduledDateTimeUTC);
  const end = new Date(booking.endDateTimeUTC ?? start.getTime() + booking.duration * 60 * 1000);
  const now = new Date();
  if (now > end) return 'Session Ended';
  if (now >= start) return 'Join Session';

  const diffMin = Math.ceil((start.getTime() - now.getTime()) / 60000);
  if (diffMin >= 24 * 60) {
    const days = Math.floor(diffMin / (24 * 60));
    const rem = diffMin % (24 * 60);
    const hours = Math.floor(rem / 60);
    const minutes = rem % 60;
    if (hours > 0 && minutes > 0) return `Available in ${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `Available in ${days}d ${hours}h`;
    return `Available in ${days}d`;
  }
  if (diffMin >= 60) {
    const hours = Math.floor(diffMin / 60);
    const minutes = diffMin % 60;
    if (minutes > 0) return `Available in ${hours}h ${minutes}m`;
    return `Available in ${hours}h`;
  }
  return `Available in ${diffMin}m`;
}


