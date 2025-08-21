import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  grade: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  attendanceRate: number;
  lastCheckIn?: string;
}

// Mock data - in real app this would come from your database
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emma Johnson",
    grade: "Year 10A",
    email: "emma.johnson@school.edu",
    phone: "+1 (555) 0123",
    address: "123 Main St, Springfield",
    avatar: "/placeholder.svg",
    attendanceRate: 94.5,
    lastCheckIn: "Today, 08:15"
  },
  {
    id: "2",
    name: "James Smith", 
    grade: "Year 10A",
    email: "james.smith@school.edu",
    phone: "+1 (555) 0124",
    address: "456 Oak Ave, Springfield",
    avatar: "/placeholder.svg",
    attendanceRate: 89.2,
    lastCheckIn: "Today, 08:20"
  },
  {
    id: "3",
    name: "Sophie Chen",
    grade: "Year 10A",
    email: "sophie.chen@school.edu", 
    phone: "+1 (555) 0125",
    address: "789 Pine Rd, Springfield",
    avatar: "/placeholder.svg",
    attendanceRate: 96.8,
    lastCheckIn: "Today, 08:45"
  },
  {
    id: "4",
    name: "Marcus Williams",
    grade: "Year 10A",
    email: "marcus.williams@school.edu",
    phone: "+1 (555) 0126", 
    address: "321 Elm St, Springfield",
    avatar: "/placeholder.svg",
    attendanceRate: 87.3,
    lastCheckIn: "Yesterday, 08:10"
  },
  {
    id: "5",
    name: "Lily Anderson",
    grade: "Year 10B", 
    email: "lily.anderson@school.edu",
    phone: "+1 (555) 0127",
    address: "654 Maple Dr, Springfield",
    avatar: "/placeholder.svg", 
    attendanceRate: 92.1,
    lastCheckIn: "Today, 08:30"
  }
];

export function StudentManager() {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const grades = Array.from(new Set(students.map(s => s.grade))).sort();

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return "success";
    if (rate >= 85) return "secondary"; 
    if (rate >= 75) return "warning";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Student Management
            </div>
            <Button variant="secondary" size="sm" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2 bg-background border border-input rounded-md text-sm"
            >
              <option value="all">All Grades</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Student Cards for Mobile */}
      <div className="grid gap-4 md:hidden">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.grade}</p>
                    </div>
                    <Badge variant={getAttendanceColor(student.attendanceRate) as any}>
                      {student.attendanceRate}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {student.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {student.phone}
                    </div>
                    {student.lastCheckIn && (
                      <p className="text-xs text-muted-foreground">
                        Last check-in: {student.lastCheckIn}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Table for Desktop */}
      <Card className="hidden md:block shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead>Last Check-in</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {student.address}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {student.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getAttendanceColor(student.attendanceRate) as any}>
                      {student.attendanceRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {student.lastCheckIn || "Never"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredStudents.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No students found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or add new students to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}