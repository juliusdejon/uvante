import { Stack } from 'expo-router';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

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

const queryClient = new QueryClient()

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Stack>
          <Stack.Screen name="home" options={{}} />
        </Stack>
      </AppProvider>
    </QueryClientProvider>
  );
}
