import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  GraduationCap,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Total Teachers",
    value: "87",
    change: "+3%",
    trend: "up",
    icon: UserCheck,
    color: "text-green-500",
  },
  {
    title: "Active Classes",
    value: "42",
    change: "0%",
    trend: "neutral",
    icon: BookOpen,
    color: "text-purple-500",
  },
  {
    title: "This Month Events",
    value: "15",
    change: "+25%",
    trend: "up",
    icon: Calendar,
    color: "text-orange-500",
  },
];

const recentActivities = [
  {
    title: "New student enrollment",
    description: "John Doe enrolled in Grade 10-A",
    time: "2 hours ago",
    status: "success",
  },
  {
    title: "Teacher assignment",
    description: "Ms. Smith assigned to Mathematics",
    time: "4 hours ago",
    status: "info",
  },
  {
    title: "Fee payment overdue",
    description: "15 students have pending payments",
    time: "6 hours ago",
    status: "warning",
  },
  {
    title: "Class schedule updated",
    description: "Grade 11 physics class rescheduled",
    time: "1 day ago",
    status: "info",
  },
];

const upcomingEvents = [
  {
    title: "Parent-Teacher Meeting",
    date: "March 15, 2024",
    time: "9:00 AM",
    type: "Meeting",
  },
  {
    title: "Science Fair",
    date: "March 20, 2024",
    time: "10:00 AM",
    type: "Event",
  },
  {
    title: "Mid-term Examinations",
    date: "March 25, 2024",
    time: "8:00 AM",
    type: "Exam",
  },
];

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening at your school today.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Quick Actions
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" && (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                )}
                {stat.trend === "down" && (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up"
                      ? "text-green-500"
                      : stat.trend === "down"
                      ? "text-red-500"
                      : "text-muted-foreground"
                  }
                >
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates and notifications from your school
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {activity.status === "success" && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {activity.status === "warning" && (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                  {activity.status === "info" && (
                    <Clock className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Important dates and events coming up
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {event.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.date} at {event.time}
                  </p>
                </div>
                <Badge
                  variant={
                    event.type === "Exam"
                      ? "destructive"
                      : event.type === "Meeting"
                      ? "secondary"
                      : "default"
                  }
                >
                  {event.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions for efficient school management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-xs">Add Student</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <UserCheck className="h-6 w-6" />
              <span className="text-xs">Mark Attendance</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-xs">Create Class</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-xs">Schedule Event</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <GraduationCap className="h-6 w-6" />
              <span className="text-xs">Add Teacher</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <AlertCircle className="h-6 w-6" />
              <span className="text-xs">Send Notice</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}