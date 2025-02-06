import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookRideResponse, Ride } from "./types";
import { Coordinate } from "types/types";
import { queryClient } from "../common/api-provider";
import Config from "@/config/index";

const API_URL = Config.API_URL;

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

/** Book ride */
const bookRide = async ({
  passenger,
  pickup,
  dropoff,
}: {
  passenger: string;
  pickup: Coordinate;
  dropoff: Coordinate;
}): Promise<BookRideResponse> => {
  const { data } = await axios.post<BookRideResponse>(`${API_URL}/rides`, {
    passenger,
    pickup,
    dropoff,
  });
  return data;
};

/** Start a ride */
const startRide = async (rideId: number): Promise<Ride> => {
  const { data } = await axios.post<Ride>(`${API_URL}/rides/${rideId}/start`);
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

export const useBookRide = ({
  onSuccess,
}: {
  onSuccess: (rideId: number) => void;
}) => {
  return useMutation<
    BookRideResponse,
    unknown,
    { passenger: string; pickup: Coordinate; dropoff: Coordinate }
  >({
    mutationKey: ["rides"],
    mutationFn: bookRide,
    onSuccess: (data: BookRideResponse) => {
      onSuccess(data.ride.id);
      queryClient.invalidateQueries({ queryKey: ["rides"] });
    },
  });
};

export const useStartRide = () => {
  return useMutation<Ride, unknown, number>({
    mutationKey: ["rides"],
    mutationFn: startRide,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rides"] }),
  });
};
