import { SidebarProvider } from "@/components/ui/sidebar";
import { SchoolSidebar } from "./SchoolSidebar";
import { Toaster } from "@/components/ui/toaster";

interface SchoolLayoutProps {
  children: React.ReactNode;
}

export function SchoolLayout({ children }: SchoolLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <SchoolSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}