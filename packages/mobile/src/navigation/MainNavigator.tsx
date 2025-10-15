import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@sbdsa/shared';
import { Icon } from 'react-native-paper';

// Import tab screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import WorkoutNavigator from './WorkoutNavigator';
import ProgramNavigator from './ProgramNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
              break;
            case 'Workouts':
              iconName = focused ? 'dumbbell' : 'dumbbell-outline';
              break;
            case 'Programs':
              iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
              break;
            case 'Profile':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Icon source={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00875A', // South African green
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Workouts" 
        component={WorkoutNavigator}
        options={{
          tabBarLabel: 'Workouts',
        }}
      />
      <Tab.Screen 
        name="Programs" 
        component={ProgramNavigator}
        options={{
          tabBarLabel: 'Programs',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;