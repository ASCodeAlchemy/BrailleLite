import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Users, BookOpen, Eye, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Program {
  id: number;
  title: string;
  ngoName: string;
  description: string;
  startDate: string;
  endDate: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  location: string;
  seatsAvailable: number;
  totalSeats: number;
  category: string;
  requirements: string[];
  duration: string;
}

const BrowsePrograms = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Mock programs data
  const programs: Program[] = [
    {
      id: 1,
      title: 'Digital Literacy for the Blind',
      ngoName: 'Vision Forward Foundation',
      description: 'Learn essential computer skills and digital navigation techniques designed specifically for visually impaired individuals.',
      startDate: '2024-03-15',
      endDate: '2024-05-15',
      mode: 'Online',
      location: 'Virtual',
      seatsAvailable: 15,
      totalSeats: 25,
      category: 'Technology',
      requirements: ['Basic computer knowledge', 'Screen reader software'],
      duration: '8 weeks',
    },
    {
      id: 2,
      title: 'Advanced Braille Reading & Writing',
      ngoName: 'Braille Learning Center',
      description: 'Master advanced Braille techniques including mathematical notation, music braille, and contracted braille.',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      mode: 'Offline',
      location: 'New York, NY',
      seatsAvailable: 8,
      totalSeats: 12,
      category: 'Education',
      requirements: ['Basic Braille knowledge', 'In-person attendance'],
      duration: '12 weeks',
    },
    {
      id: 3,
      title: 'Mobility & Navigation Training',
      ngoName: 'Independence Skills Institute',
      description: 'Comprehensive orientation and mobility training to enhance independent travel skills.',
      startDate: '2024-03-20',
      endDate: '2024-05-20',
      mode: 'Hybrid',
      location: 'Multiple Locations',
      seatsAvailable: 20,
      totalSeats: 30,
      category: 'Life Skills',
      requirements: ['Physical ability to walk', 'Commitment to practice'],
      duration: '10 weeks',
    },
    {
      id: 4,
      title: 'Audio Production & Podcasting',
      ngoName: 'Creative Voices Network',
      description: 'Learn audio editing, production techniques, and podcasting skills for creative expression.',
      startDate: '2024-04-10',
      endDate: '2024-06-10',
      mode: 'Online',
      location: 'Virtual',
      seatsAvailable: 12,
      totalSeats: 20,
      category: 'Creative Arts',
      requirements: ['Basic computer skills', 'Audio editing software'],
      duration: '8 weeks',
    },
    {
      id: 5,
      title: 'Employment Readiness Program',
      ngoName: 'Career Pathways Foundation',
      description: 'Comprehensive job preparation including resume writing, interview skills, and workplace etiquette.',
      startDate: '2024-03-25',
      endDate: '2024-05-25',
      mode: 'Hybrid',
      location: 'Chicago, IL',
      seatsAvailable: 5,
      totalSeats: 15,
      category: 'Career Development',
      requirements: ['High school diploma', 'Job search commitment'],
      duration: '6 weeks',
    },
  ];

  const categories = ['Technology', 'Education', 'Life Skills', 'Creative Arts', 'Career Development'];
  const modes = ['Online', 'Offline', 'Hybrid'];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.ngoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter;
    const matchesMode = modeFilter === 'all' || program.mode === modeFilter;
    
    return matchesSearch && matchesCategory && matchesMode;
  });

  const handleEnroll = (programId: number) => {
    toast({
      title: "Enrollment Submitted",
      description: "Your enrollment request has been submitted. You will receive a confirmation email shortly.",
    });
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'Online':
        return 'bg-primary text-primary-foreground';
      case 'Offline':
        return 'bg-accent text-accent-foreground';
      case 'Hybrid':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent rounded-lg">
          <BookOpen className="h-6 w-6 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Browse Programs</h1>
          <p className="text-muted-foreground">Discover educational programs tailored for your needs</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-md border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search programs, NGOs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border focus:border-primary transition-smooth"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-48 bg-background border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mode Filter */}
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="w-full lg:w-32 bg-background border-border">
                <SelectValue placeholder="All Modes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                {modes.map(mode => (
                  <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="shadow-md border-border bg-card hover:shadow-lg transition-smooth">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
                  {program.title}
                </CardTitle>
                <Badge className={getModeColor(program.mode)}>
                  {program.mode}
                </Badge>
              </div>
              <p className="text-sm font-medium text-primary">{program.ngoName}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {program.description}
              </p>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>{program.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span>{program.seatsAvailable} seats available</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border hover:bg-muted"
                      onClick={() => setSelectedProgram(program)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">{selectedProgram?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedProgram && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Description</h4>
                          <p className="text-muted-foreground">{selectedProgram.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">Duration</h4>
                            <p className="text-muted-foreground">{selectedProgram.duration}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">Mode</h4>
                            <Badge className={getModeColor(selectedProgram.mode)}>
                              {selectedProgram.mode}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {selectedProgram.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
                  onClick={() => handleEnroll(program.id)}
                  disabled={program.seatsAvailable === 0}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {program.seatsAvailable === 0 ? 'Full' : 'Enroll'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <Card className="shadow-md border-border bg-card">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Programs Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find more programs.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BrowsePrograms;