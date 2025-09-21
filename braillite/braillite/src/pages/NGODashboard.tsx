import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
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
} from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";

const NGODashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Mock data
    const donationStats = {
        total: 125000,
        thisMonth: 15000,
        target: 200000,
        donors: 342,
    };

    const applications = [
        {
            id: 1,
            name: "Rajesh Kumar",
            type: "Braille Learning",
            status: "pending",
            date: "2024-01-15",
            priority: "high",
        },
        {
            id: 2,
            name: "Priya Sharma",
            type: "Mobility Training",
            status: "approved",
            date: "2024-01-14",
            priority: "medium",
        },
        {
            id: 3,
            name: "Amit Singh",
            type: "Technology Access",
            status: "pending",
            date: "2024-01-13",
            priority: "high",
        },
        {
            id: 4,
            name: "Sunita Devi",
            type: "Educational Support",
            status: "reviewed",
            date: "2024-01-12",
            priority: "low",
        },
    ];

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

    const sidebarItems = [
        { icon: Users, label: "Dashboard", active: true },
        { icon: FileText, label: "Applications" },
        { icon: Users, label: "Beneficiaries" },
        { icon: DollarSign, label: "Donations" },
        { icon: Heart, label: "Programs" },
        { icon: Settings, label: "Settings" },
    ];

    const filteredData = blindPeopleData.filter(
        (person) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.program.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                return "bg-blue-500/20 text-blue-700 border-blue-500/30";
            default:
                return "bg-gray-500/20 text-gray-700 border-gray-500/30";
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:8080/api/logout", {
                method: "POST",
                credentials: "include",
            });
            toast({
                title: "Logout Successful",
                description: "You have been logged out securely.",
            });
            setTimeout(() => navigate("/login/ngo"), 1000); // Redirect to NGO Login Page
        } catch (err) {
            console.error("Logout failed:", err);
            toast({
                title: "Logout Failed",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ${
                    sidebarOpen ? "w-64" : "w-16"
                }`}
            >
                <div className="h-full bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl">
                    <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                                <Heart className="w-4 h-4 text-white" />
                            </div>
                            {sidebarOpen && (
                                <div>
                                    <h2 className="font-bold text-foreground">Brailite NGO</h2>
                                    <p className="text-xs text-muted-foreground">Admin Panel</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <ScrollArea className="h-[calc(100vh-80px)]">
                        <div className="p-4 space-y-2">
                            {sidebarItems.map((item, index) => (
                                <Button
                                    key={index}
                                    variant={item.active ? "secondary" : "ghost"}
                                    className={`w-full justify-start gap-3 h-12 ${
                                        item.active
                                            ? "bg-primary/20 text-primary border border-primary/30"
                                            : "hover:bg-white/10"
                                    } transition-all duration-200`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {sidebarOpen && <span>{item.label}</span>}
                                </Button>
                            ))}

                            <div className="pt-8 mt-8 border-t border-white/10">
                                <Button
                                    variant="ghost"
                                    onClick={handleLogout}
                                    className="w-full justify-start gap-3 h-12 hover:bg-red-500/10 hover:text-red-600 transition-all duration-200"
                                >
                                    <LogOut className="w-5 h-5" />
                                    {sidebarOpen && <span>Logout</span>}
                                </Button>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ${
                    sidebarOpen ? "ml-64" : "ml-16"
                }`}
            >
                {/* Header */}
                <header className="h-16 bg-white/10 backdrop-blur-xl border-b border-white/20 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hover:bg-white/10"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="hover:bg-white/10">
                            <Bell className="w-5 h-5" />
                        </Button>
                        <Avatar className="border-2 border-primary/30">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-primary/20 text-primary">
                                RI
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm">
                                            Total Donations
                                        </p>
                                        <p className="text-2xl font-bold text-foreground">
                                            ₹{donationStats.total.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-500/20 rounded-full">
                                        <DollarSign className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm">This Month</p>
                                        <p className="text-2xl font-bold text-foreground">
                                            ₹{donationStats.thisMonth.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-500/20 rounded-full">
                                        <Heart className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Total Donors</p>
                                        <p className="text-2xl font-bold text-foreground">
                                            {donationStats.donors}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-purple-500/20 rounded-full">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-sm">
                                            Applications
                                        </p>
                                        <p className="text-2xl font-bold text-foreground">
                                            {applications.length}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-orange-500/20 rounded-full">
                                        <FileText className="w-6 h-6 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Applications Table */}
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-foreground">
                                Recent Applications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/10">
                                        <TableHead className="text-muted-foreground">Name</TableHead>
                                        <TableHead className="text-muted-foreground">Type</TableHead>
                                        <TableHead className="text-muted-foreground">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-muted-foreground">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {applications.map((app) => (
                                        <TableRow
                                            key={app.id}
                                            className="border-white/10 hover:bg-white/5"
                                        >
                                            <TableCell className="text-foreground">
                                                {app.name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {app.type}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(app.status)}>
                                                    {app.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {app.date}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Blind People Data Table */}
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <CardTitle className="text-foreground">
                                    Beneficiaries Data
                                </CardTitle>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <div className="relative flex-1 sm:w-80">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search beneficiaries..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 bg-white/10 border-white/20 backdrop-blur-xl"
                                        />
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="bg-white/10 border-white/20 hover:bg-white/20"
                                    >
                                        <Filter className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/10">
                                        <TableHead className="text-muted-foreground">Name</TableHead>
                                        <TableHead className="text-muted-foreground">Age</TableHead>
                                        <TableHead className="text-muted-foreground">
                                            Location
                                        </TableHead>
                                        <TableHead className="text-muted-foreground">
                                            Program
                                        </TableHead>
                                        <TableHead className="text-muted-foreground">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-muted-foreground">
                                            Join Date
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.map((person) => (
                                        <TableRow
                                            key={person.id}
                                            className="border-white/10 hover:bg-white/5"
                                        >
                                            <TableCell className="text-foreground font-medium">
                                                {person.name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {person.age}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {person.location}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {person.program}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(person.status)}>
                                                    {person.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {person.joinDate}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NGODashboard;
