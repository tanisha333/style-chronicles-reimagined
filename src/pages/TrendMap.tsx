
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const TrendMap = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint/20 to-lavender/30 transition-all duration-500">
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
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Global Trend Map</h1>
        <p className="text-lg text-gray-700 mb-8">
          Explore fashion subcultures and trends from around the world. Discover how regional influences
          shape global fashion movements.
        </p>

        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">Interactive World Map</h2>
            <p className="text-gray-600">Coming soon! Our interactive map will show fashion trends by region.</p>
          </div>
          
          <div className="h-80 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-center px-4">
              World map visualization will appear here.<br />
              Check back soon for our interactive fashion geography experience!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display font-semibold mb-3">European Influences</h3>
            <p className="text-gray-600 mb-4">
              From Parisian haute couture to British punk, European fashion has shaped global trends for centuries.
            </p>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              Regional showcase coming soon
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display font-semibold mb-3">Asian Street Style</h3>
            <p className="text-gray-600 mb-4">
              Explore the vibrant street fashion scenes from Tokyo, Seoul, and beyond that influence global trends.
            </p>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              Regional showcase coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendMap;
