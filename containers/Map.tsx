import { View, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Mapbox, { Camera, MapView, PointAnnotation, ShapeSource, LineLayer } from '@rnmapbox/maps';
import Config from 'config';
import axios from 'axios';
import { AppContext } from 'contexts/AppContext';

Mapbox.setAccessToken(Config.MAP_BOX_ACCESS_TOKEN);

const Map = () => {
  const [route, setRoute] = useState(null);
  // const startCoordinate = [-79.252547, 43.747661];
  // const endCoordinate = [-79.257790, 43.775944];
  const centerCoordinate = [-79.252547, 43.747661];
  const { pickUp, dropOff } = useContext(AppContext)
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUp.join(',')};${dropOff.join(',')}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${Config.MAP_BOX_ACCESS_TOKEN}`
        );
        setRoute(response.data.routes[0].geometry);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    if (pickUp && dropOff) {
      fetchRoute();
    }
  }, [pickUp, dropOff]);

  return (
    <View style={styles.container}>
      <MapView
        zoomEnabled={true}
        style={styles.map}
      >
        <Camera
          centerCoordinate={centerCoordinate}
          bounds={
            (pickUp && dropOff)
              ? {
                ne: [Math.max(pickUp[0], dropOff[0]), Math.max(pickUp[1], dropOff[1])],
                sw: [Math.min(pickUp[0], dropOff[0]), Math.min(pickUp[1], dropOff[1])],
              } : null}
          animationDuration={1000} // Animation duration in milliseconds
          animationMode="flyTo"
        />
        {centerCoordinate && (<PointAnnotation
          id={'1'}
          coordinate={centerCoordinate}
        >
          <View style={styles.startMarker} />
        </PointAnnotation>)}

        <PointAnnotation
          id={'1'}
          coordinate={pickUp}
        >
          <View style={styles.startMarker} />
        </PointAnnotation>

        <PointAnnotation
          id={'2'}
          coordinate={dropOff}
        >
          <View style={styles.endMarker} />
        </PointAnnotation>

        {route && (
          <ShapeSource id="routeSource" shape={route}>
            <LineLayer id="routeLine" style={{ lineColor: 'blue', lineWidth: 4 }} />
          </ShapeSource>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  startMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285F4',
    borderWidth: 2,
    borderColor: '#fff',
  },
  endMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ee5253',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Map;