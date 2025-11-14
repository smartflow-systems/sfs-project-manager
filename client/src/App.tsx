import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProjectDialog } from "@/components/project-dialog";
import { useState } from "react";
import Dashboard from "@/pages/dashboard";
import Kanban from "@/pages/kanban";
import Gantt from "@/pages/gantt";
import TimeTracking from "@/pages/time-tracking";
import NotFound from "@/pages/not-found";

//todo: remove mock functionality
const initialProjects = [
  { id: "1", name: "Website Redesign", color: "#3b82f6" },
  { id: "2", name: "Mobile App", color: "#10b981" },
  { id: "3", name: "Marketing Campaign", color: "#f59e0b" },
];

const teamMembers = [
  { id: "1", name: "Alice Johnson", initials: "AJ" },
  { id: "2", name: "Bob Smith", initials: "BS" },
  { id: "3", name: "Carol Davis", initials: "CD" },
  { id: "4", name: "David Lee", initials: "DL" },
];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/kanban" component={Kanban} />
      <Route path="/gantt" component={Gantt} />
      <Route path="/time" component={TimeTracking} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  const handleAddProject = () => {
    setProjectDialogOpen(true);
  };

  const handleSaveProject = (project: { name: string; description: string; color: string }) => {
    const newProject = {
      id: Date.now().toString(),
      name: project.name,
      color: project.color,
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar
              projects={projects}
              teamMembers={teamMembers}
              onAddProject={handleAddProject}
            />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between px-4 py-3 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto p-6">
                <Router />
              </main>
            </div>
          </div>
          <ProjectDialog
            open={projectDialogOpen}
            onOpenChange={setProjectDialogOpen}
            onSave={handleSaveProject}
          />
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
