
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Key, LogIn } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a simplified login for demo purposes
    if (username && password) {
      // In a real app, you would validate credentials properly
      navigate("/options");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-primary mb-2 drop-shadow-md">
            Style Chronicles
          </h1>
          <p className="text-gray-600">Fashion Through The Decades</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  placeholder="Enter your username"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <LogIn className="mr-2 h-5 w-5" /> Enter The Fashion Vault
            </Button>
            
            <div className="text-center text-sm text-gray-500 mt-4">
              <p>No account? No worries!</p>
              <Button 
                variant="link" 
                className="p-0" 
                onClick={() => navigate("/options")}
              >
                Skip Login and Explore
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>This is a demo fashion timeline experience.</p>
          <p>© Style Chronicles 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
