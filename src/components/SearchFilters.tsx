
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { SearchFilter } from "@/lib/types";

interface SearchFiltersProps {
  filters: SearchFilter[];
  activeFilter: string | null;
  onFilterClick: (filter: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  activeFilter,
  onFilterClick,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-3 px-4 max-w-full no-scrollbar">
      <div className="p-2 bg-muted rounded-full flex-shrink-0">
        <Filter className="h-4 w-4 text-muted-foreground" />
      </div>
      
      {filters.map((filter) => (
        <Badge
          key={filter.value}
          variant="outline"
          className={cn(
            "flex items-center gap-2 py-2 px-3 rounded-full cursor-pointer transition-all whitespace-nowrap",
            filter.backgroundColor,
            activeFilter === filter.value && "ring-2 ring-primary/50 shadow-sm"
          )}
          onClick={() => onFilterClick(filter.value)}
        >
          {filter.image && (
            <img 
              src={filter.image} 
              alt={filter.label} 
              className="h-5 w-5 rounded-full object-cover"
            />
          )}
          <span>{filter.label}</span>
        </Badge>
      ))}
    </div>
  );
};

export default SearchFilters;
