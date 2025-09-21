import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Donate = () => {
    const navigate = useNavigate();

    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const donationAmount = selectedAmount ? selectedAmount : customAmount ? Number(customAmount) : 0;

    const benefits = [
        'Free Braille conversion for all users',
        'Educational resources for the visually impaired',
        'Support for NGOs and accessibility organizations',
        'Research and development of new tools',
        'Community building and awareness programs',
        'Technical support and maintenance',
        'Quarterly impact reports',
    ];

    const handleDonate = async () => {
        if (!fullName || !email || !phone || !donationAmount) {
            alert('Please fill all fields and enter donation amount.');
            return;
        }

        setLoading(true);

        try {
            // Step 1: Save donor
            const donorDTO = { fullName, email, phone, amount: donationAmount };
            const saveResponse = await axios.post(
                'http://localhost:8080/api/donor/save',
                donorDTO
            );
            const donorId = saveResponse.data.id;

            // Step 2: Create Stripe checkout session
            const sessionResponse = await axios.post(
                `http://localhost:8080/api/payment/create-checkout-session/${donorId}`
            );

            const sessionUrl = sessionResponse.data.url;
            if (sessionUrl) {
                // Redirect to Stripe checkout with frontend success page
                window.location.href = sessionUrl.replace(
                    '{CHECKOUT_SESSION_ID}',
                    sessionResponse.data.id
                );
            } else {
                alert('Failed to create checkout session.');
            }
        } catch (error) {
            console.error('Donation error:', error);
            alert('Donation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
            <div className="relative z-10 min-h-screen py-12">
                <div className="container mx-auto px-4">
                    {/* Back to Home */}
                    <Link
                        to="/"
                        className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-smooth mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-white mb-4">
                            Help Us Bridge the <span className="text-primary">Accessibility Gap</span>
                        </h1>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto">
                            Your donation helps us provide free Braille conversion tools, educational resources,
                            and support to visually impaired individuals and organizations worldwide.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                        {/* Donation Form */}
                        <Card className="shadow-hero backdrop-blur-sm bg-background/95 border-border/50">
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl font-[var(--font-family-display)] mb-2">
                                    Make a Donation
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    Choose an amount that feels right for you
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Donor Info */}
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-white/10 text-black"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-white/10 text-black"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-white/10 text-black"
                                />

                                {/* Custom Amount */}
                                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">
                    Rs.
                  </span>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Enter amount"
                                        value={customAmount}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value);
                                            setSelectedAmount(null);
                                        }}
                                        className="w-full pl-8 pr-4 py-3 border border-border rounded-lg bg-white/10 text-black"
                                    />
                                </div>

                                {/* Donate Button */}
                                <Button
                                    className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-spring"
                                    disabled={loading || !donationAmount || !fullName || !email || !phone}
                                    onClick={handleDonate}
                                >
                                    <Heart size={20} className="mr-2" />
                                    {loading ? 'Processing...' : `Donate Rs. ${donationAmount}`}
                                </Button>

                                <div className="text-center text-sm text-muted-foreground">
                                    🔒 Secure payment powered by Stripe
                                </div>
                            </CardContent>
                        </Card>

                        {/* Impact & Benefits */}
                        <div className="space-y-8">
                            <Card className="shadow-hero backdrop-blur-sm bg-background/95 border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-[var(--font-family-display)]">
                                        Your Impact
                                    </CardTitle>
                                    <CardDescription>
                                        See how your donation makes a difference
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;
