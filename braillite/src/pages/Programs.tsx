// src/pages/Programs.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { 
    Calendar, 
    MapPin, 
    Users, 
    MoreHorizontal, 
    PlusCircle, 
    LayoutGrid, 
    List, 
    Search, 
    Inbox, 
    Sparkles, 
    Wind,
    Sun,
    Moon,
    ArrowLeft
} from "lucide-react";

// ✅ Import shared data + type
import { programs, Program } from "@/data/programsData";

// Helper for dynamic card headers
const cardVisuals = [
    { bg: 'bg-blue-100 dark:bg-blue-900/50', icon: <Sparkles className="h-8 w-8 text-blue-500" /> },
    { bg: 'bg-yellow-100 dark:bg-yellow-900/50', icon: <Wind className="h-8 w-8 text-yellow-500" /> },
    { bg: 'bg-green-100 dark:bg-green-900/50', icon: <Users className="h-8 w-8 text-green-500" /> },
    { bg: 'bg-purple-100 dark:bg-purple-900/50', icon: <MapPin className="h-8 w-8 text-purple-500" /> },
];

// Refactored Program Card for Grid View
const ProgramCard = ({ program, index }: { program: Program, index: number }) => {
    const visual = cardVisuals[index % cardVisuals.length];

    return (
        <Card className="flex flex-col rounded-xl border border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <CardHeader className="p-0">
                <div className={`flex items-center justify-center h-24 rounded-t-xl ${visual.bg}`}>
                    {visual.icon}
                </div>
                <div className="p-6 pb-2">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg mb-1">{program.title}</CardTitle>
                        <ProgramActions program={program} />
                    </div>
                    <CardDescription>
                        {getStatusBadge(program.status)}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3 px-6">
                <p className="text-sm text-muted-foreground line-clamp-2">{program.description}</p>
                <div className="flex items-center text-sm text-foreground/80">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{program.date}</span>
                </div>
                <div className="flex items-center text-sm text-foreground/80">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{program.place}</span>
                </div>
            </CardContent>
            <CardFooter className="px-6 pb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>
                        {program.volunteersRequired 
                          ? `${program.volunteersCount ?? 0} / ${program.volunteersCount}` 
                          : "No volunteers required"}
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
};

// Shared components - moved outside the main component for clarity
const getStatusBadge = (status: Program["status"]) => {
    switch (status) {
        case "draft": return <Badge variant="secondary">Draft</Badge>;
        case "ongoing": return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700">Ongoing</Badge>;
        case "upcoming": return <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200 border-sky-300 dark:bg-sky-900/50 dark:text-sky-300 dark:border-sky-700">Upcoming</Badge>;
        case "completed": return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300 dark:bg-slate-900/50 dark:text-slate-300 dark:border-slate-700">Completed</Badge>;
        default: return <Badge variant="secondary">{status}</Badge>;
    }
};

const ProgramActions = ({ program }: { program: Program }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => alert(`Editing: ${program.title}`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Posting: ${program.title}`)}>Post</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const EmptyState = () => (
    <div className="text-center py-24 rounded-xl border border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg">
        <Inbox className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-200">No Programs Found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or create a new program.</p>
    </div>
);


// Main Page Component
const ProgramsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const filteredPrograms = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${theme} theme-transition`}>
        <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-blob dark:opacity-20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:opacity-20"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000 dark:opacity-20"></div>

            <main className="relative z-10 p-4 md:p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Programs</h1>
                        <p className="text-muted-foreground">Manage and view all organizational programs.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create New Program
                        </Button>
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

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className="relative w-full md:flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by title or place..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">Filter</Button>
                        <div className="flex items-center gap-1 rounded-md bg-white/80 dark:bg-slate-900/80 p-1 backdrop-blur-sm">
                            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('list')}>
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Content Area */}
                <div>
                    {filteredPrograms.length === 0 ? <EmptyState /> : (
                    viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPrograms.map((program, index) => (
                                <ProgramCard key={program.id} program={program} index={index} />
                            ))}
                        </div>
                    ) : (
                        <Card className="rounded-xl border border-white/30 bg-white/60 dark:bg-black/40 backdrop-blur-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead><TableHead>Place</TableHead><TableHead>Date</TableHead><TableHead>Volunteers</TableHead><TableHead>Status</TableHead><TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPrograms.map((program) => (
                                        <TableRow key={program.id} className="border-slate-200/50 dark:border-slate-800/50">
                                            <TableCell className="font-medium">{program.title}</TableCell>
                                            <TableCell>{program.place}</TableCell>
                                            <TableCell>{program.date}</TableCell>
                                            <TableCell>{program.volunteersCount} / {program.volunteersRequired}</TableCell>
                                            <TableCell>{getStatusBadge(program.status)}</TableCell>
                                            <TableCell><ProgramActions program={program} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    </div>
  );
};

export default ProgramsPage;
