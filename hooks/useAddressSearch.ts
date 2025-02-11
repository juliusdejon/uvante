import axios from "axios";
import Config from "@/config/index";
import { useState, useEffect } from "react";
import { Place } from "types/types";

const useAddressSearch = () => {
  const fetchAddress = async (
    geometry: { lat: number; lng: number } | null
  ) => {
    if (!geometry) {
      return;
    }
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${geometry.lng},${geometry.lat}.json`;
      const response = await axios.get(url, {
        params: {
          access_token: Config.MAP_BOX_ACCESS_TOKEN,
        },
      });
      return response.data.features;
    } catch (error) {
      console.error("Error fetching addresses by geometry:", error);
    }
  };

  return { fetchAddress };
};

export { useAddressSearch };
