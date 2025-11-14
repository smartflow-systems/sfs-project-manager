import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";
import { TaskCard } from "./task-card";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: "low" | "medium" | "high";
  assignee?: string;
  assigneeInitials?: string;
  dueDate?: string;
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void;
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: string) => void;
}

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export function KanbanBoard({ tasks, onTaskUpdate, onTaskClick, onAddTask }: KanbanBoardProps) {
  const [items, setItems] = useState(tasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = items.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overColumn = columns.find((c) => c.id === overId);
    if (overColumn && activeTask.status !== overColumn.id) {
      setItems((items) =>
        items.map((item) =>
          item.id === activeId ? { ...item, status: overColumn.id } : item
        )
      );
      onTaskUpdate?.(activeId, { status: overColumn.id });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = items.find((t) => t.id === activeId);
    const overTask = items.find((t) => t.id === overId);

    if (activeTask && overTask && activeTask.status === overTask.status) {
      const oldIndex = items.indexOf(activeTask);
      const newIndex = items.indexOf(overTask);
      setItems(arrayMove(items, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const activeTask = activeId ? items.find((t) => t.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-full overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={items.filter((t) => t.status === column.id)}
            onTaskClick={onTaskClick}
            onAddTask={() => onAddTask?.(column.id)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3">
            <TaskCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
