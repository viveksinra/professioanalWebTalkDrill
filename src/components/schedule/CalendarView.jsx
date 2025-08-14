'use client';

import { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format } from 'date-fns';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function CalendarView({ events = [], onSelectEvent, timezone = 'UTC' }) {
  const locales = {};
  const localizer = useMemo(
    () =>
      dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      }),
    []
  );

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        style={{ height: '100%' }}
      />
    </div>
  );
}


