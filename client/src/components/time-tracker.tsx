import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimeTrackerProps {
  taskId?: string;
  taskTitle?: string;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: (duration: number) => void;
}

export function TimeTracker({ taskId, taskTitle, onStart, onPause, onStop }: TimeTrackerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    onStart?.();
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    onPause?.();
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    onStop?.(seconds);
    setSeconds(0);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {taskTitle && (
          <div>
            <div className="text-xs text-muted-foreground mb-1">Tracking Time For</div>
            <div className="text-sm font-medium">{taskTitle}</div>
          </div>
        )}
        
        <div className="flex items-center justify-center">
          <div className="text-5xl font-mono font-semibold tabular-nums" data-testid="text-timer">
            {formatTime(seconds)}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {!isRunning ? (
            <Button onClick={handleStart} data-testid="button-start-timer">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={handlePause} data-testid="button-pause-timer">
                <Pause className="h-4 w-4 mr-2" />
                {isPaused ? "Resume" : "Pause"}
              </Button>
              <Button variant="destructive" onClick={handleStop} data-testid="button-stop-timer">
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </>
          )}
        </div>

        {isRunning && (
          <div className="flex justify-center">
            <Badge variant={isPaused ? "secondary" : "default"}>
              {isPaused ? "Paused" : "Recording"}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}
