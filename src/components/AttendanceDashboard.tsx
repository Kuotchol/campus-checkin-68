import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  UserX, 
  TrendingUp,
  Calendar
} from "lucide-react";

interface AttendanceStats {
  totalStudents: number;
  present: number;
  late: number;
  absent: number;
  attendanceRate: number;
}

// Mock data - in real app this would come from your database
const todayStats: AttendanceStats = {
  totalStudents: 28,
  present: 22,
  late: 3,
  absent: 3,
  attendanceRate: 89.3
};

const weeklyStats = [
  { day: "Monday", rate: 92.5 },
  { day: "Tuesday", rate: 87.8 },
  { day: "Wednesday", rate: 91.2 },
  { day: "Thursday", rate: 89.3 },
  { day: "Friday", rate: 85.7 }
];

export function AttendanceDashboard() {
  const getProgressColor = (rate: number) => {
    if (rate >= 90) return "bg-success";
    if (rate >= 75) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Attendance Dashboard
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Today's Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{todayStats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-success">{todayStats.present}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-full">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Late</p>
                <p className="text-2xl font-bold text-warning">{todayStats.late}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-full">
                <UserX className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-destructive">{todayStats.absent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Rate */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Today's Attendance Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Rate</span>
              <Badge 
                variant={todayStats.attendanceRate >= 90 ? "default" : todayStats.attendanceRate >= 75 ? "secondary" : "destructive"}
                className="text-lg px-3 py-1"
              >
                {todayStats.attendanceRate}%
              </Badge>
            </div>
            <Progress 
              value={todayStats.attendanceRate} 
              className="h-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trend */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Weekly Attendance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyStats.map((day, index) => (
              <div key={day.day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{day.day}</span>
                  <span className="text-sm text-muted-foreground">{day.rate}%</span>
                </div>
                <Progress 
                  value={day.rate} 
                  className={`h-2 ${getProgressColor(day.rate)}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">View All Students</p>
              <p className="text-xs text-muted-foreground">Manage student records</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Generate Report</p>
              <p className="text-xs text-muted-foreground">Export attendance data</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">View Analytics</p>
              <p className="text-xs text-muted-foreground">Detailed insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}