import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight, PlayCircle } from 'lucide-react';

const BlogsPrograms = () => {
  const blogs = [
    {
      title: 'The Future of Accessible Education Technology',
      excerpt: 'Exploring how AI and machine learning are revolutionizing Braille conversion and making education more inclusive than ever before.',
      date: '2025-01-15',
      readTime: '5 min read',
    },
    {
      title: 'Student Success Stories: Breaking Barriers',
      excerpt: 'Meet Maria, a computer science student who used Brailite to excel in her programming courses and land her dream internship.',
      date: '2025-01-10',
      readTime: '8 min read',
    },
    {
      title: 'Building Inclusive Classrooms: A Teacher\'s Guide',
      excerpt: 'Practical tips and strategies for educators to create learning environments that support visually impaired students effectively.',
      date: '2025-01-05',
      readTime: '6 min read',
    },
  ];

  const programs = [
    {
      title: 'Braille Literacy Workshop',
      description: 'Training educators and volunteers in Grade 1 and Grade 2 Braille fundamentals.',
      image: '📚',
      participants: '200+ trained',
    },
    {
      title: 'Tech for Good Initiative',
      description: 'Developing innovative accessibility tools with university students and tech companies.',
      image: '💻',
      participants: '15 schools',
    },
    {
      title: 'Community Outreach Program',
      description: 'Bringing Braille resources directly to underserved communities across the region.',
      image: '🤝',
      participants: '50+ communities',
    },
    {
      title: 'Parent Support Network',
      description: 'Supporting families of visually impaired children with resources and community connections.',
      image: '👨‍👩‍👧‍👦',
      participants: '300+ families',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          
          {/* Blogs Section */}
          <div className="animate-fade-in-left">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-[var(--font-family-display)]">
                Latest Insights & Stories
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover the latest developments in accessible education and inspiring success stories from our community.
              </p>
            </div>

            <div className="space-y-6">
              {blogs.map((blog, index) => (
                <Card 
                  key={blog.title}
                  className="impact-card group cursor-pointer border-0 shadow-md hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-smooth">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-smooth" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="outline" size="lg">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Programs Section */}
          <div className="animate-fade-in-right">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-[var(--font-family-display)]">
                Impact Programs & Events
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our ongoing programs and see how we're building inclusive communities through education.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programs.map((program, index) => (
                <Card 
                  key={program.title}
                  className="impact-card group cursor-pointer border-0 shadow-md hover:shadow-lg bg-gradient-subtle"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{program.image}</div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                      {program.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="inline-flex items-center text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                      <span>{program.participants}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="cta" size="lg">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Our Impact Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsPrograms;