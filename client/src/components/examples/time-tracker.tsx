import { TimeTracker } from '../time-tracker';

export default function TimeTrackerExample() {
  return (
    <div className="p-6 max-w-md">
      <TimeTracker
        taskId="1"
        taskTitle="Design new landing page"
        onStart={() => console.log('Timer started')}
        onPause={() => console.log('Timer paused')}
        onStop={(duration) => console.log('Timer stopped, duration:', duration)}
      />
    </div>
  );
}
