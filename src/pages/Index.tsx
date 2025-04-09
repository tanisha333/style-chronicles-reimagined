
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDecade, setCurrentDecade] = useState<string>("2020s");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const decadeParam = searchParams.get("decade");
    const styleParam = searchParams.get("style");
    
    if (decadeParam && ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"].includes(decadeParam)) {
      setCurrentDecade(decadeParam);
    }
    
    if (styleParam) {
      setSearchQuery(styleParam);
    }
  }, [location]);
  
  // Map decades to background classes
  const decadeBackgrounds: Record<string, string> = {
    "1960s": "bg-gradient-to-br from-vintagecream to-sunnyellow/20",
    "1970s": "bg-gradient-to-br from-lavender/30 to-retrored/20",
    "1980s": "bg-gradient-to-br from-electricblue/20 to-bubblegum/20",
    "1990s": "bg-gradient-to-br from-gray-200 to-mint/20",
    "2000s": "bg-gradient-to-br from-bubblegum/20 to-vintagecream",
    "2010s": "bg-gradient-to-br from-gray-100 to-lavender/20",
    "2020s": "bg-gradient-to-br from-mint/30 to-electricblue/20",
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleDecadeChange = (decade: string) => {
    setCurrentDecade(decade);
  };

  // Apply background to the body element
  useEffect(() => {
    const bodyClasses = document.body.classList;
    
    // Clear any previous decade backgrounds
    Object.values(decadeBackgrounds).forEach(bgClass => {
      const classes = bgClass.split(" ");
      classes.forEach(cls => bodyClasses.remove(cls));
    });
    
    // Add current decade background
    const newClasses = decadeBackgrounds[currentDecade]?.split(" ") || [];
    newClasses.forEach(cls => bodyClasses.add(cls));
    
    return () => {
      // Cleanup on unmount
      newClasses.forEach(cls => bodyClasses.remove(cls));
    };
  }, [currentDecade]);

  return (
    <div className="min-h-screen transition-all duration-500">
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
      <Timeline 
        searchQuery={searchQuery} 
        onDecadeChange={handleDecadeChange} 
      />
    </div>
  );
};

export default Index;
