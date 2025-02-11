import React, { useCallback, useContext } from 'react';
import { View } from 'react-native';
import Mapbox, { MapView, MarkerView, PointAnnotation } from '@rnmapbox/maps';
import Config from '@/config/index';
import { AppContext } from 'contexts/AppContext';
import { useRoute } from 'hooks/useRoute';
import Dot from 'components/Dot';
import Pin from 'components/Pin';
import { useRide } from '@/api/rides';
import { Coordinate } from 'types/types';
import AnimatedRoute from './AnimatedRoute';
import CameraView from './CameraView';
import Marker from './Marker';
import PickupPoint from './PickupPoint';

Mapbox.setAccessToken(Config.MAP_BOX_ACCESS_TOKEN);

const currentLocation: Coordinate = [-79.252547, 43.747661];

const Map = () => {
  const { pickUp, dropOff, rideId } = useContext(AppContext);
  const route = useRoute(pickUp, dropOff);
  const { data: ride } = useRide(rideId);

  const driverAssigned = ride?.status === 'driver_assigned';
  const driverArrived = ride?.status === 'driver_arrived';
  const completed = ride?.status === 'completed';


  return (
    <View className='flex-1 w-full'>
      <MapView
        style={{ width: '100%', height: '100%' }}
        zoomEnabled={true}
      >
        <CameraView
          pickUp={pickUp}
          dropOff={dropOff}
          focusOnPickUpLocation={driverArrived}
          focusOnDropOffLocation={completed}
          centerCoordinate={currentLocation}
        />

        {currentLocation ?
          <Marker id="0" coordinate={currentLocation} Icon={<Dot />} />
          : null
        }

        <PickupPoint />

        <Marker id="2" coordinate={dropOff} Icon={<Pin type="dropoff" />} />

        {route && !completed ? (
          <AnimatedRoute
            route={route}
            loop={driverAssigned ? true : false}
            speed={1.5} />
        ) : null}
      </MapView>
    </View>
  );
};


export default Map;


