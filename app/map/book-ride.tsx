import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import SearchLocation from 'containers/SearchLocation';
import { AppContext } from 'contexts/AppContext';
import { useRouter } from 'expo-router';
import { useBookRide } from '@/api/rides';
import Pin from 'components/Pin';
import Button from 'components/Button';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const BookRide: React.FC = () => {
  const router = useRouter();
  const {
    pickUp,
    dropOff,
    setPickUp,
    setDropOff,
    setRideId,
    pickUpAddress,
    setPickUpAddress,
  } = useContext(AppContext);

  const [dropOffLocation, setDropOffLocation] = useState('');

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
      onChange={handleSheetChanges}
      snapPoints={[400, '100%']}
      index={bottomSheetState}
    >
      <BottomSheetView className="flex p-8 gap-2">

        <View className="w-full flex flex-col gap-2">
          <Text className="font-primary-semibold text-md">Hey Julius,</Text>
          <Text className="font-primary-semibold text-xl font-bold">Where are you going?</Text>
          <View className='flex flex-col mt-4 gap-4'>

            <SearchLocation
              Icon={<Pin type="pickup" />}
              setCoordinates={setPickUp}
              placeholder="Choose pick up point"
              onTouchEnd={maximizeBottomSheet}
              location={pickUpAddress}
              setLocation={setPickUpAddress}
            />
            <SearchLocation
              Icon={<Pin type="dropoff" />}
              setCoordinates={setDropOff}
              placeholder="Choose your destination"
              onTouchEnd={maximizeBottomSheet}
              location={dropOffLocation}
              setLocation={setDropOffLocation}
            />
          </View>
          <Button
            onPress={onBookRide}
            className={`${(pickUp && dropOff) ? 'bg-blue-600' : 'bg-gray-300'}`}>
            Book Ride
          </Button>
        </View>
      </BottomSheetView>

    </BottomSheet>
  );
};

export default BookRide;
