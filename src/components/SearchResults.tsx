
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StyleType } from "@/lib/types";

interface SearchResultsProps {
  query: string;
  trends: any[];
}

const SearchResults = ({ query, trends }: SearchResultsProps) => {
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [layout, setLayout] = useState<"grid" | "masonry">("masonry");

  useEffect(() => {
    if (!query) {
      setFilteredResults([]);
      return;
    }

    // Flatten all decade trends into a single array of items
    const allTrends = trends.flatMap(decade => 
      decade.trends.map((trend: any) => ({
        ...trend,
        decade: decade.name
      }))
    );

    // Filter based on search query
    const filtered = allTrends.filter((trend: any) => {
      const searchableText = [
        trend.name,
        trend.description,
        ...trend.styles,
        ...trend.icons,
        ...trend.pieces,
        ...trend.popCulture,
        trend.decade
      ].join(' ').toLowerCase();
      
      return searchableText.includes(query.toLowerCase());
    });

    setFilteredResults(filtered);
  }, [query, trends]);

  if (query === '') {
    return null;
  }

  if (filteredResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-display mb-2">No results found for "{query}"</h2>
        <p className="text-muted-foreground">Try searching for a different term</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10 px-4 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display">
          {filteredResults.length} results for "{query}"
        </h2>
        <div className="flex gap-2">
          <Button
            variant={layout === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setLayout("grid")}
          >
            Grid
          </Button>
          <Button
            variant={layout === "masonry" ? "default" : "outline"}
            size="sm"
            onClick={() => setLayout("masonry")}
          >
            Masonry
          </Button>
        </div>
      </div>

      <div className={`${
        layout === "masonry" 
          ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4" 
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      }`}>
        {filteredResults.map((result) => (
          <div 
            key={result.id} 
            className={`${layout === "masonry" ? "mb-4 break-inside-avoid" : ""}`}
          >
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={result.image} 
                  alt={result.name}
                  className="w-full h-auto object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full opacity-80">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full opacity-80">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                  <h3 className="font-medium text-sm">{result.name}</h3>
                  <p className="text-xs opacity-90">{result.decade}</p>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.styles.slice(0, 3).map((style: StyleType, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {style}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
