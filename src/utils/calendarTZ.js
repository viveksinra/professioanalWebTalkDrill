export function convertUTCToTimezone(date, timezone = 'UTC') {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (Number.isNaN(d?.getTime?.())) return new Date();
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(d).reduce((acc, p) => ({ ...acc, [p.type]: p.value }), {});
    return new Date(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`);
  } catch {
    return new Date(date);
  }
}

export function convertEventsToTimezone(events = [], timezone = 'UTC') {
  return events.map((e) => ({
    ...e,
    start: convertUTCToTimezone(e.start, timezone),
    end: convertUTCToTimezone(e.end, timezone),
  }));
}


