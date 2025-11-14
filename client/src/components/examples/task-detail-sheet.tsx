import { TaskDetailSheet } from '../task-detail-sheet';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const mockTask = {
  id: "1",
  title: "Design new landing page",
  description: "Create wireframes and mockups for the new homepage",
  status: "in-progress",
  priority: "high" as const,
  assignee: "Alice Johnson",
  assigneeInitials: "AJ",
  dueDate: "Nov 20",
};

export default function TaskDetailSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Task Details</Button>
      <TaskDetailSheet
        task={mockTask}
        open={open}
        onOpenChange={setOpen}
        onSave={(task) => console.log('Task saved:', task)}
        onDelete={(id) => console.log('Task deleted:', id)}
      />
    </div>
  );
}
