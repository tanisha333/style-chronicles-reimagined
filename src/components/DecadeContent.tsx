
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StyleType } from "./StyleFilter";

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

interface DecadeContentProps {
  decade: string;
  description: string;
  styles: string[];
  trends: DecadeTrend[];
  bgColor: string;
  selectedStyle: StyleType;
}

const DecadeContent: React.FC<DecadeContentProps> = ({
  decade,
  description,
  trends,
  styles,
  bgColor,
  selectedStyle,
}) => {
  const [expandedTrend, setExpandedTrend] = useState<number | null>(null);

  // Filter trends by selected style
  const filteredTrends = selectedStyle === "All" 
    ? trends 
    : trends.filter(trend => trend.styles.includes(selectedStyle));

  return (
    <div className={`min-h-screen p-6 md:p-10 ${bgColor}`}>
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="decade-header mb-4">{decade}</h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl">{description}</p>

        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="essentials">
            <AccordionTrigger className="text-xl font-display">
              The Essentials
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                <div className="retro-card">
                  <h3 className="font-display text-lg font-bold mb-3">Key Styles</h3>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((style, index) => (
                      <span key={index} className="style-tag bg-primary/10 text-primary">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-8">
          <h3 className="text-2xl font-display mb-6">Iconic Trends</h3>
          
          {filteredTrends.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              No trends match this style filter in this decade.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTrends.map((trend) => (
                <Card 
                  key={trend.id} 
                  className={`overflow-hidden border-2 hover:shadow-xl transition-all ${
                    expandedTrend === trend.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${trend.image})` }}
                  />
                  <CardHeader>
                    <CardTitle>{trend.name}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {trend.styles.map((style) => (
                          <span key={style} className="style-tag text-xs bg-muted">
                            {style}
                          </span>
                        ))}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{trend.description}</p>
                    
                    <Accordion type="single" collapsible>
                      <AccordionItem value="details">
                        <AccordionTrigger>See details</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div>
                              <h4 className="font-semibold mb-1">Style Icons:</h4>
                              <p>{trend.icons.join(", ")}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Key Pieces:</h4>
                              <p>{trend.pieces.join(", ")}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Pop Culture Influences:</h4>
                              <p>{trend.popCulture.join(", ")}</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecadeContent;
