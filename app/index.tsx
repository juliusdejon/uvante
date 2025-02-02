import { useNavigation } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { useEffect } from 'react';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';


export default function Home() {
  const navigation = useNavigation();
  const width = useSharedValue(100);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const handlePress = () => {
    width.value = withSpring(width.value + 50);

  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Animated.View
      style={{
        width,
        height: 100,
        backgroundColor: 'violet',
      }}
    />
          <Button onPress={handlePress} title="Click me" />

      <Text>Home Screen</Text>
    </View>
  );
}