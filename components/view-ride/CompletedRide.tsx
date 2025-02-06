import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React, { useContext } from 'react'
import StarRating from 'components/StarRating';
import Button from 'components/Button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ride } from '@/api/rides/types';
import { AppContext } from 'contexts/AppContext';
import { useRouter } from 'expo-router';
import { carImages } from './RideDetails';


interface CompletedRideProps {
  ride: Ride;
}
const CompletedRide = (props: CompletedRideProps) => {
  const { resetState } = useContext(AppContext);
  const router = useRouter();

  const { ride } = props;
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
      <Button onPress={() => {
        resetState();
        router.push('/map/book-ride')
      }}>
        Leave a Review
      </Button>
    </BottomSheetView>
  )
}

export default CompletedRide