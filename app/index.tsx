import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { useEffect } from 'react';
import Home from '../screens/Home';


export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Home />
    </SafeAreaView>
  );
}