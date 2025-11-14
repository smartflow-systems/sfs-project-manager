import { useState } from "react";
import { TimeTracker } from "@/components/time-tracker";
import { TimeLogTable, TimeLog } from "@/components/time-log-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

//todo: remove mock functionality
const initialLogs: TimeLog[] = [
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

export default function TimeTracking() {
  const [logs, setLogs] = useState(initialLogs);
  const [currentTask] = useState("Design new landing page");

  const handleStopTimer = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    const formattedDuration = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const newLog: TimeLog = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      task: currentTask,
      duration: formattedDuration,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleDeleteLog = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const totalHoursToday = logs
    .filter((log) => log.date === new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))
    .reduce((acc, log) => {
      const [hours, minutes] = log.duration.split(":").map(Number);
      return acc + hours + minutes / 60;
    }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Time Tracking</h1>
        <p className="text-sm text-muted-foreground">Track time spent on tasks</p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TimeTracker
            taskId="1"
            taskTitle={currentTask}
            onStart={() => console.log("Timer started")}
            onPause={() => console.log("Timer paused")}
            onStop={handleStopTimer}
          />

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono font-semibold" data-testid="text-total-hours">
                  {totalHoursToday.toFixed(1)}
                </span>
                <span className="text-muted-foreground">hours</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Logged entries</span>
                  <Badge variant="secondary">{logs.length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time Log</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeLogTable logs={logs} onDelete={handleDeleteLog} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
