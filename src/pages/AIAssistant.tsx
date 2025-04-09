
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Send, User, Bot, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your fashion history assistant. Ask me about any fashion era, trend, or designer from the past.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (input.toLowerCase().includes('90s')) {
        response = "The 1990s were defined by grunge fashion, minimalism, and hip-hop influences. Key items included flannel shirts, slip dresses, platform shoes, and baggy jeans. Icons like Kate Moss and Kurt Cobain shaped the aesthetic of this era.";
      } else if (input.toLowerCase().includes('80s')) {
        response = "The 1980s were all about excess: bold colors, oversized silhouettes, and statement accessories. Think power suits with padded shoulders, leg warmers, and neon everything. Madonna and Michael Jackson were major style influencers.";
      } else if (input.toLowerCase().includes('70s')) {
        response = "The 1970s saw the rise of disco fashion alongside bohemian styles. Bell-bottoms, platform shoes, psychedelic prints, and fringe were everywhere. Fashion icons included Farrah Fawcett, Bianca Jagger, and Cher.";
      } else if (input.toLowerCase().includes('designer') || input.toLowerCase().includes('chanel')) {
        response = "Coco Chanel revolutionized women's fashion in the early 20th century with her practical designs and the iconic 'little black dress.' The Chanel suit with its collarless jacket and fitted skirt became a symbol of elegance that transcends time.";
      } else {
        response = "That's an interesting fashion question! Fashion history is deeply connected to social, political, and economic factors of its time. Each era's distinct style reflects the values and aspirations of society during that period.";
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      toast({
        title: "New response",
        description: "The AI has answered your question about fashion history.",
      });
    }, 1500);
  };

  // Scroll to bottom when messages change
  useState(() => {
    scrollToBottom();
  });

  const suggestedQuestions = [
    "Tell me about 90s grunge fashion",
    "How did Coco Chanel influence modern fashion?",
    "What were the defining styles of the 1970s?",
    "How did hip-hop culture impact fashion?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender/20 to-mint/20 transition-all duration-500">
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Fashion History AI</h1>
            <p className="text-lg text-gray-700">
              Your personal guide to fashion through the ages
            </p>
          </div>
          
          <Card className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
            <div className="h-[600px] flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`rounded-full p-2 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'} mr-2`}>
                          {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`rounded-xl p-3 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                          <p>{msg.text}</p>
                          <p className="text-xs opacity-70 mt-1 flex items-center">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start max-w-[80%]">
                        <div className="rounded-full p-2 bg-secondary mr-2">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="rounded-xl p-3 bg-secondary">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                {messages.length === 1 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Try asking about:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setInput(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSend} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about fashion history..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </Card>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="flex items-center justify-center">
              <Sparkles className="h-4 w-4 mr-1 text-primary" />
              This is a simulated AI experience for demonstration purposes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
