
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Home, Send, CheckCircle, Calendar, Palette, Music, Sparkles, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

// Example color palette data
const colorPalettes = [
  {
    name: "Soft Lavender & Metallic Silver",
    colors: ["#E5DEFF", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#9370DB"],
    emoji: "🌫️✨"
  },
  {
    name: "Y2K Bubblegum",
    colors: ["#FF80AB", "#82B1FF", "#B388FF", "#8C9EFF", "#EA80FC"],
    emoji: "🫧💖"
  },
  {
    name: "90s Grunge",
    colors: ["#4A4A4A", "#8B0000", "#556B2F", "#000000", "#696969"],
    emoji: "🖤🧷"
  }
];

// Example newsletter preview data
const currentNewsletter = {
  decade: "90s Grunge",
  description: "The era of plaid, platforms, and angst. Think Nirvana meets Naomi.",
  fact: "Low-rise jeans have made a controversial comeback 3 times in the last 20 years.",
  iconicLook: "Paris Hilton's 2003 chainmail dress started a whole Y2K revival wave.",
  colorPalette: colorPalettes[2],
  outfitInspo: "https://images.unsplash.com/photo-1530041539828-114de669390e?w=800&auto=format&fit=crop",
  playlist: "Nirvana, Pearl Jam, Soundgarden, Alice in Chains"
};

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

      <div className="container mx-auto pt-24 px-4 pb-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
              <div className="bg-primary/10 p-4 border-b">
                <h3 className="text-xl font-display font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  This Week's Newsletter Preview
                </h3>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <h4 className="text-lg font-display font-medium mb-3 flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">🪩</span>
                    Decade of the Week: {currentNewsletter.decade}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1527189919029-aeb8370e45cb?w=800&auto=format&fit=crop" 
                      alt="90s Grunge" 
                      className="rounded-md w-full h-48 object-cover"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&auto=format&fit=crop" 
                      alt="90s Grunge" 
                      className="rounded-md w-full h-48 object-cover"
                    />
                  </div>
                  <p>{currentNewsletter.description}</p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-display font-medium mb-3 flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">🧠</span>
                    Trend Facts & Nuggets
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-md mb-3">
                    <div className="flex">
                      <span className="text-xl mr-2">✨</span>
                      <div>
                        <p className="font-medium">Did you know?</p>
                        <p>{currentNewsletter.fact}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex">
                      <span className="text-xl mr-2">🕶️</span>
                      <div>
                        <p className="font-medium">Iconic Look</p>
                        <p>{currentNewsletter.iconicLook}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-display font-medium mb-3 flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">🎀</span>
                    Outfit Inspiration
                  </h4>
                  <div className="rounded-md overflow-hidden mb-3">
                    <img 
                      src={currentNewsletter.outfitInspo} 
                      alt="Outfit Inspiration" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate("/moodboard")}>
                    <Palette className="h-4 w-4 mr-2" />
                    Create Your Own Moodboard
                  </Button>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-display font-medium mb-3 flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">🎨</span>
                    Color Palette of the Week: {currentNewsletter.colorPalette.name} {currentNewsletter.colorPalette.emoji}
                  </h4>
                  <div className="flex space-x-2 mb-4">
                    {currentNewsletter.colorPalette.colors.map((color, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-12 h-12 rounded-md shadow-sm" 
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-xs mt-1">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-lg font-display font-medium mb-2 flex items-center">
                    <Music className="h-4 w-4 mr-2 text-primary" />
                    Retro Vibe Playlist
                  </h4>
                  <p className="text-sm">{currentNewsletter.playlist}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                Trendspotter Picks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">Hot on Pinterest</p>
                  <p className="text-sm">Oversized vintage band tees styled with bike shorts</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">Trending on TikTok</p>
                  <p className="text-sm">DIY distressed denim with safety pin details</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-display font-semibold mb-3">What You'll Receive</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  <span>Decade of the Week spotlight</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  <span>Interesting fashion history facts</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  <span>Weekly outfit inspiration</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  <span>Curated color palettes</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  <span>Retro vibe playlists and DIY ideas</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-display font-semibold mb-3">Explore More</h3>
              <div className="space-y-3">
                <a href="/timeline" className="block p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-primary flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Search your style decade
                  </p>
                  <p className="text-sm text-gray-600">Find your favorite era in our timeline</p>
                </a>
                <a href="/moodboard" className="block p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-primary flex items-center">
                    <Palette className="h-4 w-4 mr-2" />
                    Build your moodboard
                  </p>
                  <p className="text-sm text-gray-600">Create your own fashion inspiration board</p>
                </a>
                <a href="/history-bytes" className="block p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-primary flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Discover fashion history facts
                  </p>
                  <p className="text-sm text-gray-600">Learn interesting tidbits about fashion's past</p>
                </a>
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-xl p-6">
              <h3 className="text-lg font-display font-medium mb-3">DIY Tip of the Week</h3>
              <p className="mb-2">Turn old jeans into a 90s-inspired crop set!</p>
              <ol className="list-decimal list-inside text-sm space-y-1 text-gray-700">
                <li>Cut jeans at mid-thigh for shorts</li>
                <li>Use leftover fabric to make a matching crop top</li>
                <li>Add safety pins or patches for grunge vibes</li>
                <li>Distress edges with sandpaper for authenticity</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendLetter;
