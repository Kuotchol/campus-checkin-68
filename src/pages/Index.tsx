import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CheckInCard } from "@/components/CheckInCard";
import { AttendanceDashboard } from "@/components/AttendanceDashboard";
import { StudentManager } from "@/components/StudentManager";

const Index = () => {
  const [activeTab, setActiveTab] = useState("checkin");

  const renderContent = () => {
    switch (activeTab) {
      case "checkin":
        return <CheckInCard />;
      case "dashboard":
        return <AttendanceDashboard />;
      case "students":
        return <StudentManager />;
      default:
        return <CheckInCard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="animate-slide-up">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;