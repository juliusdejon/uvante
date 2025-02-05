import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import BottomSheet from 'components/BottomSheet';
import SearchLocation from './SearchLocation';
import { AppContext } from 'contexts/AppContext';
import axios from 'axios';

const BookRide = () => {
  const bottomSheetRef = useRef(null);
  const {
    pickUp,
    dropOff,
    setPickUp,
    setDropOff,
    setRideId } = useContext(AppContext);
  const [bottomSheetState, setBottomSheetState] = useState(1);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetState(index);
  }, []);

  const handleTouchEnd = () => setBottomSheetState(2);
  useEffect(() => {
    if (pickUp && dropOff) {
      handleSheetChanges(1)
    }
  }, [pickUp, dropOff]);

  const bookRide = async () => {
    if (pickUp && dropOff) {
      try {
        const response = await axios.post('http://localhost:3000/rides', {
          passenger: 'Julius',
          pickup: pickUp,
          dropoff: dropOff
        });
        console.log('Ride booked successfully:', response.data);
        setRideId(response.data.ride.id)
        bottomSheetRef.current.close()
      } catch (error) {
        console.error('Error booking ride:', error.response ? error.response.data : error.message);
      }

    }
  };

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
          onTouchEnd={handleTouchEnd}
        />
        <SearchLocation
          setCoordinates={setDropOff}
          placeholder="Enter drop-off"
          onTouchEnd={handleTouchEnd}
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'black' : 'grey',
            },
          ]}
          className={`${(pickUp && dropOff) ? 'bg-blue-600' : 'bg-gray-300'} w-full mt-4 h-16 flex  rounded-full items-center justify-center`}
          onPress={bookRide}>
          <Text className='text-white font-primary text-xl font-primary-semibold'>
            Book Ride
          </Text>
        </Pressable>

      </View>
    </BottomSheet>
  );
};

export default BookRide;
