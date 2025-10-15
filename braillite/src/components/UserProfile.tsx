import React from 'react';
import { Mail, Phone, MapPin, Calendar, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const UserProfile = () => {
  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    joinDate: 'January 2024',
    avatar: '',
  };

  const enrollments = [
    {
      id: 1,
      programName: 'Digital Literacy for the Blind',
      ngoName: 'Vision Forward Foundation',
      status: 'Active',
      startDate: '2024-02-01',
      progress: 75,
    },
    {
      id: 2,
      programName: 'Braille Reading Fundamentals',
      ngoName: 'Braille Learning Center',
      status: 'Completed',
      startDate: '2024-01-15',
      progress: 100,
    },
    {
      id: 3,
      programName: 'Mobility & Navigation Training',
      ngoName: 'Independence Skills Institute',
      status: 'Pending',
      startDate: '2024-03-01',
      progress: 0,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'Completed':
        return <Badge className="bg-primary text-primary-foreground">Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Welcome Header */}
      <div className="bg-gradient-hero text-white rounded-xl p-6 shadow-hero">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-lg opacity-90">
          Continue your learning journey with {enrollments.filter(e => e.status === 'Active').length} active programs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <Card className="h-fit shadow-md border-border bg-card">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 border-4 border-primary shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl font-semibold text-foreground">{user.name}</CardTitle>
              <p className="text-muted-foreground">Student Member</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-foreground break-all">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-foreground">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-foreground">{user.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-foreground">Member since {user.joinDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollments */}
        <div className="lg:col-span-2">
          <Card className="shadow-md border-border bg-card">
            <CardHeader className="border-b border-border">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <CardTitle className="text-foreground">My Enrollments ({enrollments.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="p-6 hover:bg-muted/50 transition-smooth">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {enrollment.programName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {enrollment.ngoName}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Started: {new Date(enrollment.startDate).toLocaleDateString()}</span>
                          {enrollment.status === 'Active' && (
                            <span>Progress: {enrollment.progress}%</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        {getStatusBadge(enrollment.status)}
                        {enrollment.status === 'Active' && (
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${enrollment.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center shadow-md border-border bg-card hover:shadow-lg transition-smooth">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary mb-2">
              {enrollments.filter(e => e.status === 'Completed').length}
            </div>
            <p className="text-muted-foreground">Completed Programs</p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-md border-border bg-card hover:shadow-lg transition-smooth">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-accent mb-2">
              {enrollments.filter(e => e.status === 'Active').length}
            </div>
            <p className="text-muted-foreground">Active Enrollments</p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-md border-border bg-card hover:shadow-lg transition-smooth">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success mb-2">
              {Math.round(enrollments.filter(e => e.status === 'Active').reduce((acc, e) => acc + e.progress, 0) / 
               enrollments.filter(e => e.status === 'Active').length) || 0}%
            </div>
            <p className="text-muted-foreground">Average Progress</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;