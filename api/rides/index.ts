import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../common/api-provider";

//TODO: Replace this with ENV
const API_URL = "http://localhost:3000";

/** Fetch all rides */
const getRides = async () => {
  const { data } = await axios.get(`${API_URL}/rides}`);
  return data;
};

/** Fetch a single ride */
const getRide = async (rideId: number) => {
  const { data } = await axios.get(`${API_URL}/rides/${rideId}`);
  return data;
};

/** Start a ride */
const startRide = async (rideId) => {
  const { data } = await axios.patch(`/api/rides/${rideId}/start`);
  return data;
};

export const useRides = () => {
  return useQuery({
    queryKey: ["rides"],
    queryFn: getRides,
  });
};

export const useRide = (rideId: number) => {
  return useQuery({
    queryKey: ["ride", rideId],
    queryFn: () => getRide(rideId),
    refetchInterval: 5000, // Polling every 5 seconds
    enabled: !!rideId,
  });
};

export const useStartRide = () => {
  return useMutation({
    mutationKey: ["rides"],
    mutationFn: startRide,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rides"] }),
  });
};
