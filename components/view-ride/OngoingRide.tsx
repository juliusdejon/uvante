import { Text } from 'react-native'
import React from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { Ride } from '@/api/rides/types'
import RideDetails from './RideDetails'
import LinearLoader from 'components/LinearLoader'

interface OngoingDriveProps {
  ride: Ride,
}

const OngoingDrive = (props: OngoingDriveProps) => {
  const { ride } = props;
  return (
    <BottomSheetView className='flex px-8 py-4 gap-2 h-[160px]'>
      <Text className="font-primary-semibold text-xl">
        Your Ride has Started!
      </Text>
      <LinearLoader />
      <RideDetails ride={ride} />
    </BottomSheetView>
  )
}

export default OngoingDrive