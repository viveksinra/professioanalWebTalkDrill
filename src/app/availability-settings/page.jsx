import WeeklyHoursEditor from 'src/components/availability/WeeklyHoursEditor';
import TimezoneSelector from 'src/components/availability/TimezoneSelector';

export default function AvailabilitySettingsPage() {
  return (
    <div style={{ padding: 24 }}>
      <TimezoneSelector />
      <div style={{ height: 12 }} />
      <WeeklyHoursEditor />
    </div>
  );
}


