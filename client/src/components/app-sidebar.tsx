import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  ListTodo, 
  Users, 
  BarChart3,
  Plus,
  Circle,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  color: string;
}

interface AppSidebarProps {
  projects?: Project[];
  teamMembers?: { id: string; name: string; initials: string }[];
  onAddProject?: () => void;
}

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Tasks", url: "/tasks", icon: ListTodo },
  { title: "Team", url: "/team", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

export function AppSidebar({ projects = [], teamMembers = [], onAddProject }: AppSidebarProps) {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-nav-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <div className="flex items-center justify-between px-2">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={onAddProject}
              data-testid="button-add-project"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/project/${project.id}`} data-testid={`link-project-${project.id}`}>
                      <Circle className="h-3 w-3" style={{ fill: project.color, color: project.color }} />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <div className="text-xs text-muted-foreground mb-2">Team Members</div>
          <div className="flex -space-x-2">
            {teamMembers.slice(0, 5).map((member) => (
              <Avatar key={member.id} className="h-8 w-8 border-2 border-sidebar" data-testid={`avatar-${member.id}`}>
                <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
              </Avatar>
            ))}
            {teamMembers.length > 5 && (
              <Avatar className="h-8 w-8 border-2 border-sidebar">
                <AvatarFallback className="text-xs">+{teamMembers.length - 5}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
