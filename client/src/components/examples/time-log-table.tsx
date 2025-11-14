import { TimeLogTable } from '../time-log-table';

const mockLogs = [
  {
    id: "1",
    date: "Nov 14, 2024",
    task: "Design new landing page",
    duration: "02:30:00",
    notes: "Completed wireframes",
  },
  {
    id: "2",
    date: "Nov 14, 2024",
    task: "Implement authentication",
    duration: "01:45:00",
    notes: "Set up login flow",
  },
  {
    id: "3",
    date: "Nov 13, 2024",
    task: "Write API documentation",
    duration: "03:15:00",
  },
];

export default function TimeLogTableExample() {
  return (
    <div className="p-6">
      <TimeLogTable
        logs={mockLogs}
        onDelete={(id) => console.log('Delete log:', id)}
      />
    </div>
  );
}
