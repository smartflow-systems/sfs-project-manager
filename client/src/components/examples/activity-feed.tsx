import { ActivityFeed } from '../activity-feed';

const mockActivities = [
  {
    id: "1",
    user: "Alice Johnson",
    userInitials: "AJ",
    action: "completed",
    target: "Design new landing page",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    user: "Bob Smith",
    userInitials: "BS",
    action: "commented on",
    target: "Mobile App Project",
    timestamp: "15 minutes ago",
  },
  {
    id: "3",
    user: "Carol Davis",
    userInitials: "CD",
    action: "created",
    target: "Implement authentication",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    user: "David Lee",
    userInitials: "DL",
    action: "updated",
    target: "Write API documentation",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    user: "Alice Johnson",
    userInitials: "AJ",
    action: "assigned",
    target: "Fix mobile responsiveness",
    timestamp: "3 hours ago",
  },
];

export default function ActivityFeedExample() {
  return (
    <div className="p-6 max-w-md">
      <ActivityFeed activities={mockActivities} />
    </div>
  );
}
