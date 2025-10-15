import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProgramStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<ProgramStackParamList, 'ProgramList'>;

interface Program {
  id: string;
  name: string;
  author: string;
  duration: string;
  difficulty: number;
  category: string;
  isActive: boolean;
}

const ProgramListScreen: React.FC<Props> = ({ navigation }) => {
  const programs: Program[] = [
    { id: '1', name: '5/3/1 Beginner', author: 'Jim Wendler', duration: '8 weeks', difficulty: 2, category: 'Powerlifting', isActive: true },
    { id: '2', name: 'Texas Method', author: 'Glenn Pendlay', duration: '12 weeks', difficulty: 4, category: 'Strength', isActive: false },
    { id: '3', name: 'Starting Strength', author: 'Mark Rippetoe', duration: '12 weeks', difficulty: 1, category: 'Strength', isActive: false },
    { id: '4', name: 'PHAT', author: 'Layne Norton', duration: '8 weeks', difficulty: 3, category: 'Bodybuilding', isActive: false },
    { id: '5', name: '5/3/1 Advanced', author: 'Jim Wendler', duration: '8 weeks', difficulty: 5, category: 'Powerlifting', isActive: false },
  ];

  const handleProgramPress = (programId: string) => {
    navigation.navigate('ProgramDetail', { programId });
  };

  const handleViewLibrary = () => {
    navigation.navigate('ProgramLibrary');
  };

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

  const renderProgram = ({ item }: { item: Program }) => (
    <TouchableOpacity
      style={[
        styles.programCard,
        item.isActive && styles.activeProgramCard
      ]}
      onPress={() => handleProgramPress(item.id)}
    >
      <View style={styles.programHeader}>
        <Text style={styles.programName}>{item.name}</Text>
        {item.isActive && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>Active</Text>
          </View>
        )}
      </View>
      <Text style={styles.programAuthor}>By {item.author}</Text>
      <View style={styles.programDetails}>
        <View style={styles.programDetailItem}>
          <Text style={styles.programDetailLabel}>Duration:</Text>
          <Text style={styles.programDetailValue}>{item.duration}</Text>
        </View>
        <View style={styles.programDetailItem}>
          <Text style={styles.programDetailLabel}>Category:</Text>
          <Text style={styles.programDetailValue}>{item.category}</Text>
        </View>
      </View>
      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyLabel}>Difficulty:</Text>
        <View style={styles.difficultyIndicator}>
          <Text style={[
            styles.difficultyText,
            { color: getDifficultyColor(item.difficulty) }
          ]}>
            {getDifficultyText(item.difficulty)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Programs</Text>
        <TouchableOpacity style={styles.libraryButton} onPress={handleViewLibrary}>
          <Text style={styles.libraryButtonText}>Library</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activeProgramContainer}>
        <Text style={styles.sectionTitle}>Active Program</Text>
        {programs.filter(p => p.isActive).map(program => (
          <TouchableOpacity
            key={program.id}
            style={[styles.programCard, styles.activeProgramCard]}
            onPress={() => navigation.navigate('ActiveProgram', { userProgramId: program.id })}
          >
            <View style={styles.programHeader}>
              <Text style={styles.programName}>{program.name}</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>Active</Text>
              </View>
            </View>
            <Text style={styles.programAuthor}>By {program.author}</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>Week 3 of 8</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '37.5%' }]} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.allProgramsContainer}>
        <Text style={styles.sectionTitle}>All Programs</Text>
        <FlatList
          data={programs.filter(p => !p.isActive)}
          renderItem={renderProgram}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.programList}
          showsVerticalScrollIndicator={false}
        />
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
  libraryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  libraryButtonText: {
    color: '#00875A',
    fontSize: 14,
    fontWeight: '600',
  },
  activeProgramContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  allProgramsContainer: {
    flex: 1,
    padding: 20,
  },
  programList: {
    paddingBottom: 20,
  },
  programCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  activeProgramCard: {
    backgroundColor: '#2a4a3a',
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  programName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  activeBadge: {
    backgroundColor: '#00875A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  programAuthor: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
  },
  programDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  programDetailItem: {
    flex: 1,
  },
  programDetailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  programDetailValue: {
    fontSize: 14,
    color: '#fff',
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyLabel: {
    fontSize: 12,
    color: '#999',
  },
  difficultyIndicator: {
    backgroundColor: '#444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#444',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00875A',
    borderRadius: 4,
  },
});

export default ProgramListScreen;