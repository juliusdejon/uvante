import React, { useRef, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import LinearLoader from 'components/LinearLoader';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRide, useStartRide } from '@/api/rides';
import { useLocalSearchParams } from 'expo-router';
import StarRating from 'components/StarRating';
import Button from 'components/Button';

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

    if (['driver_arrived', 'ongoing'].includes(ride.status)) {
      return (
        <BottomSheetView className='flex px-8 py-4 gap-2 h-[160px]'>
          <Text className="font-primary-semibold text-xl">
            {ride.status === 'driver_arrived' ? 'Your Driver has Arrived!' : ''}
            {ride.status === 'ongoing' ? 'Your Ride has Started!' : ''}
          </Text>
          {ride.status === 'ongoing' && <LinearLoader />}
          <RideDetails ride={ride} />
        </BottomSheetView>
      );
    }
    if (ride.status === 'completed') {
      return (
        <BottomSheetView className='flex px-8 py-4 gap-2 h-[160px]'>
          <Text className="font-primary-semibold text-xl">
            You Reached your Destination!
          </Text>
          <View className='flex  justify-center mt-4 gap-2'>
            <Text className='text-lg font-primary-semibold'>How was your trip with {ride.driver.name}?</Text>
            <StarRating />
            <Image
              className='ml-auto -mt-12'
              source={carImages[ride.driver.car.color]}
              style={{ width: 140, height: 140 }}
              resizeMode='contain'
            />
          </View>
          <Button onPress={() => { }}>
            Leave a Review
          </Button>
        </BottomSheetView>
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


const carImages = {
  Black: require("../../../assets/cars/black.avif"),
  Red: require("../../../assets/cars/red.avif"),
  White: require("../../../assets/cars/white.avif"),
  Blue: require("../../../assets/cars/blue.avif"),
};

const RideDetails = ({ ride }) => {
  if (!ride) return null;
  return (
    <View className="w-full relative flex gap-2 flex-row justify-between">
      <View className='w-1/2'>
        <Text className='text-lg font-primary-semibold'>{ride.driver.name}</Text>
        <Text className='text-md font-primary'>
          {ride.driver.car.make} {ride.driver.car.model} {ride.driver.car.year}
        </Text>
        <Text className='text-md font-primary'>{ride.driver.car.plate}</Text>
      </View>
      <View className='w-1/2'>
        <Image
          className='ml-auto -mt-12'
          source={carImages[ride.driver.car.color]}
          style={{ width: 140, height: 140 }}
          resizeMode='contain'
        />
      </View>
    </View>
  )
};

export default ViewRide;
