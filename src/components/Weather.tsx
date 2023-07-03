import { useEffect, useState } from "react";
import { LocationInput } from "./LocationInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Label, Skeleton,
  Toaster,
  useToast
} from "@edge-ui/react";

interface IWeather {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_dir: string;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

export function Weather() {
  const [weatherData, setWeatherData] = useState<IWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const toaster = useToast();

  const onLocation = async (location: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?q=${location}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      const data = await res.json();
      setWeatherData(data);
    } catch {
      toaster.toast({
        title: "Error",
        description: "Failed to fetch weather data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        onLocation(`${data.coords.latitude},${data.coords.longitude}`);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  return (
    <>
      <Toaster />
      <div className="mt-5">
        <LocationInput onLocation={onLocation} />
        <div className="mt-5 w-1/2">
          {loading ? (
            <div className="flex items-center space-x-4 border rounded-md p-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ) : !weatherData ? (
            <Heading.H2>Please enter a location</Heading.H2>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div>
                      <img
                        src={weatherData.current.condition.icon}
                        draggable={false}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Heading.H1>{weatherData.current.temp_c}°C</Heading.H1>
                      <Label>{weatherData.current.condition.text}</Label>
                      <Label className="text-muted-foreground">
                        Feels Like {weatherData.current.feelslike_c}°C
                      </Label>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <div>
                      <CardTitle>
                        {weatherData.location.name},{" "}
                        {weatherData.location.country}
                      </CardTitle>
                      <CardDescription>
                        {weatherData.location.localtime}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col">
                <Label>Humidity: {weatherData.current.humidity}%</Label>
                <Label>Precipitation: {weatherData.current.precip_mm}mm</Label>
                <Label>Wind: {weatherData.current.wind_kph} km/h</Label>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
