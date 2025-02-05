import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import BottomSheet from 'components/BottomSheet';
import SearchLocation from 'containers/SearchLocation';
import { AppContext } from 'contexts/AppContext';
import { useRouter } from 'expo-router';
import { useBookRide } from '@/api/rides';

const BookRide = () => {
  const router = useRouter();
  const bottomSheetRef = useRef(null);
  const {
    pickUp,
    dropOff,
    setPickUp,
    setDropOff,
  } = useContext(AppContext);
  const [bottomSheetState, setBottomSheetState] = useState(1);
  const minimizeBottomSheet = () => setBottomSheetState(1);
  const maximizeBottomSheet = () => setBottomSheetState(2);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetState(index);
  }, []);

  const { mutate: bookRide } = useBookRide({
    onSuccess: (rideId: number) => {
      router.push(`/map/view-ride/${rideId}`);
    }
  });

  useEffect(() => {
    if (pickUp && dropOff) {
      minimizeBottomSheet();
    }
  }, [pickUp, dropOff]);

  const onBookRide = () => {
    if (pickUp && dropOff) {
      bookRide({
        passenger: 'Julius',
        pickup: pickUp,
        dropoff: dropOff
      });
    }
  }

  return (
    <BottomSheet
      bottomSheetRef={bottomSheetRef}
      bottomSheetIndex={bottomSheetState}
      onChange={handleSheetChanges}
    >
      <View className="w-full flex flex-col gap-2">
        <Text className="font-primary text-md">Hey Julius</Text>
        <Text className="font-primary-bold text-2xl font-bold">Where are you going?</Text>
        <SearchLocation
          setCoordinates={setPickUp}
          placeholder="Enter pickup"
          onTouchEnd={maximizeBottomSheet}
        />
        <SearchLocation
          setCoordinates={setDropOff}
          placeholder="Enter drop-off"
          onTouchEnd={maximizeBottomSheet}
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'black' : 'grey',
            },
          ]}
          className={`${(pickUp && dropOff) ? 'bg-blue-600' : 'bg-gray-300'} w-full mt-4 h-16 flex  rounded-full items-center justify-center`}
          onPress={onBookRide}>
          <Text className='text-white font-primary text-xl font-primary-semibold'>
            Book Ride
          </Text>
        </Pressable>

      </View>
    </BottomSheet>
  );
};

export default BookRide;
