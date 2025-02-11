import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import BookRide from 'app/map/book-ride';
import SearchLocation from 'containers/SearchLocation';
import TextField from 'components/TextField';


import { AppContext } from 'contexts/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Pin from 'components/Pin';
import Dot from 'components/Dot';


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

const queryClient = new QueryClient();

const BookRideProviders = ({ children }) => {
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

  return (

    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={mockContextValue}>
        <GestureHandlerRootView>
          {children}
        </GestureHandlerRootView>
      </AppContext.Provider>
    </QueryClientProvider>
  )
}
describe('Book Ride', () => {

  it('should show booking screen', () => {

    const { getByText } = render(
      <BookRideProviders>
        <BookRide />
      </BookRideProviders>
    );
    expect(getByText('Hey Julius,')).toBeTruthy();
    expect(getByText('Where are you going?')).toBeTruthy();
  });

  it('should show display the book ride button', () => {

    const { getByText } = render(
      <BookRideProviders>
        <BookRide />
      </BookRideProviders>
    );
    expect(getByText('Book Ride')).toBeTruthy();
  });


  describe('SearchLocation', () => {
    it('should display Choose pick up point', () => {
      const { getByPlaceholderText } = render(
        <BookRideProviders>
          <SearchLocation Icon={<Dot />} placeholder="Choose pick up point" setCoordinates={() => { }} onTouchEnd={() => { }} />
        </BookRideProviders>
      );
      expect(getByPlaceholderText('Choose pick up point')).toBeTruthy();
    });



    it('should display Enter drop-off location', () => {
      const { getByPlaceholderText } = render(
        <BookRideProviders>
          <SearchLocation Icon={<Pin type="dropoff" />} placeholder="Enter drop-off location" setCoordinates={() => { }} onTouchEnd={() => { }} />
        </BookRideProviders>
      );
      expect(getByPlaceholderText('Enter drop-off location')).toBeTruthy();
    });

    describe('TextField', () => {
      it('should update the textfield', async () => {
        const mockOnChangeText = jest.fn();
        const { getByTestId } = render(
          <BookRideProviders>
            <TextField value="" onChangeText={mockOnChangeText} />
          </BookRideProviders>
        );

        const input = getByTestId('u-txtField');

        fireEvent.changeText(input, '713 Brimley Rd');

        expect(mockOnChangeText).toHaveBeenCalledWith('713 Brimley Rd');
      });
    })




  })

});
