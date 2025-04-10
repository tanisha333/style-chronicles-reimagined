
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StyleType, SearchFilter } from "@/lib/types";
import SearchFilters from "./SearchFilters";

interface SearchResultsProps {
  query: string;
  trends: any[];
}

const SearchResults = ({ query, trends }: SearchResultsProps) => {
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [layout, setLayout] = useState<"grid" | "masonry">("masonry");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Pinterest-style search filters
  const searchFilters: SearchFilter[] = [
    { label: "Baggy", value: "baggy", backgroundColor: "bg-pink-200 hover:bg-pink-300 text-pink-900" },
    { label: "Women", value: "women", backgroundColor: "bg-amber-100 hover:bg-amber-200 text-amber-900" },
    { label: "Wide leg", value: "wide leg", backgroundColor: "bg-lime-100 hover:bg-lime-200 text-lime-900" },
    { label: "Blue", value: "blue", backgroundColor: "bg-green-200 hover:bg-green-300 text-green-900" },
    { label: "Mom", value: "mom", backgroundColor: "bg-sky-200 hover:bg-sky-300 text-sky-900" },
    { label: "Casual", value: "casual", backgroundColor: "bg-blue-200 hover:bg-blue-300 text-blue-900" },
    { label: "Bell bottom", value: "bell bottom", backgroundColor: "bg-purple-200 hover:bg-purple-300 text-purple-900" },
    { label: "Black", value: "black", backgroundColor: "bg-red-200 hover:bg-red-300 text-red-900" },
    { label: "Vintage", value: "vintage", backgroundColor: "bg-orange-200 hover:bg-orange-300 text-orange-900" },
    { label: "Y2K", value: "y2k", backgroundColor: "bg-violet-200 hover:bg-violet-300 text-violet-900" },
    { label: "Minimalist", value: "minimalist", backgroundColor: "bg-gray-200 hover:bg-gray-300 text-gray-900" }
  ];

  useEffect(() => {
    if (!query && !activeFilter) {
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

    // Filter based on search query and active filter
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
      
      // If we have a query, filter by it
      const matchesQuery = query ? searchableText.includes(query.toLowerCase()) : true;
      
      // If we have an active filter, also filter by it
      const matchesFilter = activeFilter 
        ? searchableText.includes(activeFilter.toLowerCase()) 
        : true;
      
      return matchesQuery && matchesFilter;
    });

    setFilteredResults(filtered);
  }, [query, trends, activeFilter]);

  const handleFilterClick = (filterValue: string) => {
    // Toggle filter off if clicking the active one
    setActiveFilter(activeFilter === filterValue ? null : filterValue);
  };

  if (query === '' && !activeFilter) {
    return null;
  }

  if (filteredResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-display mb-2">No results found for "{query || activeFilter}"</h2>
        <p className="text-muted-foreground">Try searching for a different term</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10 px-4 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display">
          {filteredResults.length} results for "{query || activeFilter}"
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

      <SearchFilters 
        filters={searchFilters} 
        activeFilter={activeFilter} 
        onFilterClick={handleFilterClick} 
      />

      <div className={`mt-6 ${
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
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full opacity-90 backdrop-blur-sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full opacity-90 backdrop-blur-sm">
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
                  {(result.styles as StyleType[]).slice(0, 3).map((style, i) => (
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
