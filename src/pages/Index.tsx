import { useState } from "react";
import { BikeForm } from "@/components/BikeForm";
import { PredictionResult } from "@/components/PredictionResult";

const Index = () => {
  const [prediction, setPrediction] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
      {/* Header */}
      <header className="w-full py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/lovable-uploads/81d839bb-88a4-447e-b841-25ab1f60aa01.png" 
              alt="UrbanMove GmbH Logo" 
              className="h-16 w-16 object-contain"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                UrbanMove GmbH
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Smart Bike Sharing Solutions
              </p>
            </div>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              AI-Powered Bike Demand Forecasting
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use our advanced machine learning model to predict bike demand based on weather conditions, 
              time of day, and other environmental factors. This helps optimize bike distribution across your network.
            </p>
          </div>

          <BikeForm onPrediction={setPrediction} />
          <PredictionResult prediction={prediction} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-sm text-muted-foreground">
            © 2024 UrbanMove GmbH. Empowering sustainable urban mobility through intelligent bike sharing.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
