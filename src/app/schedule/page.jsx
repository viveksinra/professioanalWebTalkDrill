import ScheduleHeader from 'src/components/schedule/ScheduleHeader';
import Legend from 'src/components/schedule/Legend';
import EmptyState from 'src/components/schedule/EmptyState';
import CalendarView from 'src/components/schedule/CalendarView';
import { convertEventsToTimezone } from 'src/utils/calendarTZ';

export default function SchedulePage() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const events = convertEventsToTimezone([], tz);
  return (
    <div style={{ padding: 24 }}>
      <ScheduleHeader currentWeekLabel="This Week" onPrev={() => {}} onNext={() => {}} onToday={() => {}} />
      <Legend />
      {events.length === 0 ? <EmptyState /> : <CalendarView events={events} onSelectEvent={() => {}} timezone={tz} />}
    </div>
  );
}


