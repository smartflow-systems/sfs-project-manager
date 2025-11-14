import { DashboardStats } from "@/components/dashboard-stats";
import { ActivityFeed } from "@/components/activity-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

//todo: remove mock functionality
const mockStats = {
  activeTasks: 24,
  completedThisWeek: 18,
  teamVelocity: 42,
  overdueItems: 3,
};

const mockTrends = {
  activeTasks: 12,
  completedThisWeek: 23,
  teamVelocity: 8,
  overdueItems: -15,
};

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
];

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Tasks Completed",
      data: [3, 5, 4, 6, 5],
      backgroundColor: "hsl(var(--primary))",
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your projects and team activity</p>
      </div>

      <DashboardStats stats={mockStats} trends={mockTrends} />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <ActivityFeed activities={mockActivities} />
      </div>
    </div>
  );
}
