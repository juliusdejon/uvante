import { Coordinate } from "types/types";
export interface Ride {
  driver: {
    id: number;
    name: string;
    available: boolean;
    location: string;
    car: Car;
  };
  status: "driver_assigned" | "driver_arrived" | "ongoing" | "completed";
  price: number;
}

interface Car {
  plate: string;
  model: string;
  make: string;
  color: string;
  year: number;
}

interface Driver {
  available: boolean;
  car: Car;
  id: number;
  location: string;
  name: string;
}

interface BookRide {
  driver: Driver;
  dropoff: Coordinate;
  id: number;
  passenger: string;
  pickup: Coordinate;
  price: string;
  status: string;
}

export interface BookRideResponse {
  message: string;
  ride: BookRide;
}
