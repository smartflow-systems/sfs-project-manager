import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";

export interface GanttTask {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  assignee?: string;
  assigneeInitials?: string;
  color?: string;
}

interface GanttChartProps {
  tasks: GanttTask[];
  onTaskClick?: (task: GanttTask) => void;
}

export function GanttChart({ tasks, onTaskClick }: GanttChartProps) {
  const allDates = tasks.flatMap((t) => [t.startDate, t.endDate]);
  const minDate = startOfMonth(new Date(Math.min(...allDates.map((d) => d.getTime()))));
  const maxDate = endOfMonth(new Date(Math.max(...allDates.map((d) => d.getTime()))));
  const days = eachDayOfInterval({ start: minDate, end: maxDate });

  const getTaskPosition = (task: GanttTask) => {
    const taskStart = task.startDate.getTime();
    const taskEnd = task.endDate.getTime();
    const timelineStart = minDate.getTime();
    const timelineEnd = maxDate.getTime();
    const totalDuration = timelineEnd - timelineStart;

    const left = ((taskStart - timelineStart) / totalDuration) * 100;
    const width = ((taskEnd - taskStart) / totalDuration) * 100;

    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <div className="space-y-4">
      <div className="flex border-b">
        <div className="w-64 flex-shrink-0 px-4 py-2">
          <span className="text-sm font-medium">Task Name</span>
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="flex min-w-[800px]">
            {days.map((day, i) => (
              <div
                key={i}
                className={`flex-1 px-1 py-2 text-center border-l ${
                  day.getDay() === 0 || day.getDay() === 6 ? "bg-muted/30" : ""
                }`}
              >
                <div className="text-xs text-muted-foreground">{format(day, "EEE")}</div>
                <div className="text-xs font-medium">{format(day, "d")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => {
          const position = getTaskPosition(task);
          return (
            <div key={task.id} className="flex" data-testid={`gantt-task-${task.id}`}>
              <div className="w-64 flex-shrink-0 px-4 py-2 flex items-center gap-2">
                <span className="text-sm truncate">{task.title}</span>
                {task.assignee && (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">{task.assigneeInitials}</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex-1 py-2 relative">
                <div className="relative min-w-[800px] h-8">
                  <div
                    className="absolute top-0 h-8 rounded-md cursor-pointer hover-elevate overflow-hidden"
                    style={position}
                    onClick={() => onTaskClick?.(task)}
                    data-testid={`gantt-bar-${task.id}`}
                  >
                    <div
                      className="h-full flex items-center px-2"
                      style={{ backgroundColor: task.color || "hsl(var(--primary))" }}
                    >
                      <div
                        className="absolute inset-0 bg-primary-foreground/30"
                        style={{ width: `${task.progress}%` }}
                      />
                      <span className="relative text-xs text-primary-foreground font-medium truncate">
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
