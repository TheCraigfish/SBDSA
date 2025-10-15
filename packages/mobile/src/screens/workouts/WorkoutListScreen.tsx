import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutList'>;

interface Workout {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  exercisesCount: number;
}

const WorkoutListScreen: React.FC<Props> = ({ navigation }) => {
  const workouts: Workout[] = [
    { id: '1', name: 'Squat Day', date: '2023-10-20', completed: true, exercisesCount: 4 },
    { id: '2', name: 'Bench Day', date: '2023-10-18', completed: true, exercisesCount: 5 },
    { id: '3', name: 'Deadlift Day', date: '2023-10-15', completed: true, exercisesCount: 3 },
    { id: '4', name: 'Upper Body', date: '2023-10-13', completed: false, exercisesCount: 6 },
    { id: '5', name: 'Lower Body', date: '2023-10-11', completed: false, exercisesCount: 5 },
  ];

  const handleWorkoutPress = (workoutId: string) => {
    navigation.navigate('WorkoutDetail', { workoutId });
  };

  const handleStartNewWorkout = () => {
    navigation.navigate('ActiveWorkout', { workoutId: undefined });
  };

  const handleViewHistory = () => {
    navigation.navigate('WorkoutHistory');
  };

  const renderWorkout = ({ item }: { item: Workout }) => (
    <TouchableOpacity
      style={[
        styles.workoutCard,
        item.completed ? styles.completedWorkout : styles.incompleteWorkout
      ]}
      onPress={() => handleWorkoutPress(item.id)}
    >
      <View style={styles.workoutHeader}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={[
          styles.workoutStatus,
          item.completed ? styles.completedText : styles.incompleteText
        ]}>
          {item.completed ? 'Completed' : 'In Progress'}
        </Text>
      </View>
      <View style={styles.workoutDetails}>
        <Text style={styles.workoutDate}>{item.date}</Text>
        <Text style={styles.workoutExercises}>{item.exercisesCount} exercises</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity style={styles.historyButton} onPress={handleViewHistory}>
          <Text style={styles.historyButtonText}>History</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.startWorkoutButton} onPress={handleStartNewWorkout}>
        <Text style={styles.startWorkoutButtonText}>Start New Workout</Text>
      </TouchableOpacity>

      <FlatList
        data={workouts}
        renderItem={renderWorkout}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.workoutList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  historyButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  historyButtonText: {
    color: '#00875A',
    fontSize: 14,
    fontWeight: '600',
  },
  startWorkoutButton: {
    backgroundColor: '#00875A',
    margin: 20,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startWorkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  workoutList: {
    padding: 20,
  },
  workoutCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  completedWorkout: {
    backgroundColor: '#333',
  },
  incompleteWorkout: {
    backgroundColor: '#2a4a3a',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  workoutStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  completedText: {
    color: '#00875A',
  },
  incompleteText: {
    color: '#ffc107',
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutDate: {
    fontSize: 14,
    color: '#ccc',
  },
  workoutExercises: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default WorkoutListScreen;