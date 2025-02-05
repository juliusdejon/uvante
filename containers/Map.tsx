import React, { useContext } from 'react';
import { View } from 'react-native';
import Mapbox, { Camera, MapView, PointAnnotation, ShapeSource, LineLayer } from '@rnmapbox/maps';
import Config from 'config';
import { AppContext } from 'contexts/AppContext';
import { useRoute } from 'hooks/useRoute';

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
          <Marker id="0" coordinate={centerCoordinate} style="w-5 h-5 rounded-full bg-blue-500 border-2 border-white" />
          : null
        }
        <Marker id="1" coordinate={pickUp} style="w-5 h-5 rounded-full bg-blue-500 border-2 border-white" />
        <Marker id="2" coordinate={dropOff} style="w-5 h-5 rounded-full bg-red-500 border-2 border-white" />

        {route ? (
          <ShapeSource id="routeSource" shape={route}>
            <LineLayer id="routeLine" style={{ lineColor: 'blue', lineWidth: 4 }} />
          </ShapeSource>
        ) : null}
      </MapView>
    </View>
  );
};


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

const Marker = ({ id, coordinate, style }) => (
  <PointAnnotation id={id} coordinate={coordinate}>
    <View className={style} />
  </PointAnnotation>
);


export default Map;


