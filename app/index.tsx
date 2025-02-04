import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Map from 'components/map';
import BookRide from 'containers/book-ride';

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Map />
      <BookRide />
    </GestureHandlerRootView>
  );
}