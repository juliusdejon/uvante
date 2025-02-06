import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import BottomSheet from 'components/BottomSheet';
import SearchLocation from 'containers/SearchLocation';
import { AppContext } from 'contexts/AppContext';
import { useRouter } from 'expo-router';
import { useBookRide } from '@/api/rides';
import Dot from 'components/Dot';
import Pin from 'components/Pin';
import Button from 'components/Button';

const BookRide = () => {
  const router = useRouter();
  const bottomSheetRef = useRef(null);
  const {
    pickUp,
    dropOff,
    setPickUp,
    setDropOff,
    setRideId,
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
      setRideId(rideId);
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
        <Text className="font-primary-semibold text-md">Hey Julius,</Text>
        <Text className="font-primary-semibold text-xl font-bold">Where are you going?</Text>
        <View className='flex flex-col mt-4 gap-4'>

          <SearchLocation
            Icon={<Dot />}
            setCoordinates={setPickUp}
            placeholder="Choose pick up point"
            onTouchEnd={maximizeBottomSheet}
          />
          <SearchLocation
            Icon={<Pin />}
            setCoordinates={setDropOff}
            placeholder="Choose your destination"
            onTouchEnd={maximizeBottomSheet}
          />
        </View>
        <Button
          onPress={onBookRide}
          className={`${(pickUp && dropOff) ? 'bg-blue-600' : 'bg-gray-300'}`}>
          Book Ride
        </Button>
      </View>
    </BottomSheet>
  );
};

export default BookRide;
