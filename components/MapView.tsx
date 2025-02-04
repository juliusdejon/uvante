import { View } from 'react-native'
import React from 'react'
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoianVsaXVzZGVqb24iLCJhIjoiY202b3YwcHVlMHRyNTJscTBkYW96bDI4MyJ9.DE9eY_MiUPSbRMsuI7b28g');


const Map = () => {
  return (
    <View className='flex w-full'>
      <Mapbox.MapView style={{ width: '100%', height: '100%' }} />
    </View>
  )
}

export default Map