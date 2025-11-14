import { DashboardStats } from '../dashboard-stats';

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

export default function DashboardStatsExample() {
  return (
    <div className="p-6">
      <DashboardStats stats={mockStats} trends={mockTrends} />
    </div>
  );
}
