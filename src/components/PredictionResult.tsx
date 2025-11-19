import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bike, TrendingUp } from "lucide-react";

interface PredictionResultProps {
  prediction: number | null;
}

export const PredictionResult = ({ prediction }: PredictionResultProps) => {
  if (prediction === null) return null;

  const roundedPrediction = Math.round(prediction);
  const demandLevel = roundedPrediction < 50 ? "Low" : roundedPrediction < 150 ? "Medium" : "High";
  const demandColor = roundedPrediction < 50 ? "destructive" : roundedPrediction < 150 ? "secondary" : "default";

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6 shadow-[var(--shadow-elegant)] border-primary/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-primary flex items-center justify-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Prediction Result
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Bike className="h-8 w-8 text-primary" />
          <div className="text-4xl font-bold text-primary">
            {roundedPrediction}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg text-muted-foreground">
            Expected number of bikes needed
          </p>
          <Badge variant={demandColor as any} className="text-sm px-3 py-1">
            {demandLevel} Demand
          </Badge>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-accent/50 to-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            This prediction helps optimize bike distribution across your stations to meet expected demand.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};