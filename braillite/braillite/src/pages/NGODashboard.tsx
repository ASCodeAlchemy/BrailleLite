"use client";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { applications } from "../data/applicationsData"; // Corrected path - This line causes an error, so we will define the data locally.
import {
  Search,
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
  User, // Added for profile icon
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Added for form
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
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

// --- FIX: Embedded applications data to resolve import error ---
export type Application = {
  id: number;
  name: string;
  avatarUrl?: string;
  program: string;
  date: string;
  status: 'pending' | 'approved' | 'reviewed' | 'rejected';
};

const applications: Application[] = [
    { id: 1, name: "Aarav Sharma", program: "Digital Literacy for Seniors", date: "2024-08-20", status: "pending" },
    { id: 2, name: "Priya Singh", program: "Youth Empowerment Initiative", date: "2024-08-18", status: "approved" },
    { id: 3, name: "Rohan Mehta", program: "Community Health Program", date: "2024-08-15", status: "reviewed" },
    { id: 4, name: "Sneha Patil", program: "Digital Literacy for Seniors", date: "2024-08-12", status: "rejected" },
    { id: 5, name: "Vikram Rathod", program: "Youth Empowerment Initiative", date: "2024-08-10", status: "pending" },
    { id: 6, name: "Anjali Gupta", program: "Community Health Program", date: "2024-08-05", status: "approved" },
];
// --- END FIX ---


const NGODashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // Defaulting to dark as in original UI
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // --- MODIFICATION: Profile State ---
  const [profile, setProfile] = useState({
      organization_name: "Brailite NGO",
      email: "contact@brailite.org",
      address: "456 Vision Road, Nashik, MH",
      contactPerson_name: "Anika Patel",
      contactPerson_Phone: "+91 91234 56789",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop", // Demo profile photo
  });
  
  // State for the form inside the modal
  const [formData, setFormData] = useState({...profile, password: ""});

  // --- MODIFICATION: Functional Logout Button ---
  const handleLogout = () => {
      alert("You have been logged out.");
      // In a real app, you'd clear auth tokens here.
      navigate("/login"); // Redirect to login page
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      // We don't update the password in the main profile state for security
      const { password, ...profileData } = formData;
      setProfile(profileData);
      console.log("Profile Updated:", profileData);
      console.log("Password would be sent securely to a server.");
      setIsProfileModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();


  const donationStats = {
    total: 125000,
    thisMonth: 15000,
    target: 200000,
    donors: 342,
  };

  const blindPeopleData = [
    { id: 1, name: "Rajesh Kumar", age: 28, location: "Mumbai", status: "Active", program: "Braille Learning", joinDate: "2023-06-15" },
    { id: 2, name: "Priya Sharma", age: 24, location: "Delhi", status: "Active", program: "Mobility Training", joinDate: "2023-07-22" },
    { id: 3, name: "Amit Singh", age: 35, location: "Bangalore", status: "Completed", program: "Technology Access", joinDate: "2023-05-10" },
    { id: 4, name: "Sunita Devi", age: 42, location: "Chennai", status: "Active", program: "Educational Support", joinDate: "2023-08-03" },
    { id: 5, name: "Vikram Joshi", age: 31, location: "Pune", status: "Active", program: "Job Training", joinDate: "2023-09-18" },
  ];

  const sidebarItems = [
    { icon: Users, label: "Dashboard", path: "/ngodash", active: true },
    { icon: FileText, label: "Applications", path: "/applications" },
    { icon: Users, label: "Beneficiaries", path: "/beneficiaries" },
    { icon: DollarSign, label: "Donations", path: "/donations" },
    { icon: Heart, label: "Programs", path: "/programs" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

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
      case "pending": return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30";
      case "approved": return "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30";
      case "reviewed": return "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30";
      case "Active": return "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30";
      case "Completed": return "bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30";
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
          <h1 className="font-bold text-lg">{profile.organization_name} Dashboard</h1>
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
          {/* --- MODIFICATION: Added Dropdown Menu to Avatar --- */}
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>{getInitials(profile.organization_name)}</AvatarFallback>
                  </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-slate-900 border dark:border-slate-700">
                   <DropdownMenuItem onClick={() => setIsProfileModalOpen(true)}>
                       <User className="mr-2 h-4 w-4" />
                       <span>Update Profile</span>
                   </DropdownMenuItem>
                   <DropdownMenuItem>
                       <Settings className="mr-2 h-4 w-4" />
                       <span>Settings</span>
                   </DropdownMenuItem>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                       <LogOut className="mr-2 h-4 w-4" />
                       <span>Logout</span>
                   </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        <main className="flex-1 p-6 space-y-6">
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
                   {/* --- MODIFICATION: Real Application Count --- */}
                   <p className="text-2xl font-bold">{applications.length}</p>
                 </div>
                 <FileText className="w-8 h-8 text-orange-500" />
               </CardContent>
             </Card>
          </div>

          <Card className="bg-white/60 dark:bg-slate-800/60 shadow-lg">
            <CardHeader><CardTitle>Recent Applications</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.slice(0, 5).map((app) => ( // Show first 5
                    <TableRow key={app.id} className="hover:bg-slate-100/40 dark:hover:bg-slate-700/40">
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.program}</TableCell>
                      <TableCell><Badge className={cn("capitalize", getStatusColor(app.status))}>{app.status}</Badge></TableCell>
                      <TableCell>{app.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Beneficiaries</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
                  </div>
                  <Button variant={statusFilter === "Active" ? "secondary" : "outline"} onClick={() => setStatusFilter(statusFilter === "Active" ? "all" : "Active")}>Active</Button>
                  <Button variant={statusFilter === "Completed" ? "secondary" : "outline"} onClick={() => setStatusFilter(statusFilter === "Completed" ? "all" : "Completed")}>Completed</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Age</TableHead><TableHead>Location</TableHead><TableHead>Status</TableHead><TableHead>Program</TableHead><TableHead>Join Date</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {filteredData.map((person) => (
                      <TableRow key={person.id} className="hover:bg-slate-100/40 dark:hover:bg-slate-700/40">
                        <TableCell>{person.name}</TableCell><TableCell>{person.age}</TableCell><TableCell>{person.location}</TableCell>
                        <TableCell><Badge className={getStatusColor(person.status)}>{person.status}</Badge></TableCell>
                        <TableCell>{person.program}</TableCell><TableCell>{person.joinDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>

        <aside className={cn("transition-all duration-300 border-l shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl", sidebarOpen ? "w-64" : "w-20")}>
          <ScrollArea className="h-full p-1">
            {sidebarItems.map((item, i) => (
              <Button key={i} variant={item.active ? "secondary" : "ghost"} className={`w-full justify-start gap-3 h-12`} onClick={() => navigate(item.path)}>
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            ))}
            <div className="mt-10 pt-4 border-t">
              <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:bg-red-500/10" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
                {sidebarOpen && "Logout"}
              </Button>
            </div>
          </ScrollArea>
        </aside>
      </div>

       {/* --- MODIFICATION: Update Profile Modal --- */}
       <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
           <DialogContent className="sm:max-w-[480px] bg-white dark:bg-slate-900">
               <DialogHeader>
                   <DialogTitle>Update Profile</DialogTitle>
                   <DialogDescription>
                       Edit your organization's profile. Click save when you're done.
                   </DialogDescription>
               </DialogHeader>
               <form onSubmit={handleProfileUpdate}>
                   <div className="grid gap-4 py-4">
                       <div className="grid grid-cols-4 items-center gap-4">
                           <Label htmlFor="organization_name" className="text-right">Org Name</Label>
                           <Input id="organization_name" value={formData.organization_name} onChange={handleInputChange} className="col-span-3" />
                       </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                           <Label htmlFor="email" className="text-right">Email</Label>
                           <Input id="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" />
                       </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                           <Label htmlFor="password" className="text-right">Password</Label>
                           <Input id="password" type="password" placeholder="Enter new password" onChange={handleInputChange} className="col-span-3" />
                       </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                           <Label htmlFor="address" className="text-right">Address</Label>
                           <Input id="address" value={formData.address} onChange={handleInputChange} className="col-span-3" />
                       </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                           <Label htmlFor="contactPerson_name" className="text-right">Contact</Label>
                           <Input id="contactPerson_name" value={formData.contactPerson_name} onChange={handleInputChange} className="col-span-3" />
                       </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                           <Label htmlFor="contactPerson_Phone" className="text-right">Phone</Label>
                           <Input id="contactPerson_Phone" value={formData.contactPerson_Phone} onChange={handleInputChange} className="col-span-3" />
                       </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                           <Label htmlFor="avatar" className="text-right">Avatar URL</Label>
                           <Input id="avatar" value={formData.avatar} onChange={handleInputChange} className="col-span-3" />
                       </div>
                   </div>
                   <DialogFooter>
                       <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                       <Button type="submit">Save Changes</Button>
                   </DialogFooter>
               </form>
           </DialogContent>
       </Dialog>
    </div>
  );
};

export default NGODashboard;