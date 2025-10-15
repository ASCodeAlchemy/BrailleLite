"use client";
import { useState } from "react";
import { Link } from "react-router-dom"; // Use react-router-dom for navigation
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  Inbox,
  Clock,
  ChevronDown,
  FileText,
  Sun,      // Added for theme toggle
  Moon,     // Added for theme toggle
  ArrowLeft // Added for back button
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- MOCK DATA & TYPE DEFINITION ---
// The error was caused by an invalid import path. 
// For demonstration, the data is now included directly in this file.
export type Application = {
  id: number;
  name: string;
  avatarUrl: string;
  program: string;
  date: string;
  status: "pending" | "approved" | "reviewed" | "rejected";
};

const applications: Application[] = [
    { id: 1, name: "Aisha Sharma", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=AS", program: "Youth Empowerment Initiative", date: "2023-10-26", status: "pending" },
    { id: 2, name: "Rohan Verma", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=RV", program: "Community Health Program", date: "2023-10-25", status: "approved" },
    { id: 3, name: "Priya Singh", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=PS", program: "Environmental Cleanup Drive", date: "2023-10-24", status: "reviewed" },
    { id: 4, name: "Karan Gupta", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=KG", program: "Digital Literacy for Seniors", date: "2023-10-23", status: "rejected" },
    { id: 5, name: "Sunita Reddy", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=SR", program: "Youth Empowerment Initiative", date: "2023-10-22", status: "pending" },
    { id: 6, name: "Amit Patel", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=AP", program: "Community Health Program", date: "2023-10-21", status: "approved" },
];


// Helper to get initials from a name for the avatar fallback
const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Status Badge Component for consistency
const StatusBadge = ({ status }: { status: Application['status'] }) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="text-amber-600 border-amber-400 bg-amber-50 dark:bg-amber-950 dark:text-amber-400">Pending</Badge>;
    case "approved":
      return <Badge variant="outline" className="text-green-600 border-green-400 bg-green-50 dark:bg-green-950 dark:text-green-400">Approved</Badge>;
    case "reviewed":
      return <Badge variant="outline" className="text-blue-600 border-blue-400 bg-blue-50 dark:bg-blue-950 dark:text-blue-400">Reviewed</Badge>;
    case "rejected":
        return <Badge variant="outline" className="text-red-600 border-red-400 bg-red-50 dark:bg-red-950 dark:text-red-400">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const ApplicationsPage = () => {
  // --- STATE MANAGEMENT ---
  const [appsData, setAppsData] = useState<Application[]>(applications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Theme state

  // --- STATUS UPDATE LOGIC ---
  const handleStatusUpdate = (appId: number, newStatus: Application['status']) => {
    setAppsData(currentApps =>
      currentApps.map(app =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
  };

  // --- DERIVED STATE & FILTERING ---
  const filteredApps = appsData.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalApps = appsData.length;
  const pendingApps = appsData.filter(app => app.status === 'pending').length;
  const approvedApps = appsData.filter(app => app.status === 'approved').length;

  return (
    <div className={`${theme} theme-transition`}>
        <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden p-4 md:p-6">
        {/* Background Blobs */}
        <div className="absolute top-0 -left-12 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl opacity-30 animate-blob dark:opacity-20"></div>
        <div className="absolute top-0 -right-12 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000 dark:opacity-20"></div>

        <main className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                    <p className="text-muted-foreground">Review and manage all incoming applications.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Link to="/ngodash">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{totalApps}</div></CardContent>
                </Card>
                <Card className="border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{pendingApps}</div></CardContent>
                </Card>
                <Card className="border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{approvedApps}</div></CardContent>
                </Card>
            </div>

            {/* Main Applications Table Card */}
            <Card className="border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg shadow-lg">
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <CardTitle>All Applicants</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search applicants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm capitalize w-full md:w-auto">
                                    Status: {statusFilter}
                                    <ChevronDown className="ml-2 h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                                    <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="approved">Approved</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="reviewed">Reviewed</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="rejected">Rejected</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Applicant</TableHead><TableHead>Program</TableHead><TableHead>Status</TableHead><TableHead>Date Applied</TableHead><TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                        <TableRow key={app.id} className="border-slate-200/50 dark:border-slate-800/50">
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={app.avatarUrl} alt={app.name} />
                                    <AvatarFallback>{getInitials(app.name)}</AvatarFallback>
                                </Avatar>
                                <span>{app.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>{app.program}</TableCell>
                        <TableCell><StatusBadge status={app.status} /></TableCell>
                        <TableCell>{app.date}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Open menu</span><MoreHorizontal className="h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onSelect={() => handleStatusUpdate(app.id, 'reviewed')}><Eye className="mr-2 h-4 w-4" /> Mark as Reviewed</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onSelect={() => handleStatusUpdate(app.id, 'approved')} className="text-green-600 focus:text-green-600"><CheckCircle className="mr-2 h-4 w-4" /> Approve</DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleStatusUpdate(app.id, 'rejected')} className="text-red-600 focus:text-red-600"><XCircle className="mr-2 h-4 w-4" /> Reject</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            <Inbox className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            No applications match your criteria.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </CardContent>
            </Card>
        </main>
        </div>
    </div>
  );
};

export default ApplicationsPage;

