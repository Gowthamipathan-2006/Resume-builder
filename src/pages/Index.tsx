
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, User, Mail, Lock, Download, Edit, Star } from "lucide-react";
import ResumeBuilder from "@/components/ResumeBuilder";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [users, setUsers] = useState<{[key: string]: {username: string, email: string, password: string}}>({});
  const { toast } = useToast();

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupForm.username || !signupForm.email || !signupForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (users[signupForm.email]) {
      toast({
        title: "Error",
        description: "User already exists with this email",
        variant: "destructive"
      });
      return;
    }

    setUsers(prev => ({
      ...prev,
      [signupForm.email]: {
        username: signupForm.username,
        email: signupForm.email,
        password: signupForm.password
      }
    }));

    toast({
      title: "Success!",
      description: "Account created successfully. Please login.",
    });

    setSignupForm({ username: "", email: "", password: "" });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const user = users[loginForm.email];
    
    if (!user) {
      toast({
        title: "Error",
        description: "No account found with this email. Please create an account.",
        variant: "destructive"
      });
      return;
    }

    if (user.password !== loginForm.password) {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive"
      });
      return;
    }

    setIsAuthenticated(true);
    setCurrentUser(user.username);
    toast({
      title: "Welcome!",
      description: `Login successful. Welcome ${user.username}!`,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser("");
    setLoginForm({ email: "", password: "" });
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  if (isAuthenticated) {
    return <ResumeBuilder username={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-12 w-12 text-blue-400 mr-3" />
              <h1 className="text-4xl font-bold text-white">ResumeForge</h1>
            </div>
            <p className="text-gray-300 text-lg">Create Professional Resumes for Free</p>
            <div className="flex items-center justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-400 ml-2 text-sm">Trusted by 10,000+ users</span>
            </div>
          </div>

          {/* Auth Cards */}
          <Card className="bg-white/10 backdrop-blur-md border-gray-700 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Get Started</CardTitle>
              <CardDescription className="text-gray-300">
                Create your professional resume in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                  <TabsTrigger value="login" className="text-white data-[state=active]:bg-blue-600">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-white data-[state=active]:bg-blue-600">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-white flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-white flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-username" className="text-white flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Username
                      </Label>
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="Choose a username"
                        value={signupForm.username}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, username: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-white flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 text-center">
            <div className="grid grid-cols-3 gap-4 text-gray-300">
              <div className="flex flex-col items-center">
                <Edit className="h-6 w-6 mb-2 text-blue-400" />
                <span className="text-sm">Easy Editor</span>
              </div>
              <div className="flex flex-col items-center">
                <FileText className="h-6 w-6 mb-2 text-green-400" />
                <span className="text-sm">Pro Templates</span>
              </div>
              <div className="flex flex-col items-center">
                <Download className="h-6 w-6 mb-2 text-purple-400" />
                <span className="text-sm">Free Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
