import { useState } from "react";
import { KanbanBoard, Task } from "@/components/kanban-board";
import { TaskDetailSheet } from "@/components/task-detail-sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

//todo: remove mock functionality
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create wireframes and mockups for the new homepage",
    status: "todo",
    priority: "high",
    assignee: "Alice Johnson",
    assigneeInitials: "AJ",
    dueDate: "Nov 20",
  },
  {
    id: "2",
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment",
    status: "todo",
    priority: "medium",
    assignee: "Bob Smith",
    assigneeInitials: "BS",
    dueDate: "Nov 22",
  },
  {
    id: "3",
    title: "Implement authentication",
    description: "Add login and signup functionality",
    status: "in-progress",
    priority: "high",
    assignee: "Carol Davis",
    assigneeInitials: "CD",
    dueDate: "Nov 18",
  },
  {
    id: "4",
    title: "Write API documentation",
    status: "in-progress",
    priority: "low",
    assignee: "David Lee",
    assigneeInitials: "DL",
  },
  {
    id: "5",
    title: "Fix mobile responsiveness",
    description: "Improve layout on mobile devices",
    status: "review",
    priority: "medium",
    assignee: "Alice Johnson",
    assigneeInitials: "AJ",
    dueDate: "Nov 16",
  },
  {
    id: "6",
    title: "Update dependencies",
    status: "done",
    priority: "low",
    assignee: "Bob Smith",
    assigneeInitials: "BS",
  },
];

export default function Kanban() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setSheetOpen(true);
  };

  const handleTaskSave = (updatedTask: any) => {
    handleTaskUpdate(updatedTask.id, updatedTask);
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleAddTask = (status: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "New Task",
      status,
      priority: "medium",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Kanban Board</h1>
          <p className="text-sm text-muted-foreground">Manage tasks with drag and drop</p>
        </div>
        <Button onClick={() => handleAddTask("todo")} data-testid="button-add-task">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <KanbanBoard
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskClick={handleTaskClick}
          onAddTask={handleAddTask}
        />
      </div>

      <TaskDetailSheet
        task={selectedTask}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSave={handleTaskSave}
        onDelete={handleTaskDelete}
      />
    </div>
  );
}
