import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutDetail'>;

interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  weight: number;
  reps: number;
  completed: boolean;
}

const WorkoutDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { workoutId } = route.params;

  const workoutExercises: WorkoutExercise[] = [
    { id: '1', name: 'Barbell Squat', sets: 5, weight: 120, reps: 5, completed: true },
    { id: '2', name: 'Leg Press', sets: 3, weight: 200, reps: 10, completed: true },
    { id: '3', name: 'Romanian Deadlift', sets: 4, weight: 100, reps: 8, completed: true },
    { id: '4', name: 'Leg Extensions', sets: 3, weight: 60, reps: 12, completed: false },
  ];

  const handleStartWorkout = () => {
    navigation.navigate('ActiveWorkout', { workoutId });
  };

  const handleAddExercise = () => {
    navigation.navigate('ExerciseSelection');
  };

  const renderExercise = ({ item }: { item: WorkoutExercise }) => (
    <TouchableOpacity style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={[
          styles.exerciseStatus,
          item.completed ? styles.completedText : styles.incompleteText
        ]}>
          {item.completed ? '✓' : '○'}
        </Text>
      </View>
      <View style={styles.exerciseDetails}>
        <Text style={styles.exerciseSets}>{item.sets} sets</Text>
        <Text style={styles.exerciseWeight}>{item.weight} kg</Text>
        <Text style={styles.exerciseReps}>{item.reps} reps</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Squat Day</Text>
        <Text style={styles.date}>October 20, 2023</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Exercises</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Total Sets</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>~75</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
      </View>

      <View style={styles.exercisesHeader}>
        <Text style={styles.exercisesTitle}>Exercises</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={workoutExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.exerciseList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
        <Text style={styles.startButtonText}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#ccc',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '30%',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00875A',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#ccc',
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  exercisesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#00875A',
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  exerciseList: {
    paddingHorizontal: 20,
  },
  exerciseCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  exerciseStatus: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  completedText: {
    color: '#00875A',
  },
  incompleteText: {
    color: '#666',
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseSets: {
    fontSize: 14,
    color: '#ccc',
  },
  exerciseWeight: {
    fontSize: 14,
    color: '#ccc',
  },
  exerciseReps: {
    fontSize: 14,
    color: '#ccc',
  },
  startButton: {
    backgroundColor: '#00875A',
    margin: 20,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorkoutDetailScreen;