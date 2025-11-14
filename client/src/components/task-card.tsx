import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task } from "./kanban-board";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  isDragging?: boolean;
}

const priorityColors = {
  low: "bg-blue-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

export function TaskCard({ task, onClick, isDragging }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`p-3 cursor-pointer hover-elevate ${isDragging ? 'shadow-lg' : ''}`}
      onClick={onClick}
      data-testid={`task-card-${task.id}`}
    >
      <div className="flex items-start gap-2">
        <button
          className="cursor-grab active:cursor-grabbing mt-1 hover-elevate rounded p-1"
          {...attributes}
          {...listeners}
          data-testid={`drag-handle-${task.id}`}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${priorityColors[task.priority]}`} />
            <h4 className="text-sm font-medium leading-tight">{task.title}</h4>
          </div>
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center justify-between gap-2">
            {task.assignee && (
              <Avatar className="h-6 w-6" data-testid={`avatar-${task.id}`}>
                <AvatarFallback className="text-xs">{task.assigneeInitials}</AvatarFallback>
              </Avatar>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                <Calendar className="h-3 w-3" />
                <span>{task.dueDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
