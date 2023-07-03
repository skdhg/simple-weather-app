"use client";

import { Weather } from "@/components/Weather";
import { Heading } from "@edge-ui/react";

export default function Home() {
  return (
    <main>
      <Heading.H1>Weather App</Heading.H1>
      <div>
        <Weather/>
      </div>
    </main>
  );
}
