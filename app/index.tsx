import { useNavigation } from 'expo-router';
import { View, Text } from 'react-native';
import { useEffect } from 'react';
import Map from '../components/map';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '../components/bottom-sheet';

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Map />

      <BottomSheet />
    </GestureHandlerRootView>
  );
}