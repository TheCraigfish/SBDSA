import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(() => Promise.resolve({ isConnected: true, isInternetReachable: true })),
  addEventListener: jest.fn(),
}));

// Mock SQLite
jest.mock('react-native-sqlite-storage', () => ({
  openDatabase: jest.fn(() => ({
    transaction: jest.fn(),
    executeSql: jest.fn(),
  })),
}));

// Mock WatermelonDB
jest.mock('@nozbe/watermelondb', () => ({
  Database: jest.fn(),
  Model: jest.fn(),
  Query: jest.fn(),
  Relation: jest.fn(),
  field: jest.fn(),
  date: jest.fn(),
  readonly: jest.fn(),
  writer: jest.fn(),
  children: jest.fn(),
}));

// Mock Vector Icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

// Mock react-native-video
jest.mock('react-native-video', () => 'Video');

// Mock react-native-paper
jest.mock('react-native-paper', () => ({
  Provider: ({ children }) => children,
  Portal: ({ children }) => children,
  Modal: ({ children, visible, onDismiss }) => (visible ? children : null),
  Button: ({ children, onPress, mode }) => <button onClick={onPress} data-mode={mode}>{children}</button>,
  TextInput: ({ label, value, onChangeText }) => (
    <div>
      <label>{label}</label>
      <input value={value} onChange={(e) => onChangeText(e.target.value)} />
    </div>
  ),
  Card: ({ children, style }) => <div style={style}>{children}</div>,
  Title: ({ children }) => <h1>{children}</h1>,
  Paragraph: ({ children }) => <p>{children}</p>,
}));

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    isFocused: jest.fn(() => true),
    addListener: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
    name: 'MockScreen',
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn(() => true),
  NavigationContainer: ({ children }) => children,
  createNavigationContainerRef: jest.fn(),
}));

// Mock Redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  Provider: ({ children }) => children,
}));

// Setup global test environment
global.__DEV__ = true;

// Mock console methods in tests
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};