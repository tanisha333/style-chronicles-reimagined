
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
  | "Formal"
  | "Baggy"
  | "Women"
  | "Wide leg"
  | "Blue"
  | "Mom"
  | "Casual"
  | "Bell bottom"
  | "Black"
  | "Idea";

export interface DecadeTrend {
  id: number;
  name: string;
  description: string;
  image: string;
  styles: StyleType[];
  icons: string[];
  pieces: string[];
  popCulture: string[];
}

export interface SearchFilter {
  label: string;
  value: string;
  image?: string;
  backgroundColor: string;
}
