import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootState, AppDispatch } from '../store';
import { loginUser } from '../store/slices/authSlice';
import { checkConnectionStatus } from '../store/slices/syncSlice';
import { setFirstLaunch } from '../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import navigators
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

// Import types
import { RootStackParamList } from '@sbdsa/shared';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isFirstLaunch } = useSelector((state: RootState) => state.auth);
  const { isOnline } = useSelector((state: RootState) => state.sync);

  // Check connection status on app start
  useEffect(() => {
    dispatch(checkConnectionStatus());
  }, [dispatch]);

  // Check if it's the first launch
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // First time launching the app
          dispatch(setFirstLaunch(true));
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          dispatch(setFirstLaunch(false));
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        dispatch(setFirstLaunch(false));
      }
    };

    checkFirstLaunch();
  }, [dispatch]);

  // Try to restore authentication state on app start
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const tokensJson = await AsyncStorage.getItem('authTokens');
        if (tokensJson) {
          const tokens = JSON.parse(tokensJson);
          // In a real app, you would validate the token and possibly refresh it
          // For now, we'll just mark the user as authenticated
          // dispatch(loginUser({ email: '', password: '' }));
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
      }
    };

    restoreAuth();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
        {isFirstLaunch && (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Add necessary imports
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

// Temporary OnboardingScreen component (will be expanded later)
const OnboardingScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const handleGetStarted = () => {
    dispatch(setFirstLaunch(false));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
      <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>
        Welcome to SBD SA
      </Text>
      <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', paddingHorizontal: 20, marginBottom: 40 }}>
        Your South African Powerlifting Companion
      </Text>
      <Button mode="contained" onPress={handleGetStarted}>
        Get Started
      </Button>
    </View>
  );
};

export default AppNavigator;