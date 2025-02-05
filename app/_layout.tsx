import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { APIProvider } from '@/api/common/api-provider';
import { AppProvider } from 'contexts/AppContext';

import "../global.css";


export default function RootLayout() {
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
    <Providers>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <APIProvider>
      <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            {children}
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </AppProvider>
    </APIProvider>
  )
}