"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  Inbox,
  ChevronDown,
  FileText,
  Sun,
  Moon,
  ArrowLeft,
  GraduationCap,
  UserCheck
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
export type Beneficiary = {
  id: number;
  name: string;
  avatarUrl: string;
  program: string;
  joinDate: string;
  status: "active" | "inactive" | "graduated";
};

// Mock data relevant to Nashik, Maharashtra
const initialBeneficiaries: Beneficiary[] = [
    { id: 1, name: "Suresh Patil", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=SP", program: "Youth Empowerment Initiative", joinDate: "2024-03-15", status: "active" },
    { id: 2, name: "Anjali Deshmukh", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=AD", program: "Community Health Program", joinDate: "2023-11-20", status: "active" },
    { id: 3, name: "Vikram Gaikwad", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=VG", program: "Digital Literacy for Seniors", joinDate: "2023-01-10", status: "graduated" },
    { id: 4, name: "Meena Jadhav", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=MJ", program: "Youth Empowerment Initiative", joinDate: "2024-05-01", status: "inactive" },
    { id: 5, name: "Rajesh Pawar", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=RP", program: "Community Health Program", joinDate: "2024-08-18", status: "active" },
    { id: 6, name: "Pooja Shinde", avatarUrl: "https://placehold.co/40x40/E2E8F0/475569?text=PS", program: "Digital Literacy for Seniors", joinDate: "2023-06-22", status: "graduated" },
];


// Helper to get initials from a name
const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Status Badge Component
const StatusBadge = ({ status }: { status: Beneficiary['status'] }) => {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="text-green-600 border-green-400 bg-green-50 dark:bg-green-950 dark:text-green-400">Active</Badge>;
    case "inactive":
      return <Badge variant="outline" className="text-slate-600 border-slate-400 bg-slate-50 dark:bg-slate-950 dark:text-slate-400">Inactive</Badge>;
    case "graduated":
      return <Badge variant="outline" className="text-blue-600 border-blue-400 bg-blue-50 dark:bg-blue-950 dark:text-blue-400">Graduated</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

// --- MODAL COMPONENT FOR UPDATING STATUS ---
const UpdateStatusModal = ({ beneficiary, onSave, onCancel }: { beneficiary: Beneficiary, onSave: (id: number, newStatus: Beneficiary['status']) => void, onCancel: () => void }) => {
    const [newStatus, setNewStatus] = useState<Beneficiary['status']>(beneficiary.status);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
            <Card className="w-full max-w-md border-white/30 bg-white/60 dark:bg-black/40">
                <CardHeader>
                    <CardTitle>Update Status for {beneficiary.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Select the new status for this beneficiary.</p>
                    <div className="flex justify-around p-2 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                        {(["active", "inactive", "graduated"] as const).map((status) => (
                            <label key={status} className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-colors ${newStatus === status ? 'bg-blue-500 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                <input
                                    type="radio"
                                    name="status"
                                    value={status}
                                    checked={newStatus === status}
                                    onChange={() => setNewStatus(status)}
                                    className="sr-only"
                                />
                                <span className="capitalize">{status}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={onCancel}>Cancel</Button>
                        <Button onClick={() => onSave(beneficiary.id, newStatus)}>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


const BeneficiariesPage = () => {
  // --- STATE MANAGEMENT ---
  const [beneficiaryData, setBeneficiaryData] = useState<Beneficiary[]>(initialBeneficiaries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

  // --- ACTION HANDLERS ---
  const handleRemoveBeneficiary = (id: number) => {
    setBeneficiaryData(currentData => currentData.filter(b => b.id !== id));
  };

  const handleViewProfile = (beneficiary: Beneficiary) => {
    alert(`Viewing Profile:\n\nID: ${beneficiary.id}\nName: ${beneficiary.name}\nProgram: ${beneficiary.program}\nJoined: ${beneficiary.joinDate}\nStatus: ${beneficiary.status}`);
  };

  const handleOpenUpdateModal = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setIsModalOpen(true);
  };
  
  const handleUpdateStatus = (id: number, newStatus: Beneficiary['status']) => {
    setBeneficiaryData(currentData =>
      currentData.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );
    setIsModalOpen(false);
    setSelectedBeneficiary(null);
  };


  // --- DERIVED STATE & FILTERING ---
  const filteredBeneficiaries = beneficiaryData.filter((beneficiary) => {
    const matchesSearch =
      beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : beneficiary.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBeneficiaries = beneficiaryData.length;
  const activeBeneficiaries = beneficiaryData.filter(b => b.status === 'active').length;
  const graduatedBeneficiaries = beneficiaryData.filter(b => b.status === 'graduated').length;

  return (
    <div className={`${theme} theme-transition`}>
        <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden p-4 md:p-6">
        {/* Background Blobs */}
        <div className="absolute top-0 -left-12 w-96 h-96 bg-green-200 rounded-full filter blur-3xl opacity-30 animate-blob dark:opacity-20"></div>
        <div className="absolute top-0 -right-12 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000 dark:opacity-20"></div>

        <main className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Beneficiary Management</h1>
                    <p className="text-muted-foreground">View and manage program beneficiaries.</p>
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
                        <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{totalBeneficiaries}</div></CardContent>
                </Card>
                <Card className="border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{activeBeneficiaries}</div></CardContent>
                </Card>
                <Card className="border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Graduated</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{graduatedBeneficiaries}</div></CardContent>
                </Card>
            </div>

            {/* Main Beneficiaries Table Card */}
            <Card className="border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg shadow-lg">
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <CardTitle>All Beneficiaries</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or program..."
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
                                    <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="inactive">Inactive</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="graduated">Graduated</DropdownMenuRadioItem>
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
                    <TableHead>Name</TableHead><TableHead>Program Enrolled</TableHead><TableHead>Status</TableHead><TableHead>Join Date</TableHead><TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredBeneficiaries.length > 0 ? (
                    filteredBeneficiaries.map((beneficiary) => (
                        <TableRow key={beneficiary.id} className="border-slate-200/50 dark:border-slate-800/50">
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={beneficiary.avatarUrl} alt={beneficiary.name} />
                                    <AvatarFallback>{getInitials(beneficiary.name)}</AvatarFallback>
                                </Avatar>
                                <span>{beneficiary.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>{beneficiary.program}</TableCell>
                        <TableCell><StatusBadge status={beneficiary.status} /></TableCell>
                        <TableCell>{beneficiary.joinDate}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Open menu</span><MoreHorizontal className="h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onSelect={() => handleViewProfile(beneficiary)}><Eye className="mr-2 h-4 w-4" /> View Profile</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onSelect={() => handleOpenUpdateModal(beneficiary)} className="text-blue-600 focus:text-blue-600"><CheckCircle className="mr-2 h-4 w-4" /> Update Status</DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleRemoveBeneficiary(beneficiary.id)} className="text-red-600 focus:text-red-600"><XCircle className="mr-2 h-4 w-4" /> Remove</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            <Inbox className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            No beneficiaries match your criteria.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </CardContent>
            </Card>
        </main>
        {isModalOpen && selectedBeneficiary && (
            <UpdateStatusModal
                beneficiary={selectedBeneficiary}
                onSave={handleUpdateStatus}
                onCancel={() => {
                    setIsModalOpen(false);
                    setSelectedBeneficiary(null);
                }}
            />
        )}
        </div>
    </div>
  );
};

export default BeneficiariesPage;