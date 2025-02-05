import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

import BookRide from 'containers/BookRide';
import ViewRide from 'containers/ViewRide';
import Map from 'containers/Map';
import { View } from 'react-native';


export default function Home() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Map />
      <BookRide />
      <ViewRide />
    </View>
  );
}