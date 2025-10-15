import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutHistory'>;

interface WorkoutHistory {
  id: string;
  name: string;
  date: string;
  duration: string;
  exercisesCount: number;
  volume: number;
}

const WorkoutHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const workoutHistory: WorkoutHistory[] = [
    { id: '1', name: 'Squat Day', date: '2023-10-20', duration: '75 min', exercisesCount: 4, volume: 5420 },
    { id: '2', name: 'Bench Day', date: '2023-10-18', duration: '60 min', exercisesCount: 5, volume: 3850 },
    { id: '3', name: 'Deadlift Day', date: '2023-10-15', duration: '80 min', exercisesCount: 3, volume: 6120 },
    { id: '4', name: 'Upper Body', date: '2023-10-13', duration: '65 min', exercisesCount: 6, volume: 4280 },
    { id: '5', name: 'Lower Body', date: '2023-10-11', duration: '70 min', exercisesCount: 5, volume: 4950 },
    { id: '6', name: 'Full Body', date: '2023-10-09', duration: '85 min', exercisesCount: 7, volume: 5200 },
    { id: '7', name: 'Squat Day', date: '2023-10-06', duration: '72 min', exercisesCount: 4, volume: 5180 },
    { id: '8', name: 'Bench Day', date: '2023-10-04', duration: '58 min', exercisesCount: 5, volume: 3720 },
  ];

  const handleWorkoutPress = (workoutId: string) => {
    navigation.navigate('WorkoutDetail', { workoutId });
  };

  const getTotalVolume = () => {
    return workoutHistory.reduce((total, workout) => total + workout.volume, 0);
  };

  const getTotalWorkouts = () => {
    return workoutHistory.length;
  };

  const getAverageWorkoutDuration = () => {
    const totalMinutes = workoutHistory.reduce((total, workout) => {
      const minutes = parseInt(workout.duration.split(' ')[0]);
      return total + minutes;
    }, 0);
    return Math.round(totalMinutes / workoutHistory.length);
  };

  const renderWorkout = ({ item }: { item: WorkoutHistory }) => (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => handleWorkoutPress(item.id)}
    >
      <View style={styles.workoutHeader}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.workoutDate}>{item.date}</Text>
      </View>
      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.duration}</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.exercisesCount}</Text>
          <Text style={styles.statLabel}>Exercises</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.volume.toLocaleString()} kg</Text>
          <Text style={styles.statLabel}>Volume</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout History</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{getTotalWorkouts()}</Text>
          <Text style={styles.summaryLabel}>Total Workouts</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{getTotalVolume().toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>Total Volume (kg)</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{getAverageWorkoutDuration()} min</Text>
          <Text style={styles.summaryLabel}>Avg Duration</Text>
        </View>
      </View>

      <FlatList
        data={workoutHistory}
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '30%',
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00875A',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
  workoutList: {
    padding: 20,
  },
  workoutCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  workoutDate: {
    fontSize: 14,
    color: '#ccc',
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00875A',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#ccc',
  },
});

export default WorkoutHistoryScreen;