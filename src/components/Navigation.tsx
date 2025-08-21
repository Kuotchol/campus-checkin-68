import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  BarChart3, 
  UserCheck, 
  GraduationCap 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  {
    id: "checkin",
    label: "Check-In",
    icon: UserCheck,
    description: "Mark student attendance"
  },
  {
    id: "dashboard", 
    label: "Dashboard",
    icon: BarChart3,
    description: "View attendance overview"
  },
  {
    id: "students",
    label: "Students", 
    icon: Users,
    description: "Manage student records"
  }
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="w-full mb-8">
      {/* Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-primary rounded-full">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Campus Check-In
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-xl">
          Modern attendance tracking system for secondary schools. 
          Streamline your daily attendance management with our intuitive platform.
        </p>
      </div>

      {/* Navigation Tabs */}
      <Card className="p-2 bg-muted/30 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex-1 h-auto p-4 justify-start gap-3",
                  isActive && "bg-primary text-primary-foreground shadow-primary"
                )}
              >
                <Icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold text-lg">{tab.label}</div>
                  <div className={cn(
                    "text-sm opacity-80",
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {tab.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}