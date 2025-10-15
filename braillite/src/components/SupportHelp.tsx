import React, { useState } from 'react';
import { HelpCircle, Send, Phone, Mail, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const SupportHelp = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    subject: '',
    message: '',
  });
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);

  // Mock FAQ data
  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I enroll in a program?',
      answer: 'To enroll in a program, browse our available programs, click on "View Details" to learn more, and then click "Enroll". You will receive a confirmation email once your enrollment is processed.',
    },
    {
      id: 2,
      question: 'Can I cancel my enrollment?',
      answer: 'Yes, you can cancel your enrollment before the program starts or during the first week. Go to "My Enrollments" and click the "Cancel" button next to the program you wish to cancel.',
    },
    {
      id: 3,
      question: 'What technical requirements do I need for online programs?',
      answer: 'For online programs, you need a stable internet connection, a computer or tablet, and screen reader software if you are visually impaired. Specific requirements are listed in each program description.',
    },
    {
      id: 4,
      question: 'How do I track my progress in a program?',
      answer: 'You can track your progress by visiting "My Enrollments" in your dashboard. Active programs will show a progress bar indicating your completion percentage.',
    },
    {
      id: 5,
      question: 'Are the programs free?',
      answer: 'Most of our programs are offered free of charge by our partner NGOs. Some specialized programs may have a nominal fee, which will be clearly indicated in the program description.',
    },
    {
      id: 6,
      question: 'What if I miss a session?',
      answer: 'For online programs, recordings are usually available. For offline programs, contact the instructor or NGO directly. Make-up sessions may be available depending on the program.',
    },
    {
      id: 7,
      question: 'How do I update my profile information?',
      answer: 'Go to "Update Profile" in your dashboard sidebar. You can change your name, phone number, and address. Your email address cannot be changed as it serves as your unique identifier.',
    },
    {
      id: 8,
      question: 'Who can I contact for accessibility support?',
      answer: 'For accessibility support, you can contact our support team using the form below or call our accessibility hotline. We are committed to making all programs accessible to individuals with disabilities.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData(prev => ({
        ...prev,
        subject: '',
        message: '',
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFAQ = (id: number) => {
    setOpenFAQs(prev =>
      prev.includes(id)
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-success rounded-lg">
          <HelpCircle className="h-6 w-6 text-success-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support & Help</h1>
          <p className="text-muted-foreground">Get answers to your questions and reach out for assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <div className="space-y-6">
          <Card className="shadow-md border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-foreground">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {faqs.map((faq) => (
                  <Collapsible
                    key={faq.id}
                    open={openFAQs.includes(faq.id)}
                    onOpenChange={() => toggleFAQ(faq.id)}
                  >
                    <CollapsibleTrigger className="w-full p-4 text-left hover:bg-muted/50 transition-smooth">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground pr-4">{faq.question}</h3>
                        {openFAQs.includes(faq.id) ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Contact Info */}
          <Card className="shadow-md border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-foreground">Quick Contact</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Phone className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Accessibility Hotline</p>
                  <p className="text-sm text-muted-foreground">1-800-BRAILLE (1-800-272-4553)</p>
                  <p className="text-xs text-muted-foreground">24/7 Support Available</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent rounded-lg">
                  <Mail className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@braillite.org</p>
                  <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success rounded-lg">
                  <MessageCircle className="h-4 w-4 text-success-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Available Monday-Friday, 9 AM - 5 PM EST</p>
                  <Button variant="outline" size="sm" className="mt-2 border-border">
                    Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <Card className="shadow-md border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-foreground">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background border-border focus:border-primary transition-smooth"
                      required
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-background border-border focus:border-primary transition-smooth"
                      required
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground font-medium">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-background border-border focus:border-primary transition-smooth"
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="bg-background border-border focus:border-primary transition-smooth resize-none"
                    placeholder="Please provide details about your question or issue..."
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 bg-success hover:bg-success/90 text-success-foreground shadow-md hover:shadow-lg transition-smooth"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-success-foreground border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportHelp;