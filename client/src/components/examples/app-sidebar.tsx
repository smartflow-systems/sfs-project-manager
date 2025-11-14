import { AppSidebar } from '../app-sidebar';
import { SidebarProvider } from "@/components/ui/sidebar";

const mockProjects = [
  { id: "1", name: "Website Redesign", color: "#3b82f6" },
  { id: "2", name: "Mobile App", color: "#10b981" },
  { id: "3", name: "Marketing Campaign", color: "#f59e0b" },
];

const mockTeamMembers = [
  { id: "1", name: "Alice Johnson", initials: "AJ" },
  { id: "2", name: "Bob Smith", initials: "BS" },
  { id: "3", name: "Carol Davis", initials: "CD" },
  { id: "4", name: "David Lee", initials: "DL" },
];

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar 
          projects={mockProjects}
          teamMembers={mockTeamMembers}
          onAddProject={() => console.log('Add project clicked')}
        />
      </div>
    </SidebarProvider>
  );
}
