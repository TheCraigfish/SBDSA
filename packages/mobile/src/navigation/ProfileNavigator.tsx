import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@sbdsa/shared';

// Import profile screens
import ProfileDetailScreen from '../screens/profile/ProfileDetailScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import PersonalRecordsScreen from '../screens/profile/PersonalRecordsScreen';
import AnalyticsScreen from '../screens/profile/AnalyticsScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileDetail"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="ProfileDetail" 
        component={ProfileDetailScreen}
        options={{ 
          title: 'Profile',
          headerShown: false, // Hide header for tab screens
        }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ 
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          title: 'Settings',
        }}
      />
      <Stack.Screen 
        name="PersonalRecords" 
        component={PersonalRecordsScreen}
        options={{ 
          title: 'Personal Records',
        }}
      />
      <Stack.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{ 
          title: 'Analytics',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;