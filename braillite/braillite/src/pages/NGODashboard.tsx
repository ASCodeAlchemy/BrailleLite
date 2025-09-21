"use client";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { applications } from "@/data/applicationsData";
import {
  Search,
  Filter,
  Users,
  DollarSign,
  FileText,
  Heart,
  Settings,
  LogOut,
  Bell,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const NGODashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock donation stats
  const donationStats = {
    total: 125000,
    thisMonth: 15000,
    target: 200000,
    donors: 342,
  };

  // Mock beneficiaries
  const blindPeopleData = [
    {
      id: 1,
      name: "Rajesh Kumar",
      age: 28,
      location: "Mumbai",
      status: "Active",
      program: "Braille Learning",
      joinDate: "2023-06-15",
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 24,
      location: "Delhi",
      status: "Active",
      program: "Mobility Training",
      joinDate: "2023-07-22",
    },
    {
      id: 3,
      name: "Amit Singh",
      age: 35,
      location: "Bangalore",
      status: "Completed",
      program: "Technology Access",
      joinDate: "2023-05-10",
    },
    {
      id: 4,
      name: "Sunita Devi",
      age: 42,
      location: "Chennai",
      status: "Active",
      program: "Educational Support",
      joinDate: "2023-08-03",
    },
    {
      id: 5,
      name: "Vikram Joshi",
      age: 31,
      location: "Pune",
      status: "Active",
      program: "Job Training",
      joinDate: "2023-09-18",
    },
  ];

  // Sidebar Items
  const sidebarItems = [
  { icon: Users, label: "Dashboard", path: "/ngodash", active: true },
  { icon: FileText, label: "Applications", path: "/ngodash/applications" },
  { icon: Users, label: "Beneficiaries", path: "/ngodash/beneficiaries" },
  { icon: DollarSign, label: "Donations", path: "/ngodash/donations" },
  { icon: Heart, label: "Programs", path: "/ngodash/programs" },
  { icon: Settings, label: "Settings", path: "/ngodash/settings" },
  ];


  // Filter logic
  const filteredData = blindPeopleData.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.program.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : person.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "approved":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "reviewed":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "Active":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "Completed":
        return "bg-purple-500/20 text-purple-700 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-slate-800"
      )}
    >
      {/* Header */}
      <header className="h-16 px-6 flex items-center justify-between shadow-md bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-slate-200/40 dark:hover:bg-slate-700/40"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-lg">Brailite NGO Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>NG</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:scale-105 transition-transform bg-white/60 dark:bg-slate-800/60 shadow-lg">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Donations</p>
                  <p className="text-2xl font-bold">₹{donationStats.total.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </CardContent>
            </Card>
            <Card className="hover:scale-105 transition-transform bg-white/60 dark:bg-slate-800/60 shadow-lg">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">₹{donationStats.thisMonth.toLocaleString()}</p>
                </div>
                <Heart className="w-8 h-8 text-pink-500" />
              </CardContent>
            </Card>
            <Card className="hover:scale-105 transition-transform bg-white/60 dark:bg-slate-800/60 shadow-lg">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Donors</p>
                  <p className="text-2xl font-bold">{donationStats.donors}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </CardContent>
            </Card>
            <Card className="hover:scale-105 transition-transform bg-white/60 dark:bg-slate-800/60 shadow-lg">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">{applications.length}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-500" />
              </CardContent>
            </Card>
          </div>

          {/* Applications Table */}
          <Card className="bg-white/60 dark:bg-slate-800/60 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id} className="hover:bg-slate-100/40 dark:hover:bg-slate-700/40">
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.program}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                      </TableCell>
                      <TableCell>{app.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Beneficiaries */}
          <Card className="bg-white/60 dark:bg-slate-800/60 shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Beneficiaries</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button
                    variant={statusFilter === "Active" ? "secondary" : "outline"}
                    onClick={() =>
                      setStatusFilter(statusFilter === "Active" ? "all" : "Active")
                    }
                  >
                    Active
                  </Button>
                  <Button
                    variant={statusFilter === "Completed" ? "secondary" : "outline"}
                    onClick={() =>
                      setStatusFilter(statusFilter === "Completed" ? "all" : "Completed")
                    }
                  >
                    Completed
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((person) => (
                      <TableRow key={person.id} className="hover:bg-slate-100/40 dark:hover:bg-slate-700/40">
                        <TableCell>{person.name}</TableCell>
                        <TableCell>{person.age}</TableCell>
                        <TableCell>{person.location}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(person.status)}>
                            {person.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{person.program}</TableCell>
                        <TableCell>{person.joinDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>

        {/* Sidebar (Right side) */}
        <aside
          className={cn(
            "transition-all duration-300 border-l shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl",
            sidebarOpen ? "w-64" : "w-20"
          )}
        >
          <ScrollArea className="h-full p-1">
            {sidebarItems.map((item, i) => (
              <Button
                key={i}
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-12`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            ))}
            <div className="mt-10 pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-red-600 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
                {sidebarOpen && "Logout"}
              </Button>
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
};

export default NGODashboard;
