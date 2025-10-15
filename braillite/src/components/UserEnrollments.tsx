import React, { useState } from 'react';
import { GraduationCap, Calendar, MapPin, Eye, X, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface Enrollment {
  id: number;
  programName: string;
  ngoName: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Active' | 'Completed' | 'Cancelled';
  enrollmentDate: string;
  startDate: string;
  endDate: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  location: string;
  progress: number;
  description: string;
  instructor: string;
  requirements: string[];
}

const UserEnrollments = () => {
  const { toast } = useToast();
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

  // Mock enrollments data
  const enrollments: Enrollment[] = [
    {
      id: 1,
      programName: 'Digital Literacy for the Blind',
      ngoName: 'Vision Forward Foundation',
      status: 'Active',
      enrollmentDate: '2024-02-01',
      startDate: '2024-02-15',
      endDate: '2024-04-15',
      mode: 'Online',
      location: 'Virtual',
      progress: 75,
      description: 'Learn essential computer skills and digital navigation techniques designed specifically for visually impaired individuals.',
      instructor: 'Dr. Sarah Martinez',
      requirements: ['Basic computer knowledge', 'Screen reader software'],
    },
    {
      id: 2,
      programName: 'Braille Reading Fundamentals',
      ngoName: 'Braille Learning Center',
      status: 'Completed',
      enrollmentDate: '2024-01-15',
      startDate: '2024-01-20',
      endDate: '2024-03-20',
      mode: 'Offline',
      location: 'New York, NY',
      progress: 100,
      description: 'Master the fundamentals of Braille reading and writing for everyday use.',
      instructor: 'Prof. Michael Chen',
      requirements: ['No prior Braille knowledge required', 'In-person attendance'],
    },
    {
      id: 3,
      programName: 'Mobility & Navigation Training',
      ngoName: 'Independence Skills Institute',
      status: 'Pending',
      enrollmentDate: '2024-02-25',
      startDate: '2024-03-15',
      endDate: '2024-05-15',
      mode: 'Hybrid',
      location: 'Multiple Locations',
      progress: 0,
      description: 'Comprehensive orientation and mobility training to enhance independent travel skills.',
      instructor: 'Lisa Rodriguez',
      requirements: ['Physical ability to walk', 'Commitment to practice'],
    },
    {
      id: 4,
      programName: 'Audio Production Workshop',
      ngoName: 'Creative Voices Network',
      status: 'Approved',
      enrollmentDate: '2024-03-01',
      startDate: '2024-03-20',
      endDate: '2024-05-20',
      mode: 'Online',
      location: 'Virtual',
      progress: 0,
      description: 'Learn audio editing and production techniques for creative expression.',
      instructor: 'James Wilson',
      requirements: ['Basic computer skills', 'Audio editing software'],
    },
    {
      id: 5,
      programName: 'Employment Skills Training',
      ngoName: 'Career Pathways Foundation',
      status: 'Rejected',
      enrollmentDate: '2024-01-10',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      mode: 'Hybrid',
      location: 'Chicago, IL',
      progress: 0,
      description: 'Comprehensive job preparation including resume writing and interview skills.',
      instructor: 'Amanda Foster',
      requirements: ['High school diploma', 'Job search commitment'],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'Completed':
        return <Badge className="bg-primary text-primary-foreground"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-warning text-warning-foreground"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'Approved':
        return <Badge className="bg-accent text-accent-foreground"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-destructive text-destructive-foreground"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'Cancelled':
        return <Badge variant="secondary"><X className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
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

  const handleCancelEnrollment = (enrollmentId: number) => {
    toast({
      title: "Enrollment Cancelled",
      description: "Your enrollment has been successfully cancelled.",
    });
  };

  const canCancel = (status: string) => {
    return ['Pending', 'Approved', 'Active'].includes(status);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <GraduationCap className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Enrollments</h1>
          <p className="text-muted-foreground">Track your program applications and progress</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-md border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-success mb-2">
              {enrollments.filter(e => e.status === 'Active').length}
            </div>
            <p className="text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {enrollments.filter(e => e.status === 'Completed').length}
            </div>
            <p className="text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-warning mb-2">
              {enrollments.filter(e => e.status === 'Pending').length}
            </div>
            <p className="text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-accent mb-2">
              {enrollments.length}
            </div>
            <p className="text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Enrollments List */}
      <div className="space-y-4">
        {enrollments.map((enrollment) => (
          <Card key={enrollment.id} className="shadow-md border-border bg-card hover:shadow-lg transition-smooth">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {enrollment.programName}
                    </h3>
                    {getStatusBadge(enrollment.status)}
                  </div>
                  
                  <p className="text-sm text-primary font-medium mb-2">
                    by {enrollment.ngoName}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(enrollment.startDate).toLocaleDateString()} - {new Date(enrollment.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{enrollment.location}</span>
                    </div>
                    <Badge className={getModeColor(enrollment.mode)} variant="secondary">
                      {enrollment.mode}
                    </Badge>
                  </div>

                  {enrollment.status === 'Active' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-medium">{enrollment.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border hover:bg-muted"
                        onClick={() => setSelectedEnrollment(enrollment)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">{selectedEnrollment?.programName}</DialogTitle>
                      </DialogHeader>
                      {selectedEnrollment && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(selectedEnrollment.status)}
                            <Badge className={getModeColor(selectedEnrollment.mode)}>
                              {selectedEnrollment.mode}
                            </Badge>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Description</h4>
                            <p className="text-muted-foreground">{selectedEnrollment.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Instructor</h4>
                              <p className="text-muted-foreground">{selectedEnrollment.instructor}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Enrollment Date</h4>
                              <p className="text-muted-foreground">
                                {new Date(selectedEnrollment.enrollmentDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
                            <ul className="list-disc list-inside text-muted-foreground">
                              {selectedEnrollment.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {canCancel(enrollment.status) && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-card border-border">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-foreground">Cancel Enrollment</AlertDialogTitle>
                          <AlertDialogDescription className="text-muted-foreground">
                            Are you sure you want to cancel your enrollment in "{enrollment.programName}"? 
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleCancelEnrollment(enrollment.id)}
                          >
                            Confirm Cancellation
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {enrollments.length === 0 && (
        <Card className="shadow-md border-border bg-card">
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Enrollments Yet</h3>
            <p className="text-muted-foreground">
              Start your learning journey by browsing and enrolling in programs.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserEnrollments;