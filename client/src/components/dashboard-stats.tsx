import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: number;
  icon?: React.ReactNode;
}

function StatCard({ title, value, trend, icon }: StatCardProps) {
  const isPositive = trend && trend > 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold" data-testid={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {Math.abs(trend)}%
            </span>
            <span>from last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  stats: {
    activeTasks: number;
    completedThisWeek: number;
    teamVelocity: number;
    overdueItems: number;
  };
  trends?: {
    activeTasks?: number;
    completedThisWeek?: number;
    teamVelocity?: number;
    overdueItems?: number;
  };
}

export function DashboardStats({ stats, trends = {} }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Active Tasks"
        value={stats.activeTasks.toString()}
        trend={trends.activeTasks}
      />
      <StatCard
        title="Completed This Week"
        value={stats.completedThisWeek.toString()}
        trend={trends.completedThisWeek}
      />
      <StatCard
        title="Team Velocity"
        value={`${stats.teamVelocity} pts`}
        trend={trends.teamVelocity}
      />
      <StatCard
        title="Overdue Items"
        value={stats.overdueItems.toString()}
        trend={trends.overdueItems}
      />
    </div>
  );
}
