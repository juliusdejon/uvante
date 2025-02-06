import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated before using it
jest.mock('react-native-reanimated', () => {
  const ReanimatedMock = jest.createMockFromModule('react-native-reanimated');
  ReanimatedMock.default = jest.fn();
  return ReanimatedMock;
});

jest.mock('react-native-gesture-handler', () => {
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: ({ children }) => children,
  };
});


jest.mock('@gorhom/bottom-sheet', () => {
  return {
    GorHomBottomSheet: jest.fn().mockImplementation(() => null),
    BottomSheetView: jest.fn().mockImplementation(() => null),
  };
});

jest.mock('expo-router', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
  };
});

jest.mock('@expo/vector-icons/FontAwesome', () => {
  return {
    FontAwesome: 'MockedFontAwesome',  // This can be just a placeholder for your test
  };
});