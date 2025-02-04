import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import GorHomBottomSheet from '@gorhom/bottom-sheet';
import BottomSheet from 'components/bottom-sheet';

const BookRide = () => {
  const bottomSheetRef = useRef<GorHomBottomSheet>(null);
  const [bottomSheetState, setBottomSheetState] = useState(1);
  const [destination, setDestination] = useState('');

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
      <View className='w-full flex flex-col'>
        <Text className='font-primary text-md'>Hey Julius</Text>
        <Text className='font-primary-bold text-2xl font-bold'>Where are you going?</Text>
        <TextInput
          className='font-primary-medium border rounded-lg border-1 border-gray-300 mt-4 bg-white text-lg px-6 p-4 pb-6 font-medium shadow-sm'
          placeholder='Enter destination'
          placeholderTextColor='#A0A0A0'
          onChangeText={setDestination}
          value={destination}
          onTouchEnd={handleTouchEnd}
        />
      </View>
    </BottomSheet>

  )
}

export default BookRide