import { useEffect, useState } from "react";
import { ICities } from "../types/IExtra";

export const useStateCities = ({ state }: { state: string }) => {
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getCities = async () => {
      setIsLoading(true)
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          body: JSON.stringify({
            country: "Canada",
            state: state || "Alberta",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const cities = (await res.json()) as ICities;
      setCities(cities.data);
      setIsLoading(false)
    };
    getCities();
  }, [state]);

  return { cities , isLoading};
};
