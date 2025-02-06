import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import LinearLoader from 'components/LinearLoader';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRide, useStartRide } from '@/api/rides';
import { useLocalSearchParams } from 'expo-router';
import CompletedRide from 'components/view-ride/CompletedRide';
import DriverArrived from 'components/view-ride/DriverArrived';
import OngoingDrive from 'components/view-ride/OngoingRide';

const ViewRide = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const params = useLocalSearchParams();
  const rideId = Number(params.rideId);
  const { data: ride } = useRide(rideId);
  const { mutate: startRide } = useStartRide();

  useEffect(() => {
    if (!ride) return;

    if (ride.status === 'driver_assigned') {
      bottomSheetModalRef.current.present()
    } else if (ride.status === 'driver_arrived') {
      bottomSheetModalRef.current.snapToIndex(1)
      startRide(rideId)
    } else if (ride.status === 'ongoing') {
      bottomSheetModalRef.current.snapToIndex(2)
    } else if (ride.status === 'completed') {
      bottomSheetModalRef.current.snapToIndex(3)
    }
  }, [ride])


  const renderRideStatus = () => {
    if (!ride) return null;

    if (ride.status === 'driver_arrived') {
      return (
        <DriverArrived ride={ride} />
      )
    } else if (ride.status === 'ongoing') {
      return (
        <OngoingDrive ride={ride} />
      )
    } else if (ride.status === 'completed') {
      return (
        <CompletedRide
          ride={ride}
        />
      )
    }
    return (
      <BottomSheetView className='flex p-8 gap-8 h-[200px]'>
        <LinearLoader />
        <View className="w-full flex gap-2 flex-row justify-between">
          <Text className="font-primary-semibold text-xl">Confirming your ride</Text>
          <Text className='font-primary-semibold text-2xl'>${ride.price}</Text>
        </View>
      </BottomSheetView>
    );
  };

  return (
    <BottomSheetModal
      snapPoints={['20%', '30%', '40%']}
      index={0}
      enablePanDownToClose={false}
      ref={bottomSheetModalRef}
    >
      {renderRideStatus()}
    </BottomSheetModal>
  );
};



export default ViewRide;
