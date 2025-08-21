import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Users, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  grade: string;
  avatar?: string;
  status: "present" | "absent" | "late";
  checkInTime?: string;
}

// Mock data - in real app this would come from your database
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emma Johnson",
    grade: "Year 10A",
    avatar: "/placeholder.svg",
    status: "absent"
  },
  {
    id: "2", 
    name: "James Smith",
    grade: "Year 10A",
    avatar: "/placeholder.svg",
    status: "present",
    checkInTime: "08:15"
  },
  {
    id: "3",
    name: "Sophie Chen",
    grade: "Year 10A", 
    avatar: "/placeholder.svg",
    status: "late",
    checkInTime: "08:45"
  },
  {
    id: "4",
    name: "Marcus Williams",
    grade: "Year 10A",
    avatar: "/placeholder.svg",
    status: "absent"
  }
];

export function CheckInCard() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleCheckIn = (studentId: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { 
              ...student, 
              status: now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 30) 
                ? "late" as const 
                : "present" as const,
              checkInTime: timeString
            }
          : student
      )
    );

    const student = students.find(s => s.id === studentId);
    toast({
      title: "Check-in Successful",
      description: `${student?.name} has been marked present at ${timeString}`,
    });
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case "present": return "success";
      case "late": return "warning"; 
      case "absent": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case "present": return <CheckCircle className="h-4 w-4" />;
      case "late": return <Clock className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-card">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="h-6 w-6" />
          Student Check-In System
        </CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/70" />
          <Input
            placeholder="Search students by name or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="border border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{student.name}</h3>
                    <p className="text-xs text-muted-foreground">{student.grade}</p>
                  </div>
                  <Badge 
                    variant={getStatusColor(student.status) as any}
                    className="flex items-center gap-1"
                  >
                    {getStatusIcon(student.status)}
                    {student.status}
                  </Badge>
                </div>
                
                {student.checkInTime && (
                  <p className="text-xs text-muted-foreground mb-3">
                    Check-in: {student.checkInTime}
                  </p>
                )}
                
                <Button
                  onClick={() => handleCheckIn(student.id)}
                  disabled={student.status !== "absent"}
                  className="w-full"
                  variant={student.status === "absent" ? "default" : "secondary"}
                >
                  {student.status === "absent" ? "Check In" : "Already Checked In"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No students found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}