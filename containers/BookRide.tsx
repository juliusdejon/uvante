import React, { useState, useCallback, useRef, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import BottomSheet from 'components/BottomSheet';
import SearchLocation from './SearchLocation';
import { AppContext } from 'contexts/AppContext';

const BookRide = () => {
  const bottomSheetRef = useRef(null);
  const [bottomSheetState, setBottomSheetState] = useState(1);
  const { setPickUp, setDropOff } = useContext(AppContext);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetState(index);
  }, []);

  const handleTouchEnd = () => setBottomSheetState(2);

  return (
    <BottomSheet
      bottomSheetRef={bottomSheetRef}
      index={bottomSheetState}
      onChange={handleSheetChanges}
    >
      <View className="w-full flex flex-col">
        <Text className="font-primary text-md">Hey Julius</Text>
        <Text className="font-primary-bold text-2xl font-bold">Where are you going?</Text>
        <SearchLocation
          setCoordinates={setPickUp}
          placeholder="Enter pickup"
          onTouchEnd={handleTouchEnd}
        />
        <SearchLocation
          setCoordinates={setDropOff}
          placeholder="Enter drop-off"
          onTouchEnd={handleTouchEnd}
        />
        <Button title='Book Ride'>

        </Button>
      </View>
    </BottomSheet>
  );
};

export default BookRide;
