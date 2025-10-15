import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProgramStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<ProgramStackParamList, 'ActiveProgram'>;

interface WorkoutDay {
  id: string;
  dayNumber: number;
  name: string;
  completed: boolean;
  date?: string;
}

const ActiveProgramScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userProgramId } = route.params;

  const programDetails = {
    id: userProgramId,
    name: '5/3/1 Beginner',
    currentWeek: 3,
    totalWeeks: 8,
    startDate: '2023-10-01',
    endDate: '2023-11-26',
  };

  const workoutDays: WorkoutDay[] = [
    { id: '1', dayNumber: 1, name: 'Upper Body - Bench', completed: true, date: '2023-10-16' },
    { id: '2', dayNumber: 2, name: 'Lower Body - Squat', completed: true, date: '2023-10-18' },
    { id: '3', dayNumber: 3, name: 'Upper Body - Overhead Press', completed: false },
    { id: '4', dayNumber: 4, name: 'Lower Body - Deadlift', completed: false },
  ];

  const handleWorkoutPress = (workoutDay: WorkoutDay) => {
    if (!workoutDay.completed) {
      // Navigate to start workout - need to navigate to the Workouts tab first
      navigation.navigate('WorkoutList' as any, {
        screen: 'ActiveWorkout' as any,
        params: { workoutId: undefined }
      });
    }
  };

  const renderWorkoutDay = ({ item }: { item: WorkoutDay }) => (
    <TouchableOpacity
      style={[
        styles.workoutDayCard,
        item.completed ? styles.completedWorkout : styles.incompleteWorkout
      ]}
      onPress={() => handleWorkoutPress(item)}
      disabled={item.completed}
    >
      <View style={styles.workoutDayHeader}>
        <Text style={styles.workoutDayNumber}>Day {item.dayNumber}</Text>
        <Text style={[
          styles.workoutStatus,
          item.completed ? styles.completedText : styles.incompleteText
        ]}>
          {item.completed ? 'Completed' : 'Upcoming'}
        </Text>
      </View>
      <Text style={styles.workoutDayName}>{item.name}</Text>
      {item.completed && item.date && (
        <Text style={styles.workoutDate}>Completed on {item.date}</Text>
      )}
    </TouchableOpacity>
  );

  const progressPercentage = (programDetails.currentWeek / programDetails.totalWeeks) * 100;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{programDetails.name}</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Week {programDetails.currentWeek} of {programDetails.totalWeeks}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{programDetails.totalWeeks}</Text>
            <Text style={styles.statLabel}>Total Weeks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{programDetails.totalWeeks - programDetails.currentWeek}</Text>
            <Text style={styles.statLabel}>Weeks Left</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{workoutDays.filter(d => d.completed).length}</Text>
            <Text style={styles.statLabel}>Workouts Done</Text>
          </View>
        </View>

        <View style={styles.weekSection}>
          <Text style={styles.sectionTitle}>This Week's Workouts</Text>
          <FlatList
            data={workoutDays}
            renderItem={renderWorkoutDay}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.workoutDaysList}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.datesSection}>
          <Text style={styles.sectionTitle}>Program Timeline</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Start Date:</Text>
              <Text style={styles.dateValue}>{programDetails.startDate}</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>End Date:</Text>
              <Text style={styles.dateValue}>{programDetails.endDate}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.exitButton}>
          <Text style={styles.exitButtonText}>Exit Program</Text>
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
    marginBottom: 15,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
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
    textAlign: 'center',
  },
  weekSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  workoutDaysList: {
    paddingBottom: 10,
  },
  workoutDayCard: {
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
  workoutDayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutDayNumber: {
    fontSize: 16,
    color: '#00875A',
    fontWeight: '600',
  },
  workoutStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  completedText: {
    color: '#00875A',
  },
  incompleteText: {
    color: '#ffc107',
  },
  workoutDayName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  workoutDate: {
    fontSize: 14,
    color: '#ccc',
  },
  datesSection: {
    padding: 20,
  },
  dateContainer: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
  },
  dateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    color: '#ccc',
  },
  dateValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  exitButton: {
    backgroundColor: '#d32f2f',
    margin: 20,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ActiveProgramScreen;