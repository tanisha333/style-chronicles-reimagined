
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Download, Plus, Trash2, Share2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DraggableItem {
  id: string;
  type: 'image' | 'color' | 'text';
  content: string;
  position: { x: number; y: number };
  width?: number;
  height?: number;
  rotation?: number;
}

const MoodBoard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<DraggableItem[]>([
    { id: '1', type: 'image', content: 'https://picsum.photos/id/237/200/300', position: { x: 50, y: 50 }, width: 150, height: 150, rotation: 0 },
    { id: '2', type: 'color', content: '#FDA4AF', position: { x: 250, y: 100 }, width: 100, height: 100, rotation: 0 },
    { id: '3', type: 'text', content: 'Summer Vibes', position: { x: 150, y: 300 }, width: 200, height: 50, rotation: 0 },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    setActiveId(id);
    setStartPosition({ 
      x: e.clientX, 
      y: e.clientY 
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeId) return;
    
    const dx = e.clientX - startPosition.x;
    const dy = e.clientY - startPosition.y;
    
    setItems(items.map(item => {
      if (item.id === activeId) {
        return {
          ...item,
          position: {
            x: item.position.x + dx,
            y: item.position.y + dy
          }
        };
      }
      return item;
    }));
    
    setStartPosition({ 
      x: e.clientX, 
      y: e.clientY 
    });
  };

  const handleMouseUp = () => {
    setActiveId(null);
  };

  const addItem = (type: 'image' | 'color' | 'text') => {
    const newItem: DraggableItem = {
      id: Date.now().toString(),
      type,
      content: type === 'image' 
        ? `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/300` 
        : type === 'color' 
          ? ['#FDA4AF', '#93C5FD', '#A7F3D0', '#FDE68A', '#C4B5FD'][Math.floor(Math.random() * 5)]
          : 'New Text',
      position: { x: 100, y: 100 },
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 50 : 100,
      rotation: 0
    };
    
    setItems([...items, newItem]);
    
    toast({
      title: "Item Added",
      description: `Added a new ${type} to your mood board.`,
    });
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    
    toast({
      title: "Item Removed",
      description: "Removed item from your mood board.",
    });
  };

  const saveMoodBoard = () => {
    // In a real app, this would save to a database
    toast({
      title: "Mood Board Saved",
      description: "Your mood board has been saved successfully!",
    });
  };

  const downloadMoodBoard = () => {
    // In a real app, this would generate an image for download
    toast({
      title: "Download Started",
      description: "Your mood board is being prepared for download.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bubblegum/20 to-electricblue/30 transition-all duration-500">
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

      <div className="container mx-auto pt-20 px-4 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">Virtual Mood Board</h1>
            <p className="text-lg text-gray-700 mt-2">
              Create, customize and share your fashion inspiration.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button onClick={saveMoodBoard} variant="outline" className="bg-white/80">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={downloadMoodBoard} variant="outline" className="bg-white/80">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="bg-white/80">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card className="p-4 bg-white/90 backdrop-blur-md">
              <h3 className="text-lg font-medium mb-4">Add Elements</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => addItem('image')} 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
                <Button 
                  onClick={() => addItem('color')} 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Color
                </Button>
                <Button 
                  onClick={() => addItem('text')} 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Text
                </Button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Templates</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">Vintage</Button>
                  <Button variant="ghost" className="w-full justify-start">Y2K</Button>
                  <Button variant="ghost" className="w-full justify-start">Minimalist</Button>
                  <Button variant="ghost" className="w-full justify-start">Boho</Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <div 
              ref={boardRef}
              className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg aspect-[4/3] relative overflow-hidden"
              style={{ height: '600px' }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="absolute cursor-move"
                  style={{
                    left: `${item.position.x}px`,
                    top: `${item.position.y}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    transform: `rotate(${item.rotation || 0}deg)`,
                    zIndex: activeId === item.id ? 10 : 1,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, item.id)}
                >
                  {item.type === 'image' && (
                    <img 
                      src={item.content} 
                      alt="Mood board item" 
                      className="w-full h-full object-cover rounded-md shadow-md"
                    />
                  )}
                  {item.type === 'color' && (
                    <div 
                      className="w-full h-full rounded-md shadow-md"
                      style={{ backgroundColor: item.content }}
                    />
                  )}
                  {item.type === 'text' && (
                    <div className="w-full h-full flex items-center justify-center font-display text-xl font-semibold">
                      {item.content}
                    </div>
                  )}
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodBoard;
