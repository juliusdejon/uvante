import React, { createContext, useState, ReactNode } from 'react';

import { Coordinate } from 'types/types';

interface AppContextProps {
  pickUp: Coordinate | null;
  setPickUp: React.Dispatch<React.SetStateAction<Coordinate | null>>;
  pickUpAddress: string | null;
  setPickUpAddress: React.Dispatch<React.SetStateAction<string>>;
  dropOff: Coordinate | null;
  setDropOff: React.Dispatch<React.SetStateAction<Coordinate | null>>;
  rideId: number | null;
  setRideId: React.Dispatch<React.SetStateAction<number | null>>;
  resetState: () => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [pickUp, setPickUp] = useState<Coordinate | null>(null);
  const [pickUpAddress, setPickUpAddress] = useState<string>('');
  const [dropOff, setDropOff] = useState<Coordinate | null>(null);
  const [rideId, setRideId] = useState<number | null>(null);

  const resetState = () => {
    setPickUp(null);
    setDropOff(null);
    setRideId(null);
  };

  return (
    <AppContext.Provider value={{
      pickUp,
      setPickUp,
      pickUpAddress,
      setPickUpAddress,
      dropOff,
      setDropOff,
      rideId,
      setRideId,
      resetState
    }}>
      {children}
    </AppContext.Provider>
  );
};