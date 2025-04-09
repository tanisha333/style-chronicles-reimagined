
export type StyleType = 
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
