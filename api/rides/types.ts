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
