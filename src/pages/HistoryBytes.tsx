
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const HistoryBytes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFacts, setFilteredFacts] = useState<any[]>([]);

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  // Sample fashion history facts
  const historyFacts = [
    {
      id: 1,
      title: "The Origins of Blue Jeans",
      description: "Levi Strauss created the first blue jeans in 1873 as durable workwear for miners during the California Gold Rush.",
      category: "Iconic Pieces",
      year: "1873",
      keywords: ["jeans", "denim", "levi", "workwear", "blue jeans", "gold rush"]
    },
    {
      id: 2,
      title: "Chanel's Little Black Dress",
      description: "Coco Chanel revolutionized fashion in 1926 when she introduced the 'little black dress' as a versatile, accessible staple.",
      category: "Designer Innovations",
      year: "1926",
      keywords: ["chanel", "black dress", "coco chanel", "lbd", "little black dress"]
    },
    {
      id: 3,
      title: "High Heels Were Originally for Men",
      description: "High-heeled shoes were first worn by Persian cavalry in the 10th century, and later became popular among European male aristocrats in the 17th century.",
      category: "Surprising Origins",
      year: "10th century",
      keywords: ["heels", "high heels", "men's fashion", "shoes", "footwear", "history"]
    },
    {
      id: 4,
      title: "The Birth of the Bikini",
      description: "The modern bikini was introduced by French engineer Louis Réard in 1946, named after Bikini Atoll where atomic tests were conducted.",
      category: "Fashion Firsts",
      year: "1946",
      keywords: ["bikini", "swimwear", "beach", "louis réard", "swimsuit"]
    },
    {
      id: 5,
      title: "The Power Suit Revolution",
      description: "The power suit of the 1980s was inspired by the film 'American Gigolo' and Giorgio Armani's designs, symbolizing women's entry into executive positions.",
      category: "Fashion & Politics",
      year: "1980s",
      keywords: ["suit", "power suit", "armani", "business attire", "1980s", "women", "career"]
    },
    {
      id: 6,
      title: "Tights Were Originally Men's Wear",
      description: "Before women adopted tights, they were worn by men in the 15th-16th centuries as a symbol of nobility and masculinity.",
      category: "Surprising Origins",
      year: "15th century",
      keywords: ["tights", "hosiery", "men's fashion", "historical", "medieval"]
    },
  ];

  useEffect(() => {
    if (!searchQuery) {
      setFilteredFacts(historyFacts);
      return;
    }

    const filtered = historyFacts.filter(fact => {
      const searchText = [
        fact.title,
        fact.description,
        fact.category,
        fact.year,
        ...fact.keywords
      ].join(' ').toLowerCase();
      
      return searchText.includes(searchQuery.toLowerCase());
    });

    setFilteredFacts(filtered);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Update the URL with the search query
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set('q', query);
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunnyellow/20 to-retrored/20 transition-all duration-500">
      <Navbar onSearch={handleSearch} currentQuery={searchQuery} />
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

      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Behind the Seams</h1>
        <p className="text-lg text-gray-700 mb-8">
          Bite-sized fashion history facts that will surprise and delight you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredFacts.length > 0 ? (
            filteredFacts.map((fact) => (
              <Card key={fact.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="text-xs font-medium text-muted-foreground mb-1">{fact.category} • {fact.year}</div>
                  <CardTitle className="font-display">{fact.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{fact.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="px-0 text-primary">
                    Learn more <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No fashion facts found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                We couldn't find any fashion history facts matching "{searchQuery}". Try searching for something different, like "jeans", "dress", or "shoes".
              </p>
            </div>
          )}
        </div>

        {!searchQuery && (
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8">
            <div className="text-center">
              <h2 className="text-2xl font-display font-semibold mb-3">Fashion History Quiz</h2>
              <p className="text-gray-600 mb-6">Test your knowledge of fashion history with our fun quiz!</p>
              <Button>Start Quiz</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryBytes;
