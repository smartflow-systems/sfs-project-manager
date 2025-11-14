import { GanttChart } from '../gantt-chart';

const mockTasks = [
  {
    id: "1",
    title: "Design Phase",
    startDate: new Date(2024, 10, 1),
    endDate: new Date(2024, 10, 10),
    progress: 100,
    assignee: "Alice Johnson",
    assigneeInitials: "AJ",
    color: "#3b82f6",
  },
  {
    id: "2",
    title: "Development",
    startDate: new Date(2024, 10, 8),
    endDate: new Date(2024, 10, 25),
    progress: 60,
    assignee: "Bob Smith",
    assigneeInitials: "BS",
    color: "#10b981",
  },
  {
    id: "3",
    title: "Testing & QA",
    startDate: new Date(2024, 10, 20),
    endDate: new Date(2024, 10, 30),
    progress: 30,
    assignee: "Carol Davis",
    assigneeInitials: "CD",
    color: "#f59e0b",
  },
  {
    id: "4",
    title: "Deployment",
    startDate: new Date(2024, 10, 28),
    endDate: new Date(2024, 11, 5),
    progress: 0,
    assignee: "David Lee",
    assigneeInitials: "DL",
    color: "#8b5cf6",
  },
];

export default function GanttChartExample() {
  return (
    <div className="p-6">
      <GanttChart
        tasks={mockTasks}
        onTaskClick={(task) => console.log('Task clicked:', task)}
      />
    </div>
  );
}
