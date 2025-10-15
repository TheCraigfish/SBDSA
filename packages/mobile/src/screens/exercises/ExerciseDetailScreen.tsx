import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Since Exercise screens aren't in the navigation types yet, we'll create a simple type
type ExerciseStackParamList = {
  ExerciseList: undefined;
  ExerciseDetail: { exerciseId: string };
};

type Props = NativeStackScreenProps<ExerciseStackParamList, 'ExerciseDetail'>;

const ExerciseDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { exerciseId } = route.params;

  // Define exercise data type
  interface ExerciseData {
    name: string;
    category: string;
    muscleGroup: string;
    equipment: string;
    difficulty: string;
    instructions: string[];
    tips: string[];
    variations: string[];
  }

  // Mock exercise data based on the ID
  const exerciseData: Record<string, ExerciseData> = {
    '1': {
      name: 'Barbell Squat',
      category: 'Squat',
      muscleGroup: 'Quadriceps',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      instructions: [
        'Stand with the barbell across your upper back, feet shoulder-width apart',
        'Keep your chest up and back straight',
        'Lower your body by bending your knees and hips',
        'Go down until your thighs are parallel to the floor or lower',
        'Push through your heels to return to the starting position',
      ],
      tips: [
        'Keep your weight on your heels',
        'Don\'t let your knees cave inward',
        'Maintain a neutral spine throughout the movement',
        'Breathe in on the way down, out on the way up',
      ],
      variations: ['Front Squat', 'Hack Squat', 'Goblet Squat', 'Bulgarian Split Squat'],
    },
    '2': {
      name: 'Front Squat',
      category: 'Squat',
      muscleGroup: 'Quadriceps',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      instructions: [
        'Hold the barbell across your front shoulders with your fingertips',
        'Keep your elbows high and chest up',
        'Lower your body by bending your knees and hips',
        'Go down until your thighs are parallel to the floor or lower',
        'Push through your heels to return to the starting position',
      ],
      tips: [
        'Keep your elbows up to prevent the bar from rolling',
        'Focus on keeping your torso upright',
        'This variation places more emphasis on the quads',
        'Start with lighter weight than back squats',
      ],
      variations: ['Back Squat', 'Hack Squat', 'Goblet Squat', 'Zercher Squat'],
    },
  };

  const exercise = exerciseData[exerciseId] || exerciseData['1'];

  const handleAddToWorkout = () => {
    // Placeholder for adding exercise to workout
    navigation.goBack();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FFC107';
      case 'Advanced': return '#F44336';
      default: return '#ccc';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <View style={styles.exerciseMeta}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
              <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
            </View>
            <Text style={styles.exerciseCategory}>{exercise.category}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Muscle Group:</Text>
            <Text style={styles.detailValue}>{exercise.muscleGroup}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Equipment:</Text>
            <Text style={styles.detailValue}>{exercise.equipment}</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <View style={styles.instructions}>
            {exercise.instructions.map((instruction: string, index: number) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>{index + 1}</Text>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tips</Text>
          <View style={styles.tips}>
            {exercise.tips.map((tip: string, index: number) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Variations</Text>
          <View style={styles.variations}>
            {exercise.variations.map((variation: string, index: number) => (
              <View key={index} style={styles.variationItem}>
                <Text style={styles.variationText}>{variation}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddToWorkout}>
          <Text style={styles.addButtonText}>Add to Workout</Text>
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
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  exerciseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  exerciseCategory: {
    fontSize: 16,
    color: '#00875A',
    fontWeight: '600',
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
  sectionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  instructions: {
    paddingLeft: 10,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00875A',
    marginRight: 15,
    minWidth: 24,
  },
  instructionText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    lineHeight: 24,
  },
  tips: {
    paddingLeft: 10,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 16,
    color: '#00875A',
    marginRight: 15,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    lineHeight: 24,
  },
  variations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  variationItem: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  variationText: {
    fontSize: 14,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#00875A',
    margin: 20,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExerciseDetailScreen;