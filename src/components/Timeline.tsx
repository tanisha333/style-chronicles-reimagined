import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import DecadeContent, { DecadeTrend } from "./DecadeContent";
import StyleFilter, { StyleType } from "./StyleFilter";

interface TimelineProps {
  searchQuery: string;
  onDecadeChange: (decade: string) => void;
}

const decadeData = [
  {
    id: "1960s",
    name: "1960s",
    description: "The decade of revolution and freedom. Fashion broke free from the constraints of the past with bold colors, geometric patterns, and youth-driven styles.",
    styles: ["Mod", "Hippie", "Space Age", "Beatnik"],
    bgColor: "bg-gradient-to-br from-vintagecream to-sunnyellow/20",
    trends: [
      {
        id: 1,
        name: "Mod Fashion",
        description: "Mod fashion embraced bold, geometric patterns, mini skirts, and go-go boots.",
        image: "https://images.unsplash.com/photo-1583895551859-95c06c12fc37?q=80&w=1476&auto=format&fit=crop",
        styles: ["Glam", "Streetwear"] as StyleType[],
        icons: ["Twiggy", "Jean Shrimpton", "Mary Quant"],
        pieces: ["Mini skirts", "Go-go boots", "Color-block dresses", "Shift dresses"],
        popCulture: ["The Beatles", "Andy Warhol", "British Invasion music"]
      },
      {
        id: 2,
        name: "Hippie Movement",
        description: "Peace, love, and self-expression defined the hippie aesthetic with tie-dye, bell-bottoms, and flowing silhouettes.",
        image: "https://images.unsplash.com/photo-1604278003587-46d385810306?q=80&w=1374&auto=format&fit=crop",
        styles: ["Alt"] as StyleType[],
        icons: ["Janis Joplin", "Jimi Hendrix", "Jane Birkin"],
        pieces: ["Bell bottoms", "Tie-dye shirts", "Fringe vests", "Peasant blouses", "Headbands"],
        popCulture: ["Woodstock", "Vietnam War protests", "Psychedelic rock"]
      }
    ]
  },
  {
    id: "1970s",
    name: "1970s",
    description: "The era of disco, glam rock, and bohemian styles. Fashion became more expressive with platform shoes, flared pants, and bold patterns.",
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
    description: "The decade of excess and self-expression. Fashion embraced power dressing, bold colors, and statement accessories.",
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
    description: "The decade of grunge, minimalism, and hip-hop influence. Fashion became more casual and street styles gained prominence.",
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
    description: "The Y2K era combined futuristic elements with throwbacks to earlier decades. Low-rise jeans, logomania, and blingy accessories defined the time.",
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
    description: "The age of social media influence. Fashion became more diverse with athleisure, vintage revivals, and rapid trend cycles.",
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
    description: "The pandemic era and beyond. Fashion embraces sustainability, gender fluidity, and digital innovation alongside nostalgic revivals.",
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

const Timeline = ({ searchQuery, onDecadeChange }: TimelineProps) => {
  const [selectedDecade, setSelectedDecade] = useState<string>("2020s");
  const [selectedStyle, setSelectedStyle] = useState<StyleType>("All");
  const timelineRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Handle decade navigation
  const scrollToDecade = (decade: string) => {
    const element = document.getElementById(decade);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setSelectedDecade(decade);
    }
  };

  // Update parent component when selected decade changes
  useEffect(() => {
    onDecadeChange(selectedDecade);
  }, [selectedDecade, onDecadeChange]);

  // Get next/previous decades
  const currentIndex = decadeData.findIndex(decade => decade.id === selectedDecade);
  const previousDecade = currentIndex > 0 ? decadeData[currentIndex - 1].id : null;
  const nextDecade = currentIndex < decadeData.length - 1 ? decadeData[currentIndex + 1].id : null;

  // Handle navigation with buttons
  const goToNextDecade = () => nextDecade && scrollToDecade(nextDecade);
  const goToPreviousDecade = () => previousDecade && scrollToDecade(previousDecade);

  // Filter decades based on search
  const filteredDecades = searchQuery 
    ? decadeData.filter(decade => 
        decade.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        decade.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        decade.trends.some(trend => 
          trend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trend.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trend.icons.some(icon => icon.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      )
    : decadeData;

  // Handle scroll detection to update active decade
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const scrollPosition = isMobile
        ? timelineRef.current.scrollTop
        : timelineRef.current.scrollLeft;
      
      const viewportSize = isMobile
        ? window.innerHeight
        : window.innerWidth;
      
      // Find which decade is most visible
      const decadeElements = Array.from(timelineRef.current.children);
      
      for (const element of decadeElements) {
        const rect = element.getBoundingClientRect();
        const threshold = viewportSize / 2;
        
        if (isMobile && rect.top <= threshold && rect.bottom >= threshold) {
          setSelectedDecade(element.id);
          break;
        } else if (!isMobile && rect.left <= threshold && rect.right >= threshold) {
          setSelectedDecade(element.id);
          break;
        }
      }
    };
    
    const timelineElement = timelineRef.current;
    if (timelineElement) {
      timelineElement.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }
    
    return () => {
      if (timelineElement) {
        timelineElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isMobile]);

  return (
    <div className="h-screen flex flex-col relative pt-16">
      {/* Style Filter */}
      <div className="px-4 md:px-8 pt-2">
        <StyleFilter selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />
      </div>
      
      {/* Decade Navigation */}
      <div className="hidden md:flex px-8 mb-4 space-x-4 overflow-x-auto">
        {decadeData.map((decade) => (
          <Button
            key={decade.id}
            variant={selectedDecade === decade.id ? "default" : "outline"}
            className="transition-all flex-shrink-0 font-display"
            onClick={() => scrollToDecade(decade.id)}
          >
            {decade.name}
          </Button>
        ))}
      </div>
      
      {/* Mobile Decade Navigation Buttons */}
      <div className="md:hidden flex justify-between px-4 py-2">
        <Button
          variant="outline"
          onClick={goToPreviousDecade}
          disabled={!previousDecade}
          className={!previousDecade ? "opacity-50" : ""}
        >
          <ChevronUp className="h-4 w-4 mr-1" /> Previous
        </Button>
        <span className="text-lg font-display">{selectedDecade}</span>
        <Button
          variant="outline"
          onClick={goToNextDecade}
          disabled={!nextDecade}
          className={!nextDecade ? "opacity-50" : ""}
        >
          Next <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      {/* Timeline Content */}
      <div 
        ref={timelineRef}
        className={isMobile ? "snap-container" : "timeline-horizontal"}
      >
        {filteredDecades.map((decade) => (
          <div 
            key={decade.id}
            id={decade.id}
            className={isMobile ? "snap-section" : "timeline-item-horizontal"}
          >
            <DecadeContent
              decade={decade.name}
              description={decade.description}
              styles={decade.styles}
              trends={decade.trends}
              bgColor=""
              selectedStyle={selectedStyle}
            />
          </div>
        ))}
        
        {filteredDecades.length === 0 && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center p-8">
              <h3 className="text-2xl font-display text-muted-foreground mb-2">
                No results found
              </h3>
              <p>Try another search term or filter.</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation Arrows (Desktop) */}
      <div className="hidden md:block">
        {previousDecade && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 rounded-full opacity-80 hover:opacity-100"
            onClick={goToPreviousDecade}
          >
            <ChevronUp className="rotate-90" />
          </Button>
        )}
        
        {nextDecade && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 rounded-full opacity-80 hover:opacity-100"
            onClick={goToNextDecade}
          >
            <ChevronDown className="rotate-90" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timeline;
