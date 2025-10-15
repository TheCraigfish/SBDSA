import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProgramStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<ProgramStackParamList, 'ProgramDetail'>;

interface WorkoutDay {
  id: string;
  dayNumber: number;
  name: string;
  exercises: string[];
}

const ProgramDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { programId } = route.params;

  const programDetails = {
    id: programId,
    name: '5/3/1 Beginner',
    author: 'Jim Wendler',
    description: 'A simple and effective powerlifting program focused on slow but steady progress. The program is built around the four main lifts: squat, bench press, deadlift, and overhead press.',
    duration: '8 weeks',
    difficulty: 2,
    category: 'Powerlifting',
    frequency: '4 days per week',
  };

  const workoutDays: WorkoutDay[] = [
    {
      id: '1',
      dayNumber: 1,
      name: 'Upper Body - Bench',
      exercises: ['Bench Press', 'Overhead Press', 'Dips', 'Barbell Rows', 'Chin-ups'],
    },
    {
      id: '2',
      dayNumber: 2,
      name: 'Lower Body - Squat',
      exercises: ['Squat', 'Deadlift', 'Leg Press', 'Leg Curls', 'Calf Raises'],
    },
    {
      id: '3',
      dayNumber: 3,
      name: 'Upper Body - Overhead Press',
      exercises: ['Overhead Press', 'Bench Press', 'Dips', 'Barbell Rows', 'Chin-ups'],
    },
    {
      id: '4',
      dayNumber: 4,
      name: 'Lower Body - Deadlift',
      exercises: ['Deadlift', 'Squat', 'Leg Press', 'Leg Curls', 'Calf Raises'],
    },
  ];

  const handleStartProgram = () => {
    navigation.navigate('ActiveProgram', { userProgramId: programId });
  };

  const renderWorkoutDay = ({ item }: { item: WorkoutDay }) => (
    <TouchableOpacity style={styles.workoutDayCard}>
      <View style={styles.workoutDayHeader}>
        <Text style={styles.workoutDayNumber}>Day {item.dayNumber}</Text>
        <Text style={styles.workoutDayName}>{item.name}</Text>
      </View>
      <View style={styles.exercisesContainer}>
        <Text style={styles.exercisesLabel}>Exercises:</Text>
        {item.exercises.map((exercise, index) => (
          <Text key={index} style={styles.exerciseItem}>• {exercise}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return '#4CAF50'; // Green
    if (difficulty <= 3) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 2) return 'Beginner';
    if (difficulty <= 3) return 'Intermediate';
    return 'Advanced';
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{programDetails.name}</Text>
          <Text style={styles.author}>By {programDetails.author}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>{programDetails.duration}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{programDetails.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Frequency:</Text>
            <Text style={styles.detailValue}>{programDetails.frequency}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Difficulty:</Text>
            <Text style={[styles.detailValue, { color: getDifficultyColor(programDetails.difficulty) }]}>
              {getDifficultyText(programDetails.difficulty)}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{programDetails.description}</Text>
        </View>

        <View style={styles.workoutDaysContainer}>
          <Text style={styles.sectionTitle}>Workout Schedule</Text>
          <FlatList
            data={workoutDays}
            renderItem={renderWorkoutDay}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.workoutDaysList}
            scrollEnabled={false}
          />
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartProgram}>
          <Text style={styles.startButtonText}>Start Program</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
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
  author: {
    fontSize: 16,
    color: '#ccc',
  },
  detailsContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#ccc',
  },
  detailValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  descriptionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
  workoutDaysContainer: {
    padding: 20,
  },
  workoutDaysList: {
    paddingBottom: 20,
  },
  workoutDayCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  workoutDayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  workoutDayNumber: {
    fontSize: 16,
    color: '#00875A',
    fontWeight: '600',
  },
  workoutDayName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    textAlign: 'right',
  },
  exercisesContainer: {
    paddingLeft: 10,
  },
  exercisesLabel: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  exerciseItem: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 3,
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

export default ProgramDetailScreen;