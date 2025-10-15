import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Analytics'>;

const AnalyticsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Training Analytics</Text>
          <Text style={styles.subtitle}>Track your progress over time</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Progress</Text>
          <View style={styles.chartContainer}>
            <Text style={styles.chartPlaceholder}>📊 Chart Placeholder</Text>
            <Text style={styles.chartDescription}>Total volume lifted this month</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercise Breakdown</Text>
          <View style={styles.statGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statExercise}>Squat</Text>
              <Text style={styles.statValue}>12,450 kg</Text>
              <Text style={styles.statChange}>+5.2%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statExercise}>Bench</Text>
              <Text style={styles.statValue}>8,320 kg</Text>
              <Text style={styles.statChange}>+3.1%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statExercise}>Deadlift</Text>
              <Text style={styles.statValue}>15,780 kg</Text>
              <Text style={styles.statChange}>+7.8%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statExercise}>Accessories</Text>
              <Text style={styles.statValue}>5,430 kg</Text>
              <Text style={styles.statChange}>+2.4%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Frequency</Text>
          <View style={styles.frequencyContainer}>
            <View style={styles.frequencyItem}>
              <Text style={styles.frequencyNumber}>3.5</Text>
              <Text style={styles.frequencyLabel}>Avg. workouts per week</Text>
            </View>
            <View style={styles.frequencyItem}>
              <Text style={styles.frequencyNumber}>14</Text>
              <Text style={styles.frequencyLabel}>Total workouts this month</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Bests</Text>
          <View style={styles.pbContainer}>
            <View style={styles.pbItem}>
              <Text style={styles.pbExercise}>Squat 1RM</Text>
              <Text style={styles.pbValue}>152.5 kg</Text>
            </View>
            <View style={styles.pbItem}>
              <Text style={styles.pbExercise}>Bench 1RM</Text>
              <Text style={styles.pbValue}>92.5 kg</Text>
            </View>
            <View style={styles.pbItem}>
              <Text style={styles.pbExercise}>Deadlift 1RM</Text>
              <Text style={styles.pbValue}>227.5 kg</Text>
            </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
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
  chartContainer: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  chartPlaceholder: {
    fontSize: 48,
    marginBottom: 10,
  },
  chartDescription: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
  },
  statExercise: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statChange: {
    fontSize: 14,
    color: '#00875A',
  },
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  frequencyItem: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
  },
  frequencyNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00875A',
    marginBottom: 5,
  },
  frequencyLabel: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  pbContainer: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
  },
  pbItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  pbExercise: {
    fontSize: 16,
    color: '#fff',
  },
  pbValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00875A',
  },
});

export default AnalyticsScreen;