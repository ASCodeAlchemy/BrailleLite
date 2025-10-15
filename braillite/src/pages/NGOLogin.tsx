import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Building2, User, MapPin } from 'lucide-react';

const NGOLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [orgName, setOrgName] = useState('');
    const [contactName, setContactName] = useState('');
    const [location, setLocation] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!isLoginMode && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const url = `http://localhost:8080/api/ngo/${isLoginMode ? 'login' : 'register'}`;

            const body = isLoginMode
                ? { email, password }
                : { orgName, contactName, location, email, password };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                if (isLoginMode) {
                    navigate('/ngo/dashboard');
                } else {
                    setIsLoginMode(true);
                    setError('✅ Registration successful! Please log in.');
                    setOrgName('');
                    setContactName('');
                    setLocation('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                }
            } else {
                setError(data.message || 'Invalid credentials or server error.');
            }
        } catch (err) {
            console.error('Error while submitting form:', err);
            setError('Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        {isLoginMode ? 'NGO Login' : 'NGO Registration'}
                    </CardTitle>
                    <CardDescription>
                        {isLoginMode
                            ? 'Sign in to manage your NGO dashboard'
                            : 'Create a new NGO account'}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLoginMode && (
                            <>
                                <div>
                                    <Label className="flex items-center gap-2">
                                        <Building2 size={16} /> Organization Name
                                    </Label>
                                    <Input
                                        value={orgName}
                                        onChange={(e) => setOrgName(e.target.value)}
                                        required
                                        placeholder="Enter NGO Name"
                                    />
                                </div>
                                <div>
                                    <Label className="flex items-center gap-2">
                                        <User size={16} /> Contact Person
                                    </Label>
                                    <Input
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        required
                                        placeholder="Enter Contact Name"
                                    />
                                </div>
                                <div>
                                    <Label className="flex items-center gap-2">
                                        <MapPin size={16} /> Location
                                    </Label>
                                    <Input
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                        placeholder="Enter Location"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <Label className="flex items-center gap-2">
                                <Mail size={16} /> Email
                            </Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="relative">
                            <Label className="flex items-center gap-2">
                                <Lock size={16} /> Password
                            </Label>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter password"
                            />
                            <span
                                className="absolute top-9 right-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
                        </div>

                        {!isLoginMode && (
                            <div className="relative">
                                <Label>Confirm Password</Label>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Re-enter password"
                                />
                            </div>
                        )}

                        {error && (
                            <p
                                className={`text-sm text-center ${
                                    error.includes('✅') ? 'text-green-600' : 'text-red-500'
                                }`}
                            >
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : isLoginMode ? 'Login' : 'Register'}
                        </Button>
                    </form>

                    <p className="text-sm text-center mt-3">
                        {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <span
                            onClick={() => setIsLoginMode(!isLoginMode)}
                            className="text-blue-600 font-semibold cursor-pointer"
                        >
              {isLoginMode ? 'Register here' : 'Login here'}
            </span>
                    </p>

                    <Link
                        to="/"
                        className="flex items-center justify-center mt-4 text-blue-500 text-sm hover:underline"
                    >
                        <ArrowLeft size={16} className="mr-1" /> Back to Home
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default NGOLogin;
