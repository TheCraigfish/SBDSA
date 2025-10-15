import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import { AppNavigator } from './navigation/AppNavigator';
import { theme } from './theme';
import LoadingIndicator from './components/common/LoadingIndicator';
import SyncStatusIndicator from './components/common/SyncStatusIndicator';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
            <AppNavigator />
            <SyncStatusIndicator />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;