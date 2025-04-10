
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Home, Globe, MapPin, Info } from "lucide-react";
import MapComponent from "@/components/MapComponent";

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

      <div className="container mx-auto pt-24 px-4 pb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-display font-bold">Global Trend Map</h1>
          </div>
          
          <Button 
            variant="default" 
            size="sm" 
            className="w-auto"
            onClick={() => navigate("/options")}
          >
            Explore Options
          </Button>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          Explore fashion subcultures and trends from around the world. Discover how regional influences
          shape global fashion movements. Click on the markers to learn about major fashion capitals.
        </p>

        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-semibold">Interactive Fashion Map</h2>
              <p className="text-gray-600">Explore global fashion capitals and their unique contributions</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>Click on pins to view details</span>
            </div>
          </div>
          
          <MapComponent />
          
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                This interactive map highlights major fashion capitals around the world. Each marker reveals information about the city's fashion history, dominant styles, and cultural impact. Click on a marker to learn more about that location.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display font-semibold mb-3">Regional Styles Influence</h3>
            <p className="text-gray-600 mb-4">
              Fashion is deeply connected to local culture, climate, and history. Regional styles often influence global trends, creating a rich tapestry of inspiration that designers draw from.
            </p>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              Regional style analysis coming soon
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display font-semibold mb-3">Fashion Migration Patterns</h3>
            <p className="text-gray-600 mb-4">
              Track how fashion trends migrate across continents, often transforming as they adapt to new cultural contexts and consumer preferences.
            </p>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              Trend migration visualization coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendMap;
