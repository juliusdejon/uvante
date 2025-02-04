import React, { createContext, useState, ReactNode } from 'react';

import { Coordinate } from 'types/types';

interface AppContextProps {
  pickUp: Coordinate | null;
  setPickUp: React.Dispatch<React.SetStateAction<Coordinate | null>>;
  dropOff: Coordinate | null;
  setDropOff: React.Dispatch<React.SetStateAction<Coordinate | null>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [pickUp, setPickUp] = useState<Coordinate | null>(null);
  const [dropOff, setDropOff] = useState<Coordinate | null>(null);

  return (
    <AppContext.Provider value={{
      pickUp,
      setPickUp,
      dropOff,
      setDropOff
    }}>
      {children}
    </AppContext.Provider>
  );
};