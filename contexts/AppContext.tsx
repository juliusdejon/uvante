import React, { createContext, useState, ReactNode } from 'react';

import { Coordinate } from 'types/types';

type RideStatus = 'driver_assigned' | 'driver_arrived' | 'ongoing' | 'completed';

interface AppContextProps {
  pickUp: Coordinate | null;
  setPickUp: React.Dispatch<React.SetStateAction<Coordinate | null>>;
  dropOff: Coordinate | null;
  setDropOff: React.Dispatch<React.SetStateAction<Coordinate | null>>;
  rideStatus: RideStatus;
  setRideStatus: React.Dispatch<React.SetStateAction<RideStatus>>;
  price: number,
  setPrice: React.Dispatch<React.SetStateAction<number>>,
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [pickUp, setPickUp] = useState<Coordinate | null>(null);
  const [dropOff, setDropOff] = useState<Coordinate | null>(null);
  const [rideStatus, setRideStatus] = useState<RideStatus>(null);
  const [price, setPrice] = useState<number>(null);

  return (
    <AppContext.Provider value={{
      pickUp,
      setPickUp,
      dropOff,
      setDropOff,
      rideStatus,
      setRideStatus,
      price,
      setPrice
    }}>
      {children}
    </AppContext.Provider>
  );
};