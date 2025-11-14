import { KanbanBoard } from '../kanban-board';

const mockTasks = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create wireframes and mockups for the new homepage",
    status: "todo",
    priority: "high" as const,
    assignee: "Alice Johnson",
    assigneeInitials: "AJ",
    dueDate: "Nov 20",
  },
  {
    id: "2",
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment",
    status: "todo",
    priority: "medium" as const,
    assignee: "Bob Smith",
    assigneeInitials: "BS",
    dueDate: "Nov 22",
  },
  {
    id: "3",
    title: "Implement authentication",
    description: "Add login and signup functionality",
    status: "in-progress",
    priority: "high" as const,
    assignee: "Carol Davis",
    assigneeInitials: "CD",
    dueDate: "Nov 18",
  },
  {
    id: "4",
    title: "Write API documentation",
    status: "in-progress",
    priority: "low" as const,
    assignee: "David Lee",
    assigneeInitials: "DL",
  },
  {
    id: "5",
    title: "Fix mobile responsiveness",
    description: "Improve layout on mobile devices",
    status: "review",
    priority: "medium" as const,
    assignee: "Alice Johnson",
    assigneeInitials: "AJ",
    dueDate: "Nov 16",
  },
  {
    id: "6",
    title: "Update dependencies",
    status: "done",
    priority: "low" as const,
    assignee: "Bob Smith",
    assigneeInitials: "BS",
  },
];

export default function KanbanBoardExample() {
  return (
    <div className="h-[600px] p-6">
      <KanbanBoard
        tasks={mockTasks}
        onTaskUpdate={(id, updates) => console.log('Task updated:', id, updates)}
        onTaskClick={(task) => console.log('Task clicked:', task)}
        onAddTask={(status) => console.log('Add task to:', status)}
      />
    </div>
  );
}
