import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import {
    Eye, EyeOff, ArrowLeft, Mail, Lock, User
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, loginNGO } from '../Services/authSevice';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isNGO, setIsNGO] = useState(false); // Optional toggle for NGO

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        try {
            if (isLoginMode) {
                // 🔐 Login
                const loginData = { email, password };
                const response = isNGO
                    ? await loginNGO(loginData)
                    : await loginUser(loginData);

                if (response?.message === 'Login Successful') {
                    setSuccessMessage('Logged in successfully!');
                    navigate('/dashboard'); // or wherever you want to redirect
                } else {
                    setErrorMessage(response?.message || 'Login failed.');
                }
            } else {
                // 📝 Registration (implement if needed)
                if (password !== confirmPassword) {
                    setErrorMessage('Passwords do not match.');
                    return;
                }
                // Add registration logic here...
            }
        } catch (err) {
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
            {/* ... your background and animation code ... */}

            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Link to="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>

                    <Card className="shadow-hero backdrop-blur-sm bg-background/95 border-border/50 animate-fade-in-up">
                        <CardHeader className="text-center space-y-4">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-primary font-[var(--font-family-display)]">
                  Brailite
                </span>
                            </div>
                            <CardTitle className="text-2xl">
                                {isLoginMode ? 'Welcome Back' : 'Join Brailite'}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                {isLoginMode
                                    ? 'Sign in to access your tools and resources'
                                    : 'Create an account to start converting text to Braille'}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Name */}
                                {!isLoginMode && (
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Email */}
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="relative">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-9 text-muted-foreground"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {/* Confirm Password */}
                                {!isLoginMode && (
                                    <div>
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Error/Success messages */}
                                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                                {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

                                {/* Submit Button */}
                                <Button type="submit" className="w-full h-12" disabled={loading}>
                                    {loading
                                        ? 'Please wait...'
                                        : isLoginMode
                                            ? 'Sign In'
                                            : 'Create Account'}
                                </Button>
                            </form>

                            {/* Toggle for NGO */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={isNGO}
                                        onChange={() => setIsNGO(!isNGO)}
                                    />
                                    <span className="text-muted-foreground">Login as NGO</span>
                                </label>
                            </div>

                            {/* Toggle login/register */}
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">
                                    {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
                                    <button
                                        type="button"
                                        onClick={() => setIsLoginMode(!isLoginMode)}
                                        className="ml-2 text-primary font-medium"
                                    >
                                        {isLoginMode ? 'Sign up' : 'Sign in'}
                                    </button>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
