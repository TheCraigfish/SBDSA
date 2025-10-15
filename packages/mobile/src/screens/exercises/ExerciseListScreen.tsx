import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Since Exercise screens aren't in the navigation types yet, we'll create a simple type
type ExerciseStackParamList = {
  ExerciseList: undefined;
  ExerciseDetail: { exerciseId: string };
};

type Props = NativeStackScreenProps<ExerciseStackParamList, 'ExerciseList'>;

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
}

const ExerciseListScreen: React.FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = React.useState('All');

  const categories = ['All', 'Squat', 'Bench', 'Deadlift', 'Accessory', 'Cardio', 'Mobility'];
  const muscleGroups = ['All', 'Quadriceps', 'Hamstrings', 'Glutes', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Core'];
  
  const exercises: Exercise[] = [
    { id: '1', name: 'Barbell Squat', category: 'Squat', muscleGroup: 'Quadriceps', equipment: 'Barbell', difficulty: 'Intermediate' },
    { id: '2', name: 'Front Squat', category: 'Squat', muscleGroup: 'Quadriceps', equipment: 'Barbell', difficulty: 'Advanced' },
    { id: '3', name: 'Bench Press', category: 'Bench', muscleGroup: 'Chest', equipment: 'Barbell', difficulty: 'Beginner' },
    { id: '4', name: 'Incline Bench Press', category: 'Bench', muscleGroup: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
    { id: '5', name: 'Deadlift', category: 'Deadlift', muscleGroup: 'Back', equipment: 'Barbell', difficulty: 'Advanced' },
    { id: '6', name: 'Romanian Deadlift', category: 'Deadlift', muscleGroup: 'Hamstrings', equipment: 'Barbell', difficulty: 'Intermediate' },
    { id: '7', name: 'Leg Press', category: 'Accessory', muscleGroup: 'Quadriceps', equipment: 'Machine', difficulty: 'Beginner' },
    { id: '8', name: 'Leg Extensions', category: 'Accessory', muscleGroup: 'Quadriceps', equipment: 'Machine', difficulty: 'Beginner' },
    { id: '9', name: 'Hamstring Curls', category: 'Accessory', muscleGroup: 'Hamstrings', equipment: 'Machine', difficulty: 'Beginner' },
    { id: '10', name: 'Shoulder Press', category: 'Accessory', muscleGroup: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate' },
    { id: '11', name: 'Bicep Curls', category: 'Accessory', muscleGroup: 'Biceps', equipment: 'Dumbbell', difficulty: 'Beginner' },
    { id: '12', name: 'Tricep Pushdowns', category: 'Accessory', muscleGroup: 'Triceps', equipment: 'Cable', difficulty: 'Beginner' },
    { id: '13', name: 'Plank', category: 'Accessory', muscleGroup: 'Core', equipment: 'Bodyweight', difficulty: 'Beginner' },
    { id: '14', name: 'Pull-ups', category: 'Accessory', muscleGroup: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate' },
    { id: '15', name: 'Treadmill Running', category: 'Cardio', muscleGroup: 'Full Body', equipment: 'Machine', difficulty: 'Beginner' },
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesMuscleGroup = selectedMuscleGroup === 'All' || exercise.muscleGroup === selectedMuscleGroup;
    return matchesSearch && matchesCategory && matchesMuscleGroup;
  });

  const handleExercisePress = (exerciseId: string) => {
    navigation.navigate('ExerciseDetail', { exerciseId });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FFC107';
      case 'Advanced': return '#F44336';
      default: return '#ccc';
    }
  };

  const renderExercise = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => handleExercisePress(item.id)}
    >
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
      <View style={styles.exerciseDetails}>
        <View style={styles.exerciseDetailItem}>
          <Text style={styles.exerciseDetailLabel}>Category:</Text>
          <Text style={styles.exerciseDetailValue}>{item.category}</Text>
        </View>
        <View style={styles.exerciseDetailItem}>
          <Text style={styles.exerciseDetailLabel}>Muscle:</Text>
          <Text style={styles.exerciseDetailValue}>{item.muscleGroup}</Text>
        </View>
        <View style={styles.exerciseDetailItem}>
          <Text style={styles.exerciseDetailLabel}>Equipment:</Text>
          <Text style={styles.exerciseDetailValue}>{item.equipment}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.filterButton,
        selectedCategory === category && styles.selectedFilter
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedCategory === category && styles.selectedFilterText
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderMuscleGroup = (muscleGroup: string) => (
    <TouchableOpacity
      key={muscleGroup}
      style={[
        styles.filterButton,
        selectedMuscleGroup === muscleGroup && styles.selectedFilter
      ]}
      onPress={() => setSelectedMuscleGroup(muscleGroup)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedMuscleGroup === muscleGroup && styles.selectedFilterText
      ]}>
        {muscleGroup}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercise Library</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Category</Text>
        <View style={styles.filterRow}>
          {categories.map(renderCategory)}
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Muscle Group</Text>
        <View style={styles.filterRow}>
          {muscleGroups.map(renderMuscleGroup)}
        </View>
      </View>

      <FlatList
        data={filteredExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.exerciseList}
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
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#333',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedFilter: {
    backgroundColor: '#00875A',
  },
  filterButtonText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedFilterText: {
    color: '#fff',
  },
  exerciseList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  exerciseDetailItem: {
    width: '48%',
    marginBottom: 8,
  },
  exerciseDetailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  exerciseDetailValue: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ExerciseListScreen;