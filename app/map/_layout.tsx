import { Slot, useNavigation } from "expo-router";
import { View } from "react-native";
import Map from "containers/Map";
import { useEffect } from "react";

export default function MapLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Slot is a placeholder for children components

  return (
    <View style={{ flex: 1 }}>
      <Map />
      <Slot />
    </View>
  );
}