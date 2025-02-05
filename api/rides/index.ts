import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../common/api-provider";
import { Ride } from "./types";

//TODO: Replace this with ENV
const API_URL = process.env.API_URL || "http://localhost:3000";

/** Fetch all rides */
const getRides = async (): Promise<Ride[]> => {
  const { data } = await axios.get<Ride[]>(`${API_URL}/rides`);
  return data;
};

/** Fetch a single ride */
const getRide = async (rideId: number): Promise<Ride> => {
  const { data } = await axios.get<Ride>(`${API_URL}/rides/${rideId}`);
  return data;
};

/** Start a ride */
const startRide = async (rideId: number): Promise<Ride> => {
  const { data } = await axios.patch<Ride>(`${API_URL}/rides/${rideId}/start`);
  return data;
};

export const useRides = () => {
  return useQuery<Ride[]>({
    queryKey: ["rides"],
    queryFn: getRides,
  });
};

export const useRide = (rideId: number) => {
  return useQuery<Ride>({
    queryKey: ["ride", rideId],
    queryFn: () => getRide(rideId),
    refetchInterval: 5000, // Polling every 5 seconds
    enabled: !!rideId,
  });
};

export const useStartRide = () => {
  return useMutation<Ride, unknown, number>({
    mutationKey: ["rides"],
    mutationFn: startRide,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rides"] }),
  });
};
