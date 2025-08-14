import WeeklyHoursEditor from 'src/components/availability/WeeklyHoursEditor';
import DateSpecificHoursEditor from 'src/components/availability/DateSpecificHoursEditor';

export default function ManageWorkingHourPage() {
  return (
    <div style={{ padding: 24 }}>
      <WeeklyHoursEditor />
      <div style={{ height: 12 }} />
      <DateSpecificHoursEditor />
    </div>
  );
}


