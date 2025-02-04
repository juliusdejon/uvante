import { View, Text } from 'react-native'
import React from 'react'
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoianVsaXVzZGVqb24iLCJhIjoiY202b3YwcHVlMHRyNTJscTBkYW96bDI4MyJ9.DE9eY_MiUPSbRMsuI7b28g');


const Map = () => {
  return (
    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
      <Mapbox.MapView className='flex' />

    </View>
  )
}

export default Map