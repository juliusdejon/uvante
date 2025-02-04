import { View } from 'react-native'
import React from 'react'
import Mapbox from '@rnmapbox/maps';
import Config from 'config';

Mapbox.setAccessToken(Config.MAP_BOX_ACCESS_TOKEN);


const Map = () => {
  return (
    <View className='flex w-full'>
      <Mapbox.MapView style={{ width: '100%', height: '100%' }} />
    </View>
  )
}

export default Map