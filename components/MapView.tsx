import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Mapbox, { Camera, MapView, PointAnnotation, ShapeSource, LineLayer } from '@rnmapbox/maps';
import Config from 'config';
import * as Location from 'expo-location';
import axios from 'axios';

Mapbox.setAccessToken(Config.MAP_BOX_ACCESS_TOKEN);

const Map = () => {
  const [route, setRoute] = useState(null);
  const startCoordinate = [-79.252547, 43.747661];
  const endCoordinate = [-79.257790, 43.775944];

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinate.join(',')};${endCoordinate.join(',')}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${Config.MAP_BOX_ACCESS_TOKEN}`
        );
        setRoute(response.data.routes[0].geometry);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
      >
        <Camera
          bounds={{
            ne: [Math.max(startCoordinate[0], endCoordinate[0]), Math.max(startCoordinate[1], endCoordinate[1])],
            sw: [Math.min(startCoordinate[0], endCoordinate[0]), Math.min(startCoordinate[1], endCoordinate[1])],
          }}
        />
        <PointAnnotation
          id={'1'}
          coordinate={startCoordinate}
        >
          <View style={styles.startMarker} />
        </PointAnnotation>

        <PointAnnotation
          id={'2'}
          coordinate={endCoordinate}
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