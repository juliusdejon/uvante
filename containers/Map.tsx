import React, { useContext, useState, useEffect, } from 'react';
import { View } from 'react-native';
import Mapbox, { Camera, MapView, PointAnnotation, ShapeSource, LineLayer } from '@rnmapbox/maps';
import Config from 'config';
import { AppContext } from 'contexts/AppContext';
import { useRoute } from 'hooks/useRoute';
import Dot from 'components/Dot';
import Pin from 'components/Pin';

Mapbox.setAccessToken(Config.MAP_BOX_ACCESS_TOKEN);

const centerCoordinate = [-79.252547, 43.747661];

const Map = () => {
  const { pickUp, dropOff } = useContext(AppContext);
  const route = useRoute(pickUp, dropOff);

  return (
    <View className='flex-1 w-full'>
      <MapView
        style={{ width: '100%', height: '100%' }}
        zoomEnabled={true}
      >
        <CameraView pickUp={pickUp} dropOff={dropOff} />

        {centerCoordinate ?
          <Marker id="0" coordinate={centerCoordinate} Icon={<Dot />} />
          : null
        }
        <Marker id="1" coordinate={pickUp} Icon={<Dot />} />
        <Marker id="2" coordinate={dropOff} Icon={<Pin />} />

        {route ? (
          <AnimatedRoute route={route} />
        ) : null}
      </MapView>
    </View>
  );
};

const AnimatedRoute = ({ route }) => {
  const [dashArray, setDashArray] = useState([0, 120]);

  useEffect(() => {
    if (!route) return;

    let progress = 0;
    const totalSteps = 120;
    let animationFrameId;

    const animateRoute = () => {
      progress += 2;
      if (progress > totalSteps) progress = totalSteps;

      setDashArray([progress, 120 - progress]);

      if (progress < totalSteps) {
        animationFrameId = requestAnimationFrame(animateRoute);
      }
    };

    animationFrameId = requestAnimationFrame(animateRoute);

    return () => cancelAnimationFrame(animationFrameId);
  }, [route]);

  return (
    <ShapeSource id="routeSource" shape={route}>
      <LineLayer id="routeLine" style={{ lineColor: 'blue', lineWidth: 4, lineDasharray: dashArray, }} />
    </ShapeSource>
  )
}

const CameraView = ({ pickUp, dropOff }) => {
  const bounds = pickUp && dropOff ? {
    ne: [Math.max(pickUp[0], dropOff[0]), Math.max(pickUp[1], dropOff[1])],
    sw: [Math.min(pickUp[0], dropOff[0]), Math.min(pickUp[1], dropOff[1])],
  } : null;

  return (
    <Camera
      centerCoordinate={pickUp && dropOff ? null : centerCoordinate}
      zoomLevel={pickUp && dropOff ? null : 13}
      bounds={bounds}
      padding={{ paddingTop: 100, paddingBottom: 450, paddingLeft: 100, paddingRight: 100 }}
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


