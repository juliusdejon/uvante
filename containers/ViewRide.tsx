import React, { useRef, useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { AppContext } from 'contexts/AppContext';
import axios from 'axios';
import LinearLoader from 'components/LinearLoader';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';

const fetchRideDetails = async (rideId) => {
  if (!rideId) return;
  const response = await axios.get(`http://localhost:3000/rides/${rideId}`);
  return response.data;
};


const ViewRide = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { rideId } = useContext(AppContext);

  const { data } = useQuery({
    queryKey: ['rideDetails', rideId],
    queryFn: () => fetchRideDetails(rideId),
    refetchInterval: 5000,
    enabled: !!rideId
  });

  useEffect(() => {
    if (data?.status === 'driver_assigned') {
      bottomSheetModalRef.current.present()
    } else if (data?.status === 'driver_arrived') {
      bottomSheetModalRef.current.snapToIndex(1)
    }
  }, [data])

  const carImages = {
    Black: require('../assets/cars/black.avif'),
    Red: require('../assets/cars/red.avif'),
    White: require('../assets/cars/white.avif'),
    Blue: require('../assets/cars/blue.avif'),
  };

  return (
    <BottomSheetModal
      snapPoints={['20%', '30%']}
      index={0}
      enablePanDownToClose={false}
      ref={bottomSheetModalRef}>

      {data?.status === 'driver_arrived' ?
        <BottomSheetView
          className='flex px-8 py-4 gap-2 h-[160px]'
        >
          <Text className="font-primary-semibold text-xl">
            Your Driver has Arrived!
          </Text>
          <View className="w-full relative flex gap-2 flex-row justify-between">
            <View className='w-1/2'>
              <Text className='text-lg font-primary-semibold'>{data?.driver?.name}</Text>
              <Text className='text-md font-primary'>{data?.driver?.car?.make} {data?.driver?.car?.model} {data?.driver?.car?.year}</Text>
              <Text className='text-md font-primary'>{data?.driver?.car?.plate}</Text>
            </View>
            <View className='w-1/2'>
              <Image
                className='ml-auto -mt-12'
                source={carImages[data?.driver?.car?.color]}
                style={{ width: 140, height: 140 }}
                resizeMode='contain'
              />
            </View>
          </View>
        </BottomSheetView>
        :
        <BottomSheetView
          className='flex p-8 gap-8 h-[200px]'
        >
          <LinearLoader />
          <View className="w-full flex gap-2 flex-row justify-between">
            <Text className="font-primary-semibold text-xl">
              Confirming your ride
            </Text>
            <Text className='font-primary-semibold text-2xl'>
              ${data?.price}
            </Text>
          </View>
        </BottomSheetView>
      }
    </BottomSheetModal>
  );
};

export default ViewRide;
