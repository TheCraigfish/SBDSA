import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'ActiveWorkout'>;

interface ActiveExercise {
  id: string;
  name: string;
  sets: ActiveSet[];
  currentSet: number;
  completed: boolean;
}

interface ActiveSet {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
}

const ActiveWorkoutScreen: React.FC<Props> = ({ route, navigation }) => {
  const { workoutId } = route.params || {};
  const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState(0);
  const [timer, setTimer] = React.useState(0);

  const workoutExercises: ActiveExercise[] = [
    {
      id: '1',
      name: 'Barbell Squat',
      currentSet: 3,
      completed: false,
      sets: [
        { id: '1', setNumber: 1, weight: 120, reps: 5, completed: true },
        { id: '2', setNumber: 2, weight: 120, reps: 5, completed: true },
        { id: '3', setNumber: 3, weight: 120, reps: 5, completed: false },
        { id: '4', setNumber: 4, weight: 120, reps: 5, completed: false },
        { id: '5', setNumber: 5, weight: 120, reps: 5, completed: false },
      ],
    },
    {
      id: '2',
      name: 'Leg Press',
      currentSet: 1,
      completed: false,
      sets: [
        { id: '6', setNumber: 1, weight: 200, reps: 10, completed: false },
        { id: '7', setNumber: 2, weight: 200, reps: 10, completed: false },
        { id: '8', setNumber: 3, weight: 200, reps: 10, completed: false },
      ],
    },
  ];

  const currentExercise = workoutExercises[currentExerciseIndex];

  const handleCompleteSet = () => {
    Alert.alert(
      'Complete Set',
      `Did you complete ${currentExercise.sets[currentExercise.currentSet - 1].weight}kg × ${currentExercise.sets[currentExercise.currentSet - 1].reps} reps?`,
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => {
          // Mark set as completed and move to next set
          if (currentExercise.currentSet < currentExercise.sets.length) {
            // Move to next set
            const updatedExercises = [...workoutExercises];
            updatedExercises[currentExerciseIndex].currentSet += 1;
            updatedExercises[currentExerciseIndex].sets[currentExercise.currentSet - 1].completed = true;
            setCurrentExerciseIndex(0); // Force re-render
          } else {
            // Move to next exercise
            if (currentExerciseIndex < workoutExercises.length - 1) {
              setCurrentExerciseIndex(currentExerciseIndex + 1);
            } else {
              // Workout completed
              Alert.alert('Workout Complete!', 'Great job! You finished all exercises.');
              navigation.goBack();
            }
          }
        }},
      ]
    );
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex < workoutExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      Alert.alert('Workout Complete!', 'Great job! You finished all exercises.');
      navigation.goBack();
    }
  };

  const handleEndWorkout = () => {
    Alert.alert(
      'End Workout',
      'Are you sure you want to end this workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'End Workout', onPress: () => navigation.goBack() },
      ]
    );
  };

  const renderSet = ({ item }: { item: ActiveSet }) => (
    <View style={[
      styles.setCard,
      item.completed ? styles.completedSet : styles.incompleteSet
    ]}>
      <Text style={styles.setNumber}>Set {item.setNumber}</Text>
      <Text style={styles.setDetails}>{item.weight} kg × {item.reps} reps</Text>
      <Text style={styles.setStatus}>
        {item.completed ? '✓' : currentExercise.currentSet === item.setNumber ? 'Current' : 'Pending'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Workout</Text>
        <TouchableOpacity style={styles.endButton} onPress={handleEndWorkout}>
          <Text style={styles.endButtonText}>End</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Exercise {currentExerciseIndex + 1} of {workoutExercises.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentExerciseIndex + 1) / workoutExercises.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{currentExercise.name}</Text>
        <Text style={styles.setInfo}>Set {currentExercise.currentSet} of {currentExercise.sets.length}</Text>
      </View>

      <View style={styles.currentSetContainer}>
        <Text style={styles.currentSetTitle}>Current Set</Text>
        <View style={styles.currentSetCard}>
          <Text style={styles.currentSetDetails}>
            {currentExercise.sets[currentExercise.currentSet - 1].weight} kg × {currentExercise.sets[currentExercise.currentSet - 1].reps} reps
          </Text>
        </View>
      </View>

      <View style={styles.setsContainer}>
        <Text style={styles.setsTitle}>All Sets</Text>
        <FlatList
          data={currentExercise.sets}
          renderItem={renderSet}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.setsList}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipExercise}>
          <Text style={styles.skipButtonText}>Skip Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteSet}>
          <Text style={styles.completeButtonText}>Complete Set</Text>
        </TouchableOpacity>
      </View>
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
  endButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#d32f2f',
    borderRadius: 8,
  },
  endButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    padding: 20,
  },
  progressText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00875A',
    borderRadius: 4,
  },
  exerciseContainer: {
    padding: 20,
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  setInfo: {
    fontSize: 16,
    color: '#ccc',
  },
  currentSetContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  currentSetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  currentSetCard: {
    backgroundColor: '#2a4a3a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  currentSetDetails: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  setsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  setsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  setsList: {
    flex: 1,
  },
  setCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  completedSet: {
    backgroundColor: '#333',
  },
  incompleteSet: {
    backgroundColor: '#444',
  },
  setNumber: {
    fontSize: 16,
    color: '#ccc',
    width: 60,
  },
  setDetails: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  setStatus: {
    fontSize: 16,
    color: '#00875A',
    fontWeight: 'bold',
    width: 80,
    textAlign: 'right',
  },
  buttonsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#666',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  completeButton: {
    flex: 2,
    backgroundColor: '#00875A',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ActiveWorkoutScreen;