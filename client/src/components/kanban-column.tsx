import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "./task-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Task } from "./kanban-board";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: () => void;
}

export function KanbanColumn({ id, title, tasks, onTaskClick, onAddTask }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col w-80 flex-shrink-0" data-testid={`column-${id}`}>
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">{title}</h3>
          <Badge variant="secondary" className="h-5 px-2" data-testid={`badge-count-${id}`}>
            {tasks.length}
          </Badge>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6"
          onClick={onAddTask}
          data-testid={`button-add-task-${id}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={setNodeRef}
        className="flex-1 space-y-3 min-h-[200px] p-2 rounded-lg bg-muted/30"
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick?.(task)} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
