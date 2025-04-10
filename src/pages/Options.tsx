
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Globe, BookOpen, Mail, Palette } from "lucide-react";

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
          <h2 className="text-xl font-display font-bold mb-2">Fashion Timeline</h2>
          <p className="text-gray-600 mb-4">Explore fashion decade by decade, from the 1960s to today.</p>
          <Button className="mt-auto" onClick={() => navigate("/timeline")}>
            Start Timeline
          </Button>
        </div>

        {/* Global Trend Map */}
        <div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate("/trendmap")}
        >
          <div className="h-40 bg-sunnyellow/20 rounded-lg mb-4 flex items-center justify-center">
            <Globe size={64} className="text-primary opacity-70" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Global Trend Map</h2>
          <p className="text-gray-600 mb-4">Interactive world map showing fashion subcultures by region.</p>
          <Button className="mt-auto" onClick={() => navigate("/trendmap")}>
            Explore Map
          </Button>
        </div>

        {/* Behind the Seams */}
        <div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate("/history-bytes")}
        >
          <div className="h-40 bg-mint/30 rounded-lg mb-4 flex items-center justify-center">
            <BookOpen size={64} className="text-primary opacity-70" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Behind the Seams</h2>
          <p className="text-gray-600 mb-4">Bite-sized fashion history facts and interesting trivia.</p>
          <Button className="mt-auto" onClick={() => navigate("/history-bytes")}>
            Learn Facts
          </Button>
        </div>

        {/* Trend Letter */}
        <div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate("/trendletter")}
        >
          <div className="h-40 bg-retrored/20 rounded-lg mb-4 flex items-center justify-center">
            <Mail size={64} className="text-primary opacity-70" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Trend Letter</h2>
          <p className="text-gray-600 mb-4">Subscribe to weekly style throwbacks and fashion facts.</p>
          <Button className="mt-auto" onClick={() => navigate("/trendletter")}>
            Subscribe
          </Button>
        </div>

        {/* Mood Board Builder */}
        <div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate("/moodboard")}
        >
          <div className="h-40 bg-bubblegum/20 rounded-lg mb-4 flex items-center justify-center">
            <Palette size={64} className="text-primary opacity-70" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Mood Board Builder</h2>
          <p className="text-gray-600 mb-4">Create virtual fashion mood boards with vintage pieces and textures.</p>
          <Button className="mt-auto" onClick={() => navigate("/moodboard")}>
            Create Board
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
