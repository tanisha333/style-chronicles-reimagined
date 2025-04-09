
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Zap, Filter, Search, Sparkles } from "lucide-react";

const Options = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-retrored/20 via-bubblegum/20 to-electricblue/30 p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-display font-bold text-primary mb-3 drop-shadow-lg">
          Style Chronicles
        </h1>
        <p className="text-xl text-gray-600">How would you like to explore fashion history?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {/* Chronological Journey */}
        <div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate("/timeline")}
        >
          <div className="h-40 bg-lavender/30 rounded-lg mb-4 flex items-center justify-center">
            <Clock size={64} className="text-primary opacity-70" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Chronological Journey</h2>
          <p className="text-gray-600 mb-4">Explore fashion decade by decade, from the 1960s to today.</p>
          <Button className="mt-auto" onClick={() => navigate("/timeline")}>
            Start Timeline
          </Button>
        </div>

        {/* Quick Jump */}
        <div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate("/timeline")}
        >
          <div className="h-40 bg-sunnyellow/20 rounded-lg mb-4 flex items-center justify-center">
            <Zap size={64} className="text-primary opacity-70" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Quick Jump</h2>
          <p className="text-gray-600 mb-4">Go directly to your favorite fashion era.</p>
          <div className="grid grid-cols-3 gap-2 mt-auto">
            {["1960s", "1970s", "1980s", "1990s", "2000s", "2010s"].map((decade) => (
              <Button 
                key={decade} 
                variant="outline" 
                className="text-xs" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/timeline?decade=${decade}`);
                }}
              >
                {decade}
              </Button>
            ))}
          </div>
        </div>

        {/* Style Explorer */}
        <div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate("/timeline")}
        >
          <div className="h-40 bg-mint/30 rounded-lg mb-4 flex items-center justify-center">
            <Filter size={64} className="text-primary opacity-70" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Style Explorer</h2>
          <p className="text-gray-600 mb-4">Browse fashion by style category rather than decade.</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {["Streetwear", "Glam", "Grunge", "Preppy", "Minimalist"].map((style) => (
              <span 
                key={style} 
                className="style-tag bg-secondary px-3 py-1 rounded-full text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/timeline?style=${style}`);
                }}
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Search Mode */}
        <div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate("/timeline")}
        >
          <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            <Search size={64} className="text-primary opacity-70" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Search Mode</h2>
          <p className="text-gray-600 mb-4">Looking for something specific? Search by keyword.</p>
          <Button className="mt-auto" onClick={() => navigate("/timeline")}>
            Go to Search
          </Button>
        </div>

        {/* Style It Like Game */}
        <div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate("/timeline")}
        >
          <div className="h-40 bg-electricblue/20 rounded-lg mb-4 flex items-center justify-center">
            <Sparkles size={64} className="text-primary opacity-70" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Style It Like Game</h2>
          <p className="text-gray-600 mb-4">Match today's trends with iconic decades.</p>
          <Button className="mt-auto" variant="outline" onClick={() => navigate("/timeline")}>
            Coming Soon!
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default Options;
