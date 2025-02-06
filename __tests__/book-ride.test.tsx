import React from 'react';
import { render } from '@testing-library/react-native';
import BookRide from 'app/map/book-ride';


import { AppContext } from 'contexts/AppContext';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// Mock BottomSheet and BottomSheetView components
jest.mock('@gorhom/bottom-sheet', () => {
  const BottomSheet = ({ children }) => <>{children}</>;
  BottomSheet.displayName = 'BottomSheet';
  const BottomSheetView = ({ children }) => <>{children}</>;
  BottomSheetView.displayName = 'BottomSheetView';
  return {
    __esModule: true,
    default: BottomSheet,
    BottomSheetView,
  };
});

// Mock FontAwesome component
jest.mock('@expo/vector-icons/FontAwesome', () => 'FontAwesome');

// Mock other dependencies if necessary
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn().mockReturnValue({ current: null }),
  useCallback: jest.fn(),
  useEffect: jest.fn(),
  useMemo: jest.fn(),
  useState: jest.fn().mockImplementation((initialValue) => [initialValue, jest.fn()]),
}));


jest.mock('@tanstack/react-query', () => {
  const actualReactQuery = jest.requireActual('@tanstack/react-query');
  return {
    ...actualReactQuery,
    useQuery: jest.fn().mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    })),
    useMutation: jest.fn().mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    })),
    QueryObserver: jest.fn().mockImplementation(() => ({
      getCurrentResult: jest.fn().mockReturnValue({
        data: null,
        error: null,
        isLoading: false,
        isError: false,
        isSuccess: true,
      }),
      subscribe: jest.fn(),
    })),
  };
});
describe('Book Ride', () => {

  const mockSetPickUp = jest.fn();
  const mockSetDropOff = jest.fn();
  const mockSetRideId = jest.fn();
  const mockRouterPush = jest.fn();

  const mockContextValue = {
    pickUp: null,
    dropOff: null,
    rideId: null,
    setPickUp: mockSetPickUp,
    setDropOff: mockSetDropOff,
    setRideId: mockSetRideId,
    resetState: jest.fn(),
  };
  jest.mock('expo-router', () => ({
    useRouter: () => ({
      push: mockRouterPush,
    }),
  }));


  const queryClient = new QueryClient();


  it('should show booking screen', () => {

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={mockContextValue}>
          <GestureHandlerRootView>
            <BookRide />
          </GestureHandlerRootView>
        </AppContext.Provider>
      </QueryClientProvider>
    );

    expect(getByText('Hey Julius,')).toBeTruthy();
    expect(getByText('Where are you going?')).toBeTruthy();
  });
});
