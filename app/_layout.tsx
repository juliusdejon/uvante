import { Stack } from 'expo-router';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { AppProvider } from 'contexts/AppContext';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

import "../global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient()

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    if (error) {
      console.error('Error loading fonts', error);
    }
    return null;
  }


  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="home" options={{}} />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </AppProvider>
    </QueryClientProvider>
  );
}
