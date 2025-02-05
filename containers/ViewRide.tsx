import React, { useState, useCallback, useRef, useContext, useEffect, Ref, MutableRefObject } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { AppContext } from 'contexts/AppContext';
import axios from 'axios';
import LinearLoader from 'components/LinearLoader';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const ViewRide = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { price, rideStatus } = useContext(AppContext);

  useEffect(() => {
    if (rideStatus === 'driver_assigned') {
      bottomSheetModalRef.current.present()
    }
  }, [rideStatus])

  return (
    <BottomSheetModal
      snapPoints={['40%', '50%']}
      index={0}
      enablePanDownToClose={false}
      ref={bottomSheetModalRef}>
      <BottomSheetView
        className='flex p-8 gap-8 h-[200px]'
      >
        <LinearLoader />
        <View className="w-full flex gap-2 flex-row justify-between">
          <Text className="font-primary-semibold text-xl">
            Confirming your ride
          </Text>
          <Text className='font-primary-semibold text-2xl'>
            ${price}
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ViewRide;



// <BottomSheet
// bottomSheetRef={bottomSheetRef}
// bottomSheetIndex={bottomSheetState}
// snapPoints={[200, '20%']}
// onChange={handleSheetChanges}
// >
// <View className="w-full flex flex-col gap-2">
//   <Text className="font-primary-bold text-2xl font-bold">Ride Booked!</Text>
//   <Text className="font-primary-bold text-2xl font-bold">{price}</Text>
//   <Text className='font-primary text-lg'>
//     Driver has been assigned
//   </Text>
// </View>

// </BottomSheet>