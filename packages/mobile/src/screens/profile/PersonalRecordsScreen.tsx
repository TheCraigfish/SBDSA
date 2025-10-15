import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PersonalRecords'>;

interface PersonalRecord {
  id: string;
  exercise: string;
  weight: number;
  date: string;
  type: string;
}

const PersonalRecordsScreen: React.FC<Props> = ({ navigation }) => {
  const personalRecords: PersonalRecord[] = [
    { id: '1', exercise: 'Squat', weight: 152.5, date: '2023-10-15', type: '1RM' },
    { id: '2', exercise: 'Bench Press', weight: 92.5, date: '2023-10-01', type: '1RM' },
    { id: '3', exercise: 'Deadlift', weight: 227.5, date: '2023-10-20', type: '1RM' },
    { id: '4', exercise: 'Squat', weight: 140, date: '2023-09-20', type: '3RM' },
    { id: '5', exercise: 'Bench Press', weight: 85, date: '2023-09-15', type: '3RM' },
  ];

  const renderRecord = ({ item }: { item: PersonalRecord }) => (
    <TouchableOpacity style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <Text style={styles.exerciseName}>{item.exercise}</Text>
        <Text style={styles.recordType}>{item.type}</Text>
      </View>
      <View style={styles.recordDetails}>
        <Text style={styles.recordWeight}>{item.weight} kg</Text>
        <Text style={styles.recordDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Personal Records</Text>
      </View>
      
      <FlatList
        data={personalRecords}
        renderItem={renderRecord}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recordsList}
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
  recordsList: {
    padding: 20,
  },
  recordCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  recordHeader: {
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
  recordType: {
    fontSize: 14,
    color: '#00875A',
    fontWeight: '500',
  },
  recordDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordWeight: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00875A',
  },
  recordDate: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default PersonalRecordsScreen;