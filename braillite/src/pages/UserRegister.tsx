import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Home, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const UserRegister = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.email,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    name: formData.name,
                    address: formData.address,
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.message || 'Registration failed');
            }

            const data = await res.json();
            console.log('Registration success:', data);
            setSuccess('Account created successfully! Redirecting to login...');
            setFormData({ name: '', email: '', phone: '', address: '', password: '', confirmPassword: '' });

            // Redirect to login after short delay
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-overlay"></div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Link
                        to="/register"
                        className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-smooth mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Registration Options</span>
                    </Link>

                    <Card className="shadow-hero backdrop-blur-sm bg-background/95 border-border/50 animate-fade-in-up">
                        <CardHeader className="text-center space-y-4">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <div className="braille-dots">
                                    <div className="braille-dot"></div>
                                    <div className="braille-dot"></div>
                                    <div className="braille-dot"></div>
                                    <div className="braille-dot"></div>
                                    <div className="braille-dot"></div>
                                    <div className="braille-dot"></div>
                                </div>
                                <span className="text-2xl font-bold text-primary font-[var(--font-family-display)]">
                  Brailite
                </span>
                            </div>

                            <div className="flex items-center justify-center space-x-2 text-primary">
                                <User size={24} />
                                <span className="text-lg font-medium">User Registration</span>
                            </div>

                            <CardTitle className="text-2xl font-[var(--font-family-display)]">
                                Create Your Account
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Join Brailite to access our Braille conversion tools and accessibility resources
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Full Name */}
                                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input id="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleChange} className="pl-10 h-12" required />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="pl-10 h-12" required />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                                    <Label htmlFor="phone">Phone</Label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input id="phone" type="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} className="pl-10 h-12" required />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                    <Label htmlFor="address">Address</Label>
                                    <div className="relative">
                                        <Home size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input id="address" type="text" placeholder="Enter your address" value={formData.address} onChange={handleChange} className="pl-10 h-12" required />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" value={formData.password} onChange={handleChange} className="pl-10 pr-10 h-12" required />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} className="pl-10 pr-10 h-12" required />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                {success && <p className="text-green-600 text-sm">{success}</p>}

                                <Button type="submit" className="w-full h-12" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create User Account'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
