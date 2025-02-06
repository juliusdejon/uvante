import { View, Text } from 'react-native'
import React from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { Ride } from '@/api/rides/types'
import RideDetails from './RideDetails'

interface DriverArrivedProps {
  ride: Ride,
}

const DriverArrived = (props: DriverArrivedProps) => {
  const { ride } = props;
  return (
    <BottomSheetView className='flex px-8 py-4 gap-2 h-[160px]'>
      <Text className="font-primary-semibold text-xl">
        Your Driver has Arrived!
      </Text>
      <RideDetails ride={ride} />
    </BottomSheetView>
  )
}

export default DriverArrived