"use client";

import { Button, Flex, Input, Label } from "@edge-ui/react";
import { Search } from "lucide-react";
import { useState } from "react";

interface IProps {
  onLocation: (location: string) => unknown;
}

export function LocationInput(props: IProps) {
  const [location, setLocation] = useState<string>();

  return (
    <div>
      <Flex gap={"lg"}>
        <Input
          placeholder="Search location..."
          type="text"
          value={location}
          defaultValue={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            const current = location;
            if (e.key === "Enter" && current) {
              e.preventDefault();
              setLocation("");
              return props.onLocation(current);
            }
          }}
        />
        <Button
          className="gap-2"
          onClick={() => {
            if (location) props.onLocation(location);
            setLocation("");
          }}
        >
          <Search className="h-5 w-5" />
          Search
        </Button>
      </Flex>
      <Label
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (data) => {
              props.onLocation(
                `${data.coords.latitude},${data.coords.longitude}`
              );
              setLocation("");
            },
            () => {}
          );
        }}
      >
        Use current location
      </Label>
    </div>
  );
}
