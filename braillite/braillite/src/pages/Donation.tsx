"use client";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom"; // Change this import
import { donations, Donation } from "../data/donationsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FileDown,
  DollarSign,
  Users,
  CalendarClock,
  MoreHorizontal,
  ChevronDown,
  Repeat,
  Receipt,
  Sun,
  Moon,
  ArrowLeft
} from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ChartOptions } from "chart.js";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuItem } from "@/components/ui/dropdown-menu";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// Theme-aware Status Badge Component
const StatusBadge = ({ status }: { status: Donation["status"] }) => {
    switch (status) {
        case "Completed": return <Badge variant="outline" className="text-green-600 border-green-500/50 bg-green-500/10 dark:text-green-400 dark:border-green-400/50 dark:bg-green-950">Completed</Badge>;
        case "Pending": return <Badge variant="outline" className="text-amber-600 border-amber-500/50 bg-amber-500/10 dark:text-amber-400 dark:border-amber-400/50 dark:bg-amber-950">Pending</Badge>;
        case "Failed": return <Badge variant="outline" className="text-red-600 border-red-500/50 bg-red-500/10 dark:text-red-400 dark:border-red-400/50 dark:bg-red-950">Failed</Badge>;
        case "Refunded": return <Badge variant="outline" className="text-slate-600 border-slate-500/50 bg-slate-500/10 dark:text-slate-400 dark:border-slate-400/50 dark:bg-slate-800">Refunded</Badge>;
        default: return <Badge variant="secondary">{status}</Badge>;
    }
};

const DonationsPage = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<Donation["status"] | "All">("All");
  const [dateRange, setDateRange] = useState<string>("all");

  const donationsByDate = useMemo(() => {
    if (dateRange === "all") return donations;
    const now = new Date();
    const daysToSubtract = parseInt(dateRange.replace('d', ''));
    const startDate = new Date(new Date().setDate(now.getDate() - daysToSubtract));
    return donations.filter(d => new Date(d.date) >= startDate);
  }, [dateRange]);

  const filteredDonations = useMemo(() => {
    return donationsByDate.filter((donation) => {
      const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All" || donation.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [donationsByDate, searchTerm, filterStatus]);

  const totalDonations = donationsByDate.reduce((sum, d) => sum + d.amount, 0);
  const totalDonors = new Set(donationsByDate.map(d => d.donorName)).size;

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: theme === 'dark' ? '#94a3b8' : '#475569' } },
    },
    scales: {
        x: { ticks: { color: theme === 'dark' ? '#94a3b8' : '#475569' }, grid: { color: theme === 'dark' ? '#334155' : '#e2e8f0' } },
        y: { ticks: { color: theme === 'dark' ? '#94a3b8' : '#475569' }, grid: { color: theme === 'dark' ? '#334155' : '#e2e8f0' } },
    },
  };
  
  const donationTrendData = {
    labels: donationsByDate.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })).slice(-10),
    datasets: [{
      label: "Donation Amount", data: donationsByDate.map(d => d.amount).slice(-10),
      backgroundColor: theme === 'dark' ? "rgba(34,197,94,0.2)" : "rgba(34,197,94,0.1)",
      borderColor: "rgba(34,197,94,1)", borderWidth: 2, tension: 0.3, fill: true,
    }],
  };

  const donorDistributionData = {
    labels: Array.from(new Set(donationsByDate.map(d => d.campaign))),
    datasets: [{
      label: "Amount per Campaign",
      data: Array.from(new Set(donationsByDate.map(d => d.campaign))).map( c => donationsByDate.filter(d => d.campaign === c).reduce((sum, d) => sum + d.amount, 0)),
      backgroundColor: ["#38bdf8", "#facc15", "#4ade80", "#f87171", "#a78bfa"],
    }],
  };

  return (
    <div className={`${theme} theme-transition`}>
      <div className="relative min-h-screen w-full bg-background overflow-hidden">
          <div className="absolute top-0 -left-12 w-96 h-96 bg-blob-1 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-12 w-96 h-96 bg-blob-2 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blob-3 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          <main className="relative z-10 p-4 md:p-6 space-y-6 text-foreground">
              <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold tracking-tight">Donations Dashboard</h1>
                  <div className="flex items-center gap-2">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="w-36 justify-start">
                                  <CalendarClock className="mr-2 h-4 w-4"/>
                                  {dateRange === '7d' && 'Last 7 Days'}
                                  {dateRange === '30d' && 'Last 30 Days'}
                                  {dateRange === '90d' && 'Last 90 Days'}
                                  {dateRange === 'all' && 'All Time'}
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                              <DropdownMenuRadioGroup value={dateRange} onValueChange={setDateRange}>
                                  <DropdownMenuRadioItem value="all">All Time</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="7d">Last 7 Days</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="30d">Last 30 Days</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="90d">Last 90 Days</DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Toggle theme</span>
                      </Button>
                      <Link to="/ngodash"> {/* Change href to to */}
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                      </Link>
                  </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="card-glass">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent><div className="text-2xl font-bold">₹{totalDonations.toLocaleString()}</div></CardContent>
                  </Card>
                  <Card className="card-glass">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Unique Donors</CardTitle>
                          <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent><div className="text-2xl font-bold">{totalDonors}</div></CardContent>
                  </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <Card className="card-glass lg:col-span-3">
                      <CardHeader><CardTitle>Recent Donation Trends</CardTitle></CardHeader>
                      <CardContent className="h-[300px]"><Line data={donationTrendData} options={chartOptions as any} /></CardContent>
                  </Card>
                  <Card className="card-glass lg:col-span-2">
                      <CardHeader><CardTitle>By Campaign</CardTitle></CardHeader>
                      <CardContent className="h-[300px]"><Bar data={donorDistributionData} options={chartOptions as any} /></CardContent>
                  </Card>
              </div>

              <Card className="card-glass">
                  <CardHeader>
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                          <CardTitle>Transaction History</CardTitle>
                          <div className="flex items-center gap-2">
                              <div className="relative w-full md:w-auto">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input placeholder="Search donor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
                              </div>
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="outline" className="w-full md:w-auto">
                                          Status: {filterStatus} <ChevronDown className="ml-2 h-4 w-4"/>
                                      </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                      <DropdownMenuRadioGroup value={filterStatus} onValueChange={(value) => setFilterStatus(value as Donation["status"] | "All")}>
                                          <DropdownMenuRadioItem value="All">All Status</DropdownMenuRadioItem>
                                          <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
                                          <DropdownMenuRadioItem value="Pending">Pending</DropdownMenuRadioItem>
                                          <DropdownMenuRadioItem value="Failed">Failed</DropdownMenuRadioItem>
                                          <DropdownMenuRadioItem value="Refunded">Refunded</DropdownMenuRadioItem>
                                      </DropdownMenuRadioGroup>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                              <Button><FileDown className="mr-2 h-4 w-4" /> Export</Button>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Donor</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Campaign</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {filteredDonations.map((d) => (
                                  <TableRow key={d.id}>
                                      <TableCell className="font-medium">{d.donorName}</TableCell>
                                      <TableCell>₹{d.amount.toLocaleString()}</TableCell>
                                      <TableCell>{d.date}</TableCell>
                                      <TableCell>{d.campaign}</TableCell>
                                      <TableCell><StatusBadge status={d.status} /></TableCell>
                                      <TableCell className="text-right">
                                          <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                              </DropdownMenuTrigger>
                                              <DropdownMenuContent align="end">
                                                  <DropdownMenuItem><Receipt className="mr-2 h-4 w-4" /> View Receipt</DropdownMenuItem>
                                                  {d.recurring && <DropdownMenuItem><Repeat className="mr-2 h-4 w-4" /> Manage Subscription</DropdownMenuItem>}
                                              </DropdownMenuContent>
                                          </DropdownMenu>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </main>
      </div>
    </div>
  );
};

export default DonationsPage;