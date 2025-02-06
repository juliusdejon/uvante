import React, { useContext, useState, useEffect, } from 'react';
import { View } from 'react-native';
import Mapbox, { Camera, MapView, PointAnnotation, ShapeSource, LineLayer } from '@rnmapbox/maps';
import Config from 'config';
import { AppContext } from 'contexts/AppContext';
import { useRoute } from 'hooks/useRoute';
import Dot from 'components/Dot';
import Pin from 'components/Pin';
import { useRide } from '@/api/rides';
import { Coordinate } from 'types/types';

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
        <Marker id="1" coordinate={pickUp} Icon={<Dot />} />
        <Marker id="2" coordinate={dropOff} Icon={<Pin />} />

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

const AnimatedRoute = ({ route, loop = false, speed = 1 }: {
  route: any;
  loop: boolean;
  speed?: number;
}) => {

  const [dashArray, setDashArray] = useState([0, 100]);

  useEffect(() => {
    if (!route) return;
    let progress = 0;
    const totalSteps = 100;
    let animationFrameId;
    const animateRoute = () => {
      progress += speed // Adjust speed here
      if (progress > totalSteps) {
        if (loop) {
          progress = 0; // Restart animation
        } else {
          return;
        }
      }
      setDashArray([progress, 100 - progress]);
      animationFrameId = requestAnimationFrame(animateRoute);
    };

    animationFrameId = requestAnimationFrame(animateRoute);

    return () => cancelAnimationFrame(animationFrameId);
  }, [route, loop]);


  return (
    <ShapeSource id="routeSource" shape={route}>
      <LineLayer id="routeLine" style={{
        lineColor: 'blue',
        lineWidth: 4,
        lineDasharray: dashArray,
      }} />
    </ShapeSource>
  )
}

const CameraView = ({
  pickUp,
  dropOff,
  focusOnPickUpLocation,
  focusOnDropOffLocation,
  centerCoordinate,
}: {
  pickUp: Coordinate | null;
  dropOff: Coordinate | null;
  focusOnPickUpLocation: boolean;
  focusOnDropOffLocation: boolean;
  centerCoordinate: Coordinate;
}) => {
  let bounds = null;
  let cameraCenter = centerCoordinate;
  let cameraZoom = 13;
  let cameraPadding = { paddingTop: 100, paddingBottom: 450, paddingLeft: 100, paddingRight: 100 };

  const isTripActive = pickUp && dropOff;

  if (isTripActive) {
    bounds = {
      ne: [Math.max(pickUp[0], dropOff[0]), Math.max(pickUp[1], dropOff[1])],
      sw: [Math.min(pickUp[0], dropOff[0]), Math.min(pickUp[1], dropOff[1])],
    };
  }

  // Determine camera center, zoom, and padding
  if (isTripActive) {
    if (focusOnPickUpLocation) {
      cameraCenter = pickUp;
      cameraZoom = 15;
      cameraPadding = null; // No padding when focusing on pick-up location
    } else if (focusOnDropOffLocation) {
      cameraCenter = dropOff;
      cameraZoom = 15;
      cameraPadding = null; // No padding when focusing on drop-off location
    } else {
      cameraCenter = null;
      cameraZoom = null; // Default zoom for trip
    }
  }

  return (
    <Camera
      centerCoordinate={cameraCenter}
      zoomLevel={cameraZoom}
      bounds={bounds}
      padding={cameraPadding}
      animationDuration={1000}
      animationMode="easeTo"
    />
  );
};

const Marker = ({ id, coordinate, Icon }) => (
  <PointAnnotation id={id} coordinate={coordinate}>
    {Icon}
  </PointAnnotation>
);


export default Map;


