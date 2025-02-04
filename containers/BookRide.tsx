import React, { useState, useCallback, useRef } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from 'components/BottomSheet';
import SearchAddress from './SearchAddress';

const BookRide = () => {
  const bottomSheetRef = useRef(null);
  const [bottomSheetState, setBottomSheetState] = useState(1);

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
        <SearchAddress
          placeholder="Enter pickup"
          onTouchEnd={handleTouchEnd}
        />
        <SearchAddress
          placeholder="Enter destination"
          onTouchEnd={handleTouchEnd}
        />

      </View>
    </BottomSheet>
  );
};

export default BookRide;
