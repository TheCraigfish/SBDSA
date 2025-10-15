import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProgramStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<ProgramStackParamList, 'ProgramLibrary'>;

interface LibraryProgram {
  id: string;
  name: string;
  author: string;
  duration: string;
  difficulty: number;
  category: string;
  rating: number;
  downloads: number;
}

const ProgramLibraryScreen: React.FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('All');

  const categories = ['All', 'Powerlifting', 'Bodybuilding', 'Strength', 'Hypertrophy'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  
  const libraryPrograms: LibraryProgram[] = [
    { id: '1', name: '5/3/1 Beginner', author: 'Jim Wendler', duration: '8 weeks', difficulty: 2, category: 'Powerlifting', rating: 4.8, downloads: 1250 },
    { id: '2', name: 'Texas Method', author: 'Glenn Pendlay', duration: '12 weeks', difficulty: 4, category: 'Strength', rating: 4.6, downloads: 890 },
    { id: '3', name: 'Starting Strength', author: 'Mark Rippetoe', duration: '12 weeks', difficulty: 1, category: 'Strength', rating: 4.7, downloads: 2100 },
    { id: '4', name: 'PHAT', author: 'Layne Norton', duration: '8 weeks', difficulty: 3, category: 'Bodybuilding', rating: 4.5, downloads: 650 },
    { id: '5', name: '5/3/1 Advanced', author: 'Jim Wendler', duration: '8 weeks', difficulty: 5, category: 'Powerlifting', rating: 4.9, downloads: 450 },
    { id: '6', name: 'Push Pull Legs', author: 'Unknown', duration: '6 weeks', difficulty: 2, category: 'Hypertrophy', rating: 4.3, downloads: 1800 },
    { id: '7', name: 'Smolov Jr.', author: 'Sergey Smolov', duration: '3 weeks', difficulty: 5, category: 'Powerlifting', rating: 4.2, downloads: 320 },
    { id: '8', name: 'GZCLP', author: 'Cody LeFever', duration: '16 weeks', difficulty: 2, category: 'Strength', rating: 4.6, downloads: 780 },
  ];

  const getDifficultyLevel = (difficulty: number) => {
    if (difficulty <= 2) return 'Beginner';
    if (difficulty <= 3) return 'Intermediate';
    return 'Advanced';
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return '#4CAF50'; // Green
    if (difficulty <= 3) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  const filteredPrograms = libraryPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         program.author.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || 
                              getDifficultyLevel(program.difficulty) === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleProgramPress = (programId: string) => {
    navigation.navigate('ProgramDetail', { programId });
  };

  const renderProgram = ({ item }: { item: LibraryProgram }) => (
    <TouchableOpacity
      style={styles.programCard}
      onPress={() => handleProgramPress(item.id)}
    >
      <View style={styles.programHeader}>
        <Text style={styles.programName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>
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
      <View style={styles.programFooter}>
        <Text style={[
          styles.difficultyText,
          { color: getDifficultyColor(item.difficulty) }
        ]}>
          {getDifficultyLevel(item.difficulty)}
        </Text>
        <Text style={styles.downloads}>{item.downloads.toLocaleString()} downloads</Text>
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

  const renderDifficulty = (difficulty: string) => (
    <TouchableOpacity
      key={difficulty}
      style={[
        styles.filterButton,
        selectedDifficulty === difficulty && styles.selectedFilter
      ]}
      onPress={() => setSelectedDifficulty(difficulty)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedDifficulty === difficulty && styles.selectedFilterText
      ]}>
        {difficulty}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Program Library</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search programs..."
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
        <Text style={styles.filterTitle}>Difficulty</Text>
        <View style={styles.filterRow}>
          {difficulties.map(renderDifficulty)}
        </View>
      </View>

      <FlatList
        data={filteredPrograms}
        renderItem={renderProgram}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.programList}
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
  programList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  programCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
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
  ratingContainer: {
    backgroundColor: '#444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    color: '#FFC107',
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
  programFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  downloads: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProgramLibraryScreen;