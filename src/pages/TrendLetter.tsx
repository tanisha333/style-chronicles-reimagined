
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const TrendLetter = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach/20 to-mint/20 transition-all duration-500">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-2xl font-display font-bold text-primary">
            Style Chronicles
          </h1>
        </div>
      </div>
      
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
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Style Forecast</h1>
        <p className="text-lg text-gray-700 mb-8">
          Stay ahead of the trend curve with our curated seasonal newsletter
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop" 
                alt="Fashion Trend" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2 py-1">Summer 2025</span>
                <h2 className="text-2xl font-display font-semibold mt-3 mb-2">The Return of Y2K Fashion</h2>
                <p className="text-gray-600 mb-4">
                  The early 2000s aesthetic is making a major comeback, with low-rise jeans, baby tees, and butterfly clips 
                  dominating street style. This nostalgic revival is being embraced by Gen Z and reinterpreted with 
                  a modern twist.
                </p>
                <Button>Read Full Article</Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5">
              <span className="text-xs font-medium bg-pink-100 text-pink-800 rounded-full px-2 py-1">Style Watch</span>
              <h3 className="text-xl font-display font-semibold mt-2 mb-1">Dopamine Dressing Continues</h3>
              <p className="text-gray-600 text-sm">
                Bold colors and playful patterns remain popular as fashion enthusiasts seek joy through clothing.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5">
              <span className="text-xs font-medium bg-amber-100 text-amber-800 rounded-full px-2 py-1">Designer Spotlight</span>
              <h3 className="text-xl font-display font-semibold mt-2 mb-1">Sustainable Brands on the Rise</h3>
              <p className="text-gray-600 text-sm">
                Eco-conscious designers are pushing boundaries with innovative, planet-friendly materials.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5">
              <span className="text-xs font-medium bg-green-100 text-green-800 rounded-full px-2 py-1">Trend Analysis</span>
              <h3 className="text-xl font-display font-semibold mt-2 mb-1">Workwear Gets a Refresh</h3>
              <p className="text-gray-600 text-sm">
                Post-pandemic office style embraces comfort while maintaining professionalism.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-display font-semibold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Get seasonal trend forecasts, style inspiration, and exclusive content delivered straight to your inbox.
          </p>
          <div className="max-w-md">
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex items-center">
                <input id="updates" type="checkbox" className="h-4 w-4 text-primary border-gray-300 rounded" />
                <label htmlFor="updates" className="ml-2 text-sm text-gray-600">
                  I'd like to receive trend updates and style inspiration
                </label>
              </div>
              <Button className="w-full">Subscribe Now</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendLetter;
