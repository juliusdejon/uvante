import axios from "axios";
import Config from "@/config/index";
import { useState, useEffect } from "react";
import { Place } from "types/types";

const useLocationSearch = (
  debouncedLocation: string,
  placeSelected: boolean
) => {
  const [results, setResults] = useState<Place[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedLocation || placeSelected) {
        setResults([]);
        return;
      }
      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          debouncedLocation
        )}.json`;
        const response = await axios.get(url, {
          params: { access_token: Config.MAP_BOX_ACCESS_TOKEN },
        });
        setResults(response.data.features);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchResults();
  }, [debouncedLocation, placeSelected]);

  return { results, setResults };
};

export { useLocationSearch };
