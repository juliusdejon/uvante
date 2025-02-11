import { View } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface PinProps {
  type: 'pickup' | 'dropoff';
}
const Pin = (props: PinProps) => {
  const { type } = props;
  const color = type === 'pickup' ? '#3B82F6' : '#EF4444';

  return (
    <View>
      <FontAwesome name="map-marker" size={24} color={color} className='mr-1' />
    </View>
  )
}


export default Pin