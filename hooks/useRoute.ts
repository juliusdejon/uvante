import axios from "axios";
import Config from "config";
import { useEffect, useState } from "react";
import { Coordinate } from "types/types";

const useRoute = (pickUp: Coordinate, dropOff: Coordinate) => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUp.join(
            ","
          )};${dropOff.join(
            ","
          )}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${
            Config.MAP_BOX_ACCESS_TOKEN
          }`
        );
        setRoute(response.data.routes[0].geometry);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    if (!pickUp && !dropOff) {
      setRoute(null);
    }
    if (pickUp && dropOff) {
      fetchRoute();
    }
  }, [pickUp, dropOff]);

  return route;
};

export { useRoute };
