
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Home, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const TrendLetter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulating subscription process
    console.log("Subscribing email:", email);
    setSubscribed(true);
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive weekly fashion insights in your inbox.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunnyellow/20 to-retrored/20 transition-all duration-500">
      <Navbar onSearch={handleSearch} />
      <div className="fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/80 backdrop-blur-md"
          onClick={() => navigate("/options")}
        >
          <Home className="h-4 w-4 mr-2" />
          Menu
        </Button>
      </div>

      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Style Chronicles Newsletter</h1>
        <p className="text-lg text-gray-700 mb-8">
          Subscribe to receive weekly style throwbacks, fashion facts, and styling tips from decades past.
        </p>

        {!subscribed ? (
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8 mb-12 max-w-lg mx-auto">
            <h2 className="text-2xl font-display font-semibold mb-6 text-center">Join Our Fashion Time Capsule</h2>
            
            <form onSubmit={handleSubscribe} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              
              <div className="flex flex-col space-y-4">
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe Now
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8 mb-12 max-w-lg mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-semibold mb-2">You're on the list!</h2>
            <p className="text-gray-600 mb-6">Thank you for subscribing to our fashion newsletter.</p>
            <Button variant="outline" onClick={() => setSubscribed(false)}>
              Manage Subscription
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display font-semibold mb-3">What You'll Receive</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                  <CheckCircle className="h-4 w-4" />
                </span>
                <span>Weekly fashion facts from different eras</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                  <CheckCircle className="h-4 w-4" />
                </span>
                <span>Spotlight on iconic trend revivals</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                  <CheckCircle className="h-4 w-4" />
                </span>
                <span>Styling tips inspired by decades past</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                  <CheckCircle className="h-4 w-4" />
                </span>
                <span>Exclusive early access to new features</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display font-semibold mb-3">Previous Editions</h3>
            <div className="space-y-3">
              <a href="#" className="block p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="font-medium text-primary">The Revival of Y2K Fashion</p>
                <p className="text-sm text-gray-600">Butterfly clips, low-rise jeans, and platform sandals</p>
              </a>
              <a href="#" className="block p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="font-medium text-primary">70s Bohemian Influence on Modern Runways</p>
                <p className="text-sm text-gray-600">How flower power and free-spirited styles are trending again</p>
              </a>
              <a href="#" className="block p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="font-medium text-primary">The Enduring Legacy of 90s Minimalism</p>
                <p className="text-sm text-gray-600">Clean lines and neutral palettes in today's fashion</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendLetter;
