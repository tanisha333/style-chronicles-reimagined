
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// Fashion hub data
interface FashionHub {
  id: string;
  name: string;
  location: [number, number]; // [longitude, latitude]
  description: string;
  styles: string[];
  images: string[];
  facts: string[];
}

const fashionHubs: FashionHub[] = [
  {
    id: "paris",
    name: "Paris",
    location: [2.3522, 48.8566],
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
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    location: [139.6503, 35.6762],
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
    ]
  },
  {
    id: "nyc",
    name: "New York City",
    location: [-74.0060, 40.7128],
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
    ]
  },
  {
    id: "london",
    name: "London",
    location: [-0.1278, 51.5074],
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
    ]
  },
  {
    id: "milan",
    name: "Milan",
    location: [9.1900, 45.4642],
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
    ]
  }
];

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedHub, setSelectedHub] = useState<FashionHub | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem('mapbox-token'));
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize the map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [30, 15],
      pitch: 30,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for each fashion hub
    fashionHubs.forEach(hub => {
      const marker = document.createElement('div');
      marker.className = 'custom-marker';
      marker.innerHTML = `
        <div class="bg-primary text-white p-1 rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
          <span class="text-xs font-bold">F</span>
        </div>
      `;
      
      // Create a marker
      new mapboxgl.Marker(marker)
        .setLngLat(hub.location)
        .addTo(map.current!);
      
      // Add click event to marker
      marker.addEventListener('click', () => {
        setSelectedHub(hub);
        
        // Fly to the location
        map.current?.flyTo({
          center: hub.location,
          zoom: 5,
          duration: 2000
        });
      });
    });

    // Disable scroll zoom for smoother experience
    map.current.scrollZoom.disable();

    // Add atmosphere and fog effects
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });
    });

    // Cleanup on unmount
    return () => {
      map.current?.remove();
    };
  };

  // Handle mapbox token input
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById('mapbox-token') as HTMLInputElement;
    const token = input.value.trim();
    
    if (token) {
      localStorage.setItem('mapbox-token', token);
      setMapboxToken(token);
      setShowTokenInput(false);
      toast({
        title: "Token Saved",
        description: "Your Mapbox token has been saved. The map will now load.",
      });
    }
  };

  useEffect(() => {
    if (mapboxToken && !map.current) {
      initializeMap();
    }
  }, [mapboxToken]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      {showTokenInput ? (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-6 z-10">
          <h3 className="text-xl font-semibold mb-4">Mapbox Token Required</h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            To view the interactive fashion map, please enter your Mapbox public token.
            You can get one for free at <a href="https://mapbox.com/" className="text-primary underline" target="_blank" rel="noopener noreferrer">mapbox.com</a>
          </p>
          <form onSubmit={handleTokenSubmit} className="w-full max-w-md">
            <div className="flex flex-col space-y-4">
              <input 
                id="mapbox-token"
                type="text" 
                placeholder="Enter your Mapbox public token"
                className="border rounded-md p-2 w-full"
              />
              <Button type="submit">Submit Token</Button>
            </div>
          </form>
        </div>
      ) : null}
      
      <div ref={mapContainer} className="absolute inset-0" />
      
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
