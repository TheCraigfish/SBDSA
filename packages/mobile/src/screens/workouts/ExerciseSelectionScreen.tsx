import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'ExerciseSelection'>;

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string;
}

const ExerciseSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', 'Squat', 'Bench', 'Deadlift', 'Accessory'];
  
  const exercises: Exercise[] = [
    { id: '1', name: 'Barbell Squat', category: 'Squat', muscleGroup: 'Quadriceps' },
    { id: '2', name: 'Front Squat', category: 'Squat', muscleGroup: 'Quadriceps' },
    { id: '3', name: 'Bench Press', category: 'Bench', muscleGroup: 'Chest' },
    { id: '4', name: 'Incline Bench Press', category: 'Bench', muscleGroup: 'Chest' },
    { id: '5', name: 'Deadlift', category: 'Deadlift', muscleGroup: 'Back' },
    { id: '6', name: 'Romanian Deadlift', category: 'Deadlift', muscleGroup: 'Hamstrings' },
    { id: '7', name: 'Leg Press', category: 'Accessory', muscleGroup: 'Quadriceps' },
    { id: '8', name: 'Leg Extensions', category: 'Accessory', muscleGroup: 'Quadriceps' },
    { id: '9', name: 'Hamstring Curls', category: 'Accessory', muscleGroup: 'Hamstrings' },
    { id: '10', name: 'Calf Raises', category: 'Accessory', muscleGroup: 'Calves' },
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExerciseSelect = (exercise: Exercise) => {
    // Placeholder for exercise selection logic
    navigation.goBack();
  };

  const renderExercise = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => handleExerciseSelect(item)}
    >
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDetails}>{item.muscleGroup}</Text>
      </View>
      <View style={styles.exerciseCategory}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category && styles.selectedCategoryText
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Exercise</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
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

      <View style={styles.categoriesContainer}>
        {categories.map(renderCategory)}
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
  cancelButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
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
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: '#00875A',
  },
  categoryButtonText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  exerciseList: {
    paddingHorizontal: 20,
  },
  exerciseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#ccc',
  },
  exerciseCategory: {
    backgroundColor: '#444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  categoryText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ExerciseSelectionScreen;