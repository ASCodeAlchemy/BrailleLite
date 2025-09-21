import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const UserLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // VERY IMPORTANT - allows browser to store cookie
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.message || "Login failed");
            }

            const data = await res.json();
            if (data.message === "Login Successful") {
                navigate("/api/users/myProfile"); // redirect to home or dashboard
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (err: any) {
            setError(err.message || "Login failed");
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
                    {/* Back to Login Selection */}
                    <Link
                        to="/login"
                        className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-smooth mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Login Options</span>
                    </Link>

                    {/* User Login Card */}
                    <Card className="shadow-hero backdrop-blur-sm bg-background/95 border-border/50 animate-fade-in-up">
                        <CardHeader className="text-center space-y-4">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <div className="braille-dots">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="braille-dot"></div>
                                    ))}
                                </div>
                                <span className="text-2xl font-bold text-primary font-[var(--font-family-display)]">
                  Brailite
                </span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 text-primary">
                                <User size={24} />
                                <span className="text-lg font-medium">User Login</span>
                            </div>
                            <CardTitle className="text-2xl font-[var(--font-family-display)]">
                                Welcome Back
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Sign in to access your accessibility tools and resources
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="pl-10 h-12"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="pl-10 pr-10 h-12"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <Button type="submit" className="w-full h-12" disabled={loading}>
                                    {loading ? "Signing in..." : "Sign In"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
