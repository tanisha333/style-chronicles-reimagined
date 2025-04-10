
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StyleType as LibStyleType } from "@/lib/types";

// Export the StyleType to match the one in lib/types.d.ts
export type StyleType = 
  | "All"
  | "Streetwear" 
  | "Glam" 
  | "Grunge" 
  | "Disco" 
  | "Preppy" 
  | "Alt" 
  | "Minimalist"
  | "Hippie"
  | "Punk"
  | "Boho"
  | "Y2K"
  | "Vintage"
  | "Retro"
  | "Athleisure"
  | "Formal";

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
    "Minimalist",
    "Hippie",
    "Punk",
    "Boho",
    "Y2K"
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
    Minimalist: "bg-gray-200 hover:bg-gray-300 text-gray-600",
    Hippie: "bg-sunnyellow/30 hover:bg-sunnyellow/40 text-amber-800",
    Punk: "bg-retrored/30 hover:bg-retrored/40 text-retrored",
    Boho: "bg-lavender/20 hover:bg-lavender/30 text-lavender",
    Y2K: "bg-electricblue/30 hover:bg-electricblue/40 text-electricblue",
    Vintage: "bg-vintagecream hover:bg-vintagecream/90 text-gray-700",
    Retro: "bg-mint/20 hover:bg-mint/30 text-emerald-700",
    Athleisure: "bg-gray-300 hover:bg-gray-400 text-gray-700",
    Formal: "bg-gray-400 hover:bg-gray-500 text-gray-900"
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
