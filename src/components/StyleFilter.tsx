
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StyleType = 
  | "All"
  | "Streetwear" 
  | "Glam" 
  | "Grunge" 
  | "Disco" 
  | "Preppy" 
  | "Alt" 
  | "Minimalist";

interface StyleFilterProps {
  selectedStyle: StyleType;
  setSelectedStyle: (style: StyleType) => void;
}

const StyleFilter: React.FC<StyleFilterProps> = ({ 
  selectedStyle, 
  setSelectedStyle 
}) => {
  const styles: StyleType[] = [
    "All",
    "Streetwear",
    "Glam",
    "Grunge",
    "Disco",
    "Preppy",
    "Alt",
    "Minimalist"
  ];

  // Style tag colors map
  const styleColors: Record<StyleType, string> = {
    All: "bg-muted hover:bg-muted/80",
    Streetwear: "bg-retrored/20 hover:bg-retrored/30 text-retrored",
    Glam: "bg-electricblue/20 hover:bg-electricblue/30 text-electricblue",
    Grunge: "bg-gray-500/20 hover:bg-gray-500/30 text-gray-700",
    Disco: "bg-sunnyellow/20 hover:bg-sunnyellow/30 text-amber-700",
    Preppy: "bg-mint/30 hover:bg-mint/40 text-emerald-700",
    Alt: "bg-bubblegum/20 hover:bg-bubblegum/30 text-bubblegum",
    Minimalist: "bg-gray-200 hover:bg-gray-300 text-gray-600"
  };

  return (
    <div className="py-4 mb-6">
      <h3 className="text-lg font-display mb-3 text-muted-foreground">
        Filter by Style
      </h3>
      <div className="flex flex-wrap gap-2">
        {styles.map((style) => (
          <Badge
            key={style}
            variant="outline"
            className={cn(
              "style-tag text-xs py-1 px-3 cursor-pointer transform transition-all hover:scale-105",
              styleColors[style],
              selectedStyle === style && "ring-2 ring-primary/50"
            )}
            onClick={() => setSelectedStyle(style)}
          >
            {style === "Alt" ? "E-girl / Alt" : style}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default StyleFilter;
