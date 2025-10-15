import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgramStackParamList } from '@sbdsa/shared';

// Import program screens
import ProgramListScreen from '../screens/programs/ProgramListScreen';
import ProgramDetailScreen from '../screens/programs/ProgramDetailScreen';
import ActiveProgramScreen from '../screens/programs/ActiveProgramScreen';
import ProgramLibraryScreen from '../screens/programs/ProgramLibraryScreen';

const Stack = createNativeStackNavigator<ProgramStackParamList>();

export const ProgramNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProgramList"
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
        name="ProgramList" 
        component={ProgramListScreen}
        options={{ 
          title: 'Programs',
          headerShown: false, // Hide header for tab screens
        }}
      />
      <Stack.Screen 
        name="ProgramDetail" 
        component={ProgramDetailScreen}
        options={{ 
          title: 'Program Details',
        }}
      />
      <Stack.Screen 
        name="ActiveProgram" 
        component={ActiveProgramScreen}
        options={{ 
          title: 'Active Program',
        }}
      />
      <Stack.Screen 
        name="ProgramLibrary" 
        component={ProgramLibraryScreen}
        options={{ 
          title: 'Program Library',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProgramNavigator;