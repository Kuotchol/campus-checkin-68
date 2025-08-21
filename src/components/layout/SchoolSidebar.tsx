import {
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  Library,
  PieChart,
  Settings,
  Users,
  UserCheck,
  ChevronRight,
  School,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Academic",
    icon: GraduationCap,
    items: [
      {
        title: "Students",
        url: "/students",
        icon: Users,
      },
      {
        title: "Teachers",
        url: "/teachers",
        icon: UserCheck,
      },
      {
        title: "Classes",
        url: "/classes",
        icon: BookOpen,
      },
      {
        title: "Subjects",
        url: "/subjects",
        icon: FileText,
      },
    ],
  },
  {
    title: "Management",
    icon: Settings,
    items: [
      {
        title: "Attendance",
        url: "/attendance",
        icon: UserCheck,
      },
      {
        title: "Grades",
        url: "/grades",
        icon: FileText,
      },
      {
        title: "Fee Management",
        url: "/fees",
        icon: CreditCard,
      },
      {
        title: "Library",
        url: "/library",
        icon: Library,
      },
    ],
  },
  {
    title: "Activities",
    icon: Calendar,
    items: [
      {
        title: "Events",
        url: "/events",
        icon: Calendar,
      },
      {
        title: "Announcements",
        url: "/announcements",
        icon: FileText,
      },
    ],
  },
  {
    title: "Reports",
    url: "/reports",
    icon: PieChart,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function SchoolSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const hasActiveChild = (items: any[]) => 
    items?.some(item => isActive(item.url));

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <School className="h-8 w-8 text-primary" />
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">
                EduManage
              </h1>
              <p className="text-xs text-sidebar-foreground/70">
                School Management System
              </p>
            </div>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible
                      defaultOpen={hasActiveChild(item.items)}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`${
                            hasActiveChild(item.items)
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : ""
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {!collapsed && (
                            <>
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={subItem.url}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                      : ""
                                  }
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  {!collapsed && <span>{subItem.title}</span>}
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : ""
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-4">
          {!collapsed && (
            <div className="text-xs text-sidebar-foreground/70">
              © 2024 EduManage Pro
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}