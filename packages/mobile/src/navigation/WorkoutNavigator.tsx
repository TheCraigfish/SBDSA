import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '@sbdsa/shared';

// Import workout screens
import WorkoutListScreen from '../screens/workouts/WorkoutListScreen';
import WorkoutDetailScreen from '../screens/workouts/WorkoutDetailScreen';
import ActiveWorkoutScreen from '../screens/workouts/ActiveWorkoutScreen';
import ExerciseSelectionScreen from '../screens/workouts/ExerciseSelectionScreen';
import WorkoutHistoryScreen from '../screens/workouts/WorkoutHistoryScreen';

const Stack = createNativeStackNavigator<WorkoutStackParamList>();

export const WorkoutNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="WorkoutList"
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
        name="WorkoutList" 
        component={WorkoutListScreen}
        options={{ 
          title: 'Workouts',
          headerShown: false, // Hide header for tab screens
        }}
      />
      <Stack.Screen 
        name="WorkoutDetail" 
        component={WorkoutDetailScreen}
        options={{ 
          title: 'Workout Details',
        }}
      />
      <Stack.Screen 
        name="ActiveWorkout" 
        component={ActiveWorkoutScreen}
        options={{ 
          title: 'Active Workout',
          headerLeft: () => null, // Prevent going back during active workout
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="ExerciseSelection" 
        component={ExerciseSelectionScreen}
        options={{ 
          title: 'Select Exercise',
          presentation: 'modal',
        }}
      />
      <Stack.Screen 
        name="WorkoutHistory" 
        component={WorkoutHistoryScreen}
        options={{ 
          title: 'Workout History',
        }}
      />
    </Stack.Navigator>
  );
};

export default WorkoutNavigator;