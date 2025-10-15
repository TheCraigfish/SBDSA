import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<MainTabParamList, 'Dashboard'>;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const handleStartWorkout = () => {
    navigation.navigate('Workouts');
  };

  const handleViewPrograms = () => {
    navigation.navigate('Programs');
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userName}>Lifter</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Workouts This Week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>152.5</Text>
            <Text style={styles.statLabel}>Squat 1RM (kg)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionCard} onPress={handleStartWorkout}>
            <Text style={styles.actionTitle}>Start Workout</Text>
            <Text style={styles.actionSubtitle}>Begin a new training session</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={handleViewPrograms}>
            <Text style={styles.actionTitle}>View Programs</Text>
            <Text style={styles.actionSubtitle}>Browse training programs</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>Squat Day</Text>
            <Text style={styles.activitySubtitle}>Completed 2 days ago</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>Bench Press</Text>
            <Text style={styles.activitySubtitle}>Completed 4 days ago</Text>
          </View>
        </View>
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
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: '#ccc',
    marginBottom: 5,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00875A',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  actionCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00875A',
    marginBottom: 5,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#ccc',
  },
  activityCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default DashboardScreen;