import { Ride } from "@/api/rides/types";
import { View, Text, Image } from "react-native";

interface RideDetailsProps {
  ride: Ride,
}

export const carImages = {
  Black: require("../../assets/cars/black.avif"),
  Red: require("../../assets/cars/red.avif"),
  White: require("../../assets/cars/white.avif"),
  Blue: require("../../assets/cars/blue.avif"),
};

const RideDetails = (props: RideDetailsProps) => {
  const { ride } = props;
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

export default RideDetails;
