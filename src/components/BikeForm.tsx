
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface PredictionData {
  temp: number;
  atemp: number;
  humidity: number;
  windspeed: number;
  hour: number;
  weekday: number;
  season: number;
  holiday: number;
  workingday: number;
  weathersit: number;
}

interface BikeFormProps {
  onPrediction: (prediction: number) => void;
}

export const BikeForm = ({ onPrediction }: BikeFormProps) => {
  const [formData, setFormData] = useState<PredictionData>({
    temp: 0,
    atemp: 0,
    humidity: 0,
    windspeed: 0,
    hour: 0,
    weekday: 0,
    season: 1,
    holiday: 0,
    workingday: 1,
    weathersit: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Sending data to API:", formData);
      
      const apiUrl = window.MODEL_API_URL || "http://localhost:8000";

      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      
      // The FastAPI endpoint returns { "prediction": number }
      if (typeof result.prediction === 'number') {
        onPrediction(result.prediction);
        toast.success("Prediction generated successfully!");
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to get prediction. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof PredictionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-[var(--shadow-elegant)]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Bike Demand Prediction
        </CardTitle>
        <CardDescription>
          Enter the environmental and temporal conditions to predict bike demand
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Temperature */}
            <div className="space-y-2">
              <Label htmlFor="temp">Temperature (°C)</Label>
              <Input
                id="temp"
                type="number"
                step="0.1"
                value={formData.temp}
                onChange={(e) => updateField("temp", e.target.value)}
                placeholder="e.g., 20.5"
                className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]"
              />
            </div>

            {/* Apparent Temperature */}
            <div className="space-y-2">
              <Label htmlFor="atemp">Apparent Temperature (°C)</Label>
              <Input
                id="atemp"
                type="number"
                step="0.1"
                value={formData.atemp}
                onChange={(e) => updateField("atemp", e.target.value)}
                placeholder="e.g., 22.0"
                className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]"
              />
            </div>

            {/* Humidity */}
            <div className="space-y-2">
              <Label htmlFor="humidity">Humidity (%)</Label>
              <Input
                id="humidity"
                type="number"
                min="0"
                max="100"
                value={formData.humidity}
                onChange={(e) => updateField("humidity", e.target.value)}
                placeholder="e.g., 65"
                className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]"
              />
            </div>

            {/* Wind Speed */}
            <div className="space-y-2">
              <Label htmlFor="windspeed">Wind Speed (km/h)</Label>
              <Input
                id="windspeed"
                type="number"
                step="0.1"
                min="0"
                value={formData.windspeed}
                onChange={(e) => updateField("windspeed", e.target.value)}
                placeholder="e.g., 15.2"
                className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]"
              />
            </div>

            {/* Hour */}
            <div className="space-y-2">
              <Label htmlFor="hour">Hour (0-23)</Label>
              <Select value={formData.hour.toString()} onValueChange={(value) => updateField("hour", value)}>
                <SelectTrigger className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]">
                  <SelectValue placeholder="Select hour" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i.toString().padStart(2, '0')}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Weekday */}
            <div className="space-y-2">
              <Label htmlFor="weekday">Weekday</Label>
              <Select value={formData.weekday.toString()} onValueChange={(value) => updateField("weekday", value)}>
                <SelectTrigger className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]">
                  <SelectValue placeholder="Select weekday" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Sunday</SelectItem>
                  <SelectItem value="1">Monday</SelectItem>
                  <SelectItem value="2">Tuesday</SelectItem>
                  <SelectItem value="3">Wednesday</SelectItem>
                  <SelectItem value="4">Thursday</SelectItem>
                  <SelectItem value="5">Friday</SelectItem>
                  <SelectItem value="6">Saturday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Season */}
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Select value={formData.season.toString()} onValueChange={(value) => updateField("season", value)}>
                <SelectTrigger className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Spring</SelectItem>
                  <SelectItem value="2">Summer</SelectItem>
                  <SelectItem value="3">Fall</SelectItem>
                  <SelectItem value="4">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Holiday */}
            <div className="space-y-2">
              <Label htmlFor="holiday">Holiday</Label>
              <Select value={formData.holiday.toString()} onValueChange={(value) => updateField("holiday", value)}>
                <SelectTrigger className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]">
                  <SelectValue placeholder="Holiday status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Working Day */}
            <div className="space-y-2">
              <Label htmlFor="workingday">Working Day</Label>
              <Select value={formData.workingday.toString()} onValueChange={(value) => updateField("workingday", value)}>
                <SelectTrigger className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]">
                  <SelectValue placeholder="Working day status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Weather Situation */}
            <div className="space-y-2">
              <Label htmlFor="weathersit">Weather Situation</Label>
              <Select value={formData.weathersit.toString()} onValueChange={(value) => updateField("weathersit", value)}>
                <SelectTrigger className="transition-all duration-200 focus:shadow-[var(--shadow-glow)]">
                  <SelectValue placeholder="Weather condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Clear/Partly Cloudy</SelectItem>
                  <SelectItem value="2">Mist/Cloudy</SelectItem>
                  <SelectItem value="3">Light Snow/Rain</SelectItem>
                  <SelectItem value="4">Heavy Rain/Snow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)]"
            disabled={isLoading}
          >
            {isLoading ? "Predicting..." : "Predict Bike Demand"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
