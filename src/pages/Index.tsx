
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Timeline from "@/components/Timeline";
import SearchResults from "@/components/SearchResults";
import { Button } from "@/components/ui/button";
import { Home, PenSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDecade, setCurrentDecade] = useState<string>("2020s");
  const [showTimeline, setShowTimeline] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const decadeParam = searchParams.get("decade");
    const styleParam = searchParams.get("style");
    const queryParam = searchParams.get("q");
    
    if (decadeParam && ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"].includes(decadeParam)) {
      setCurrentDecade(decadeParam);
    }
    
    if (styleParam) {
      setSearchQuery(styleParam);
    }

    if (queryParam) {
      setSearchQuery(queryParam);
      setShowTimeline(false);
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

  // Decade data for search functionality
  const decadeData = [
    {
      id: "1960s",
      name: "1960s",
      description: "The decade of revolution and freedom.",
      styles: ["Mod", "Hippie", "Space Age", "Beatnik"],
      bgColor: "bg-gradient-to-br from-vintagecream to-sunnyellow/20",
      trends: [
        {
          id: 1,
          name: "Mod Fashion",
          description: "Mod fashion embraced bold, geometric patterns, mini skirts, and go-go boots.",
          image: "https://images.unsplash.com/photo-1583895551859-95c06c12fc37?q=80&w=1476&auto=format&fit=crop",
          styles: ["Glam", "Streetwear"],
          icons: ["Twiggy", "Jean Shrimpton", "Mary Quant"],
          pieces: ["Mini skirts", "Go-go boots", "Color-block dresses", "Shift dresses"],
          popCulture: ["The Beatles", "Andy Warhol", "British Invasion music"]
        },
        {
          id: 2,
          name: "Hippie Movement",
          description: "Peace, love, and self-expression defined the hippie aesthetic with tie-dye, bell-bottoms, and flowing silhouettes.",
          image: "https://images.unsplash.com/photo-1604278003587-46d385810306?q=80&w=1374&auto=format&fit=crop",
          styles: ["Alt"],
          icons: ["Janis Joplin", "Jimi Hendrix", "Jane Birkin"],
          pieces: ["Bell bottoms", "Tie-dye shirts", "Fringe vests", "Peasant blouses", "Headbands"],
          popCulture: ["Woodstock", "Vietnam War protests", "Psychedelic rock"]
        }
      ]
    },
    {
      id: "1970s",
      name: "1970s",
      description: "The era of disco, glam rock, and bohemian styles.",
      styles: ["Disco", "Glam Rock", "Bohemian", "Punk (late 70s)"],
      bgColor: "bg-gradient-to-br from-lavender/30 to-retrored/20",
      trends: [
        {
          id: 3,
          name: "Disco Fever",
          description: "Disco fashion brought glitter, glamour, and excess to the dance floor with dramatic silhouettes and shimmering fabrics.",
          image: "https://images.unsplash.com/photo-1563219996-35abd4736d43?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRpc2NvJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
          styles: ["Disco", "Glam"],
          icons: ["Donna Summer", "Bianca Jagger", "Cher"],
          pieces: ["Sequined dresses", "Platform shoes", "Jumpsuits", "Hot pants"],
          popCulture: ["Saturday Night Fever", "Studio 54", "ABBA"]
        },
        {
          id: 4,
          name: "Boho Chic",
          description: "Bohemian fashion embraced natural fabrics, ethnic prints, and a free-spirited aesthetic inspired by global cultures.",
          image: "https://images.unsplash.com/photo-1516575334481-f85287c2c82d?q=80&w=1470&auto=format&fit=crop",
          styles: ["Alt", "Minimalist"],
          icons: ["Stevie Nicks", "Ali MacGraw", "Jane Birkin"],
          pieces: ["Maxi dresses", "Crochet tops", "Fringe", "Wide-leg pants", "Embroidered details"],
          popCulture: ["Fleetwood Mac", "The Grateful Dead", "Feminist movement"]
        }
      ]
    },
    {
      id: "1980s",
      name: "1980s",
      description: "The decade of excess and self-expression.",
      styles: ["Power Dressing", "New Wave", "Hip Hop", "Athletic"],
      bgColor: "bg-gradient-to-br from-electricblue/20 to-bubblegum/20",
      trends: [
        {
          id: 5,
          name: "Power Dressing",
          description: "Power suits with strong shoulders expressed ambition and authority, especially for women entering the workforce in unprecedented numbers.",
          image: "https://images.unsplash.com/photo-1641225694043-b3f7e0fcec95?q=80&w=1374&auto=format&fit=crop",
          styles: ["Glam", "Preppy"],
          icons: ["Princess Diana", "Joan Collins", "Grace Jones"],
          pieces: ["Shoulder pads", "Power suits", "Pencil skirts", "High-waisted pants"],
          popCulture: ["Dallas", "Working Girl", "Wall Street"]
        },
        {
          id: 6,
          name: "New Wave & Punk",
          description: "Alternative fashion scenes brought leather, studs, bright colors, and deliberately disheveled looks to the mainstream.",
          image: "https://images.unsplash.com/photo-1623912279063-a0a50231298f?q=80&w=1470&auto=format&fit=crop",
          styles: ["Alt", "Grunge"],
          icons: ["Madonna", "Boy George", "Siouxsie Sioux"],
          pieces: ["Leather jackets", "Studded accessories", "Neon colors", "Asymmetrical haircuts"],
          popCulture: ["MTV", "The Cure", "New Romantic movement"]
        }
      ]
    },
    {
      id: "1990s",
      name: "1990s",
      description: "The decade of grunge, minimalism, and hip-hop influence.",
      styles: ["Grunge", "Minimalism", "Hip Hop", "Rave"],
      bgColor: "bg-gradient-to-br from-gray-200 to-mint/20",
      trends: [
        {
          id: 7,
          name: "Grunge Revolution",
          description: "Grunge rejected fashion conventions with flannel shirts, ripped jeans, and a deliberately unkempt aesthetic.",
          image: "https://images.unsplash.com/photo-1602010503211-f8c722daa9ee?q=80&w=1470&auto=format&fit=crop",
          styles: ["Grunge", "Streetwear"],
          icons: ["Kurt Cobain", "Courtney Love", "Winona Ryder"],
          pieces: ["Flannel shirts", "Ripped jeans", "Doc Martens", "Band T-shirts", "Beanies"],
          popCulture: ["Nirvana", "My So-Called Life", "Seattle music scene"]
        },
        {
          id: 8,
          name: "Minimal Chic",
          description: "Minimalism brought clean lines, neutral colors, and understated elegance as a reaction to 80s excess.",
          image: "https://images.unsplash.com/photo-1536593998369-f0d25ed0fb1d?q=80&w=1470&auto=format&fit=crop",
          styles: ["Minimalist", "Glam"],
          icons: ["Carolyn Bessette-Kennedy", "Kate Moss", "Calvin Klein models"],
          pieces: ["Slip dresses", "Straight-leg jeans", "White T-shirts", "Black blazers"],
          popCulture: ["Friends", "Calvin Klein ads", "Supermodel era"]
        }
      ]
    },
    {
      id: "2000s",
      name: "2000s",
      description: "The Y2K era combined futuristic elements with throwbacks to earlier decades.",
      styles: ["Y2K", "Bling", "Boho", "Indie Sleaze"],
      bgColor: "bg-gradient-to-br from-bubblegum/20 to-vintagecream",
      trends: [
        {
          id: 9,
          name: "Y2K Futurism",
          description: "Y2K style embraced futuristic elements, metallic fabrics, and technology-inspired details along with playful nostalgia.",
          image: "https://images.unsplash.com/photo-1613842651082-1e7e211cbb46?q=80&w=1470&auto=format&fit=crop",
          styles: ["Glam", "Alt"],
          icons: ["Britney Spears", "Paris Hilton", "Destiny's Child"],
          pieces: ["Low-rise jeans", "Baby tees", "Rhinestone accessories", "Von Dutch hats", "Juicy Couture tracksuits"],
          popCulture: ["TRL", "Mean Girls", "Flip phones"]
        },
        {
          id: 10,
          name: "Streetwear Rise",
          description: "Streetwear gained mainstream popularity with sneaker culture, graphic tees, and urban-influenced silhouettes.",
          image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1470&auto=format&fit=crop",
          styles: ["Streetwear", "Minimalist"],
          icons: ["Pharrell Williams", "Gwen Stefani", "Kanye West"],
          pieces: ["Sneakers", "Hoodies", "Graphic tees", "Baggy jeans", "Baseball caps"],
          popCulture: ["Hip hop culture", "Skateboarding", "Streetwear brands like Supreme"]
        }
      ]
    },
    {
      id: "2010s",
      name: "2010s",
      description: "The age of social media influence.",
      styles: ["Athleisure", "Normcore", "Vintage Revival", "Instagram Aesthetic"],
      bgColor: "bg-gradient-to-br from-gray-100 to-lavender/20",
      trends: [
        {
          id: 11,
          name: "Athleisure Dominance",
          description: "Athleisure blurred the lines between workout clothes and everyday wear, prioritizing comfort without sacrificing style.",
          image: "https://images.unsplash.com/photo-1507674707963-97022885abcb?q=80&w=1470&auto=format&fit=crop",
          styles: ["Streetwear", "Minimalist"],
          icons: ["Gigi Hadid", "Kendall Jenner", "Beyoncé (Ivy Park)"],
          pieces: ["Leggings", "Sneakers", "Sports bras", "Hoodies", "Track pants"],
          popCulture: ["Instagram", "Fitness influence", "Wellness movement"]
        },
        {
          id: 12,
          name: "90s Revival",
          description: "Fashion cyclically brought back 90s aesthetics with crop tops, high-waisted jeans, and platform shoes reimagined for a new generation.",
          image: "https://images.unsplash.com/photo-1577284113135-2c212dbcfe86?q=80&w=1376&auto=format&fit=crop",
          styles: ["Grunge", "Streetwear", "Alt"],
          icons: ["Rihanna", "Bella Hadid", "A$AP Rocky"],
          pieces: ["Mom jeans", "Crop tops", "Chokers", "Scrunchies", "Platform sneakers"],
          popCulture: ["Stranger Things", "Tik Tok", "Throwback culture"]
        }
      ]
    },
    {
      id: "2020s",
      name: "2020s & Beyond",
      description: "The pandemic era and beyond.",
      styles: ["Sustainable", "Gender-Fluid", "Y2K Revival", "Digital Fashion"],
      bgColor: "bg-gradient-to-br from-mint/30 to-electricblue/20",
      trends: [
        {
          id: 13,
          name: "Sustainable Fashion",
          description: "Eco-conscious fashion prioritizes ethical production, secondhand shopping, and environmentally friendly materials.",
          image: "https://images.unsplash.com/photo-1592111332908-f8f7fe0d8666?q=80&w=1474&auto=format&fit=crop",
          styles: ["Minimalist", "Alt"],
          icons: ["Emma Watson", "Stella McCartney", "Billie Eilish"],
          pieces: ["Vintage pieces", "Organic fabrics", "Upcycled garments", "Capsule wardrobes"],
          popCulture: ["Climate activism", "Resale platforms", "Minimalism movement"]
        },
        {
          id: 14,
          name: "Y2K Resurgence",
          description: "Y2K fashion returns with a Gen Z twist, bringing back low-rise jeans, baby tees, and playful accessories.",
          image: "https://images.unsplash.com/photo-1629242214755-63d3f1ee9c6d?q=80&w=1470&auto=format&fit=crop",
          styles: ["Alt", "Glam", "Streetwear"],
          icons: ["Dua Lipa", "Olivia Rodrigo", "BTS"],
          pieces: ["Butterfly tops", "Platform sandals", "Baguette bags", "Color-tinted sunglasses"],
          popCulture: ["TikTok", "Euphoria", "Nostalgia marketing"]
        }
      ]
    }
  ];

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setSearchQuery("");
      setShowTimeline(true);
      navigate("/timeline");
      return;
    }
    
    setSearchQuery(query);
    setShowTimeline(false);
    console.log("Searching for:", query);
    
    // Update URL with search query
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("q", query);
    navigate(`/timeline?${searchParams.toString()}`);
  };

  const handleDecadeChange = (decade: string) => {
    setCurrentDecade(decade);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowTimeline(true);
    
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("q");
    navigate(`/timeline?${searchParams.toString()}`);
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
      
      {showTimeline && !searchQuery ? (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4">
            <Timeline 
              searchQuery={searchQuery} 
              onDecadeChange={handleDecadeChange} 
            />
          </div>
          <div className="md:w-1/4 px-4 pt-20">
            <Card className="bg-white/80 backdrop-blur-md">
              <CardContent className="p-4">
                <h3 className="text-lg font-display font-medium mb-3">Quick Tools</h3>
                <div className="space-y-2">
                  <Link to="/moodboard">
                    <Button variant="outline" className="w-full justify-start">
                      <PenSquare className="h-4 w-4 mr-2" />
                      Create Mood Board
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div>
          <SearchResults query={searchQuery} trends={decadeData} />
          {searchQuery && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
              <Button 
                onClick={clearSearch}
                className="shadow-lg"
              >
                Back to Timeline
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
