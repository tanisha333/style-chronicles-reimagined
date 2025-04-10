
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Fashion hub data
interface FashionHub {
  id: string;
  name: string;
  description: string;
  styles: string[];
  images: string[];
  facts: string[];
  coordinates: { x: number, y: number }; // Position on the image map
}

const fashionHubs: FashionHub[] = [
  {
    id: "paris",
    name: "Paris",
    description: "The global capital of haute couture and luxury fashion.",
    styles: ["Haute Couture", "Minimalist", "Formal"],
    images: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520939817895-060bdaf4bc09?w=800&auto=format&fit=crop"
    ],
    facts: [
      "Paris Fashion Week was established in 1973 and is held twice yearly.",
      "The term 'haute couture' is protected by law in France and can only be used by fashion houses that meet specific criteria.",
      "Paris has been a fashion epicenter since the 17th century when Louis XIV promoted luxury goods."
    ],
    coordinates: { x: 48.5, y: 40.5 }
  },
  {
    id: "tokyo",
    name: "Tokyo",
    description: "The avant-garde fashion capital of Asia.",
    styles: ["Streetwear", "Harajuku", "Minimalist"],
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop"
    ],
    facts: [
      "Harajuku became famous for its street fashion in the 1990s and 2000s.",
      "Tokyo Fashion Week, now called Rakuten Fashion Week Tokyo, showcases both established and emerging designers.",
      "The 'Kogal' style that emerged in the 1990s was characterized by shortened skirts and loose socks."
    ],
    coordinates: { x: 82, y: 41 }
  },
  {
    id: "nyc",
    name: "New York City",
    description: "America's fashion capital and home to iconic streetwear.",
    styles: ["Streetwear", "Preppy", "Minimalist"],
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&auto=format&fit=crop"
    ],
    facts: [
      "New York Fashion Week was the world's first organized fashion week, established in 1943.",
      "The Met Gala, held annually at the Metropolitan Museum of Art, is one of fashion's biggest nights.",
      "New York's garment district has been a center for fashion manufacturing since the early 20th century."
    ],
    coordinates: { x: 30, y: 40.5 }
  },
  {
    id: "london",
    name: "London",
    description: "Home to experimental fashion and iconic British styles.",
    styles: ["Punk", "Preppy", "Vintage"],
    images: [
      "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&auto=format&fit=crop"
    ],
    facts: [
      "London is the birthplace of the punk movement in the 1970s, led by designer Vivienne Westwood.",
      "London Fashion Week was established in 1984.",
      "The 'Swinging London' era of the 1960s revolutionized fashion with bold new styles."
    ],
    coordinates: { x: 47, y: 37 }
  },
  {
    id: "milan",
    name: "Milan",
    description: "Italy's fashion capital known for luxury craftsmanship.",
    styles: ["Glam", "Formal", "Minimalist"],
    images: [
      "https://images.unsplash.com/photo-1512236077335-f1cda9239c11?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?w=800&auto=format&fit=crop"
    ],
    facts: [
      "Milan is home to the first luxury shopping mall, Galleria Vittorio Emanuele II, built in 1877.",
      "Milan Fashion Week was established in 1958.",
      "The 'Made in Italy' label is protected and stands for exceptional quality and craftsmanship."
    ],
    coordinates: { x: 50, y: 41.5 }
  }
];

const MapComponent: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<FashionHub | null>(null);

  return (
    <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      {/* World Map Image */}
      <div className="relative w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&auto=format&fit=crop" 
          alt="World Map" 
          className="w-full h-full object-cover brightness-105 contrast-95"
        />
        
        {/* Fashion hub markers */}
        {fashionHubs.map((hub) => (
          <button
            key={hub.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ 
              left: `${hub.coordinates.x}%`, 
              top: `${hub.coordinates.y}%` 
            }}
            onClick={() => setSelectedHub(hub)}
          >
            <div className="bg-primary text-white p-1 rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-md">
              <span className="text-xs font-bold">F</span>
            </div>
            <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {hub.name}
            </div>
          </button>
        ))}
        
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10"></div>
        <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 text-xs rounded text-gray-700">
          Interactive Fashion Map
        </div>
      </div>
      
      <Dialog open={!!selectedHub} onOpenChange={(open) => !open && setSelectedHub(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedHub && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedHub.name}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedHub.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Dominant Styles</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedHub.styles.map((style, index) => (
                    <span key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                      {style}
                    </span>
                  ))}
                </div>
                
                <h3 className="font-semibold text-lg mb-2">Fashion Facts</h3>
                <ul className="space-y-2 mb-6">
                  {selectedHub.facts.map((fact, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded-md">
                      {fact}
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-semibold text-lg mb-2">Visual Inspiration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedHub.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedHub.name} fashion`}
                      className="w-full h-64 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapComponent;
