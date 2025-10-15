import workoutReducer, {
  clearError,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  addSet,
  updateSet,
  removeSet,
  clearCurrentWorkout,
  setIsLoggingWorkout,
} from '../workoutSlice';
import { Exercise, WorkoutExercise, Set } from '@sbdsa/shared';

// Define the WorkoutState interface locally
interface WorkoutState {
  currentWorkout: any;
  workoutHistory: any[];
  exercises: Exercise[];
  currentWorkoutExercises: WorkoutExercise[];
  currentSets: { [workoutExerciseId: string]: Set[] };
  isLoading: boolean;
  error: string | null;
  isLoggingWorkout: boolean;
}

const initialState: WorkoutState = {
  currentWorkout: null,
  workoutHistory: [],
  exercises: [],
  currentWorkoutExercises: [],
  currentSets: {},
  isLoading: false,
  error: null,
  isLoggingWorkout: false,
};

describe('workoutSlice', () => {
  it('should return the initial state', () => {
    expect(workoutReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should handle clearError', () => {
      const stateWithError = { ...initialState, error: 'Test error' };
      const result = workoutReducer(stateWithError, clearError());
      
      expect(result.error).toBeNull();
    });

    it('should handle addExerciseToWorkout', () => {
      const mockWorkout = {
        id: 'workout-1',
        userId: 'user-1',
        date: new Date(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const mockExercise: Exercise = {
        id: 'exercise-1',
        name: 'Squat',
        category: 'squat',
        muscleGroups: ['quadriceps', 'glutes'],
        equipment: ['barbell'],
        instructions: 'Squat down and stand up',
        southAfricanStandard: true,
        createdAt: new Date(),
      };
      
      const stateWithWorkout = { ...initialState, currentWorkout: mockWorkout };
      const result = workoutReducer(stateWithWorkout, addExerciseToWorkout(mockExercise));
      
      expect(result.currentWorkoutExercises).toHaveLength(1);
      expect(result.currentWorkoutExercises[0].exerciseId).toBe('exercise-1');
      expect(result.currentWorkoutExercises[0].workoutId).toBe('workout-1');
    });

    it('should not add exercise when no current workout', () => {
      const mockExercise: Exercise = {
        id: 'exercise-1',
        name: 'Squat',
        category: 'squat',
        muscleGroups: ['quadriceps', 'glutes'],
        equipment: ['barbell'],
        instructions: 'Squat down and stand up',
        southAfricanStandard: true,
        createdAt: new Date(),
      };
      
      const result = workoutReducer(initialState, addExerciseToWorkout(mockExercise));
      
      expect(result.currentWorkoutExercises).toHaveLength(0);
    });

    it('should handle removeExerciseFromWorkout', () => {
      const mockWorkoutExercise: WorkoutExercise = {
        id: 'workout-exercise-1',
        workoutId: 'workout-1',
        exerciseId: 'exercise-1',
        orderIndex: 0,
        createdAt: new Date(),
      };
      
      const stateWithExercise = {
        ...initialState,
        currentWorkoutExercises: [mockWorkoutExercise],
        currentSets: {
          'workout-exercise-1': [
            {
              id: 'set-1',
              workoutExerciseId: 'workout-exercise-1',
              setNumber: 1,
              reps: 5,
              weightKg: 100,
              rpe: 8,
              isWarmup: false,
              createdAt: new Date(),
            },
          ],
        },
      };
      
      const result = workoutReducer(stateWithExercise, removeExerciseFromWorkout('workout-exercise-1'));
      
      expect(result.currentWorkoutExercises).toHaveLength(0);
      expect(result.currentSets['workout-exercise-1']).toBeUndefined();
    });

    it('should handle addSet', () => {
      const mockSet = {
        workoutExerciseId: 'workout-exercise-1',
        setNumber: 1,
        reps: 5,
        weightKg: 100,
        rpe: 8,
      };
      
      const result = workoutReducer(
        initialState,
        addSet({ workoutExerciseId: 'workout-exercise-1', set: mockSet })
      );
      
      expect(result.currentSets['workout-exercise-1']).toHaveLength(1);
      expect(result.currentSets['workout-exercise-1'][0].reps).toBe(5);
      expect(result.currentSets['workout-exercise-1'][0].weightKg).toBe(100);
    });

    it('should handle updateSet', () => {
      const existingSet: Set = {
        id: 'set-1',
        workoutExerciseId: 'workout-exercise-1',
        setNumber: 1,
        reps: 5,
        weightKg: 100,
        rpe: 8,
        createdAt: new Date(),
      };
      
      const stateWithSet = {
        ...initialState,
        currentSets: {
          'workout-exercise-1': [existingSet],
        },
      };
      
      const result = workoutReducer(
        stateWithSet,
        updateSet({
          workoutExerciseId: 'workout-exercise-1',
          setId: 'set-1',
          updates: { weightKg: 110, rpe: 9 },
        })
      );
      
      expect(result.currentSets['workout-exercise-1'][0].weightKg).toBe(110);
      expect(result.currentSets['workout-exercise-1'][0].rpe).toBe(9);
      expect(result.currentSets['workout-exercise-1'][0].reps).toBe(5); // Should remain unchanged
    });

    it('should handle removeSet', () => {
      const existingSet: Set = {
        id: 'set-1',
        workoutExerciseId: 'workout-exercise-1',
        setNumber: 1,
        reps: 5,
        weightKg: 100,
        rpe: 8,
        createdAt: new Date(),
      };
      
      const stateWithSet = {
        ...initialState,
        currentSets: {
          'workout-exercise-1': [existingSet],
        },
      };
      
      const result = workoutReducer(
        stateWithSet,
        removeSet({ workoutExerciseId: 'workout-exercise-1', setId: 'set-1' })
      );
      
      expect(result.currentSets['workout-exercise-1']).toHaveLength(0);
    });

    it('should handle clearCurrentWorkout', () => {
      const stateWithWorkout = {
        ...initialState,
        currentWorkout: {
          id: 'workout-1',
          userId: 'user-1',
          date: new Date(),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        currentWorkoutExercises: [
          {
            id: 'workout-exercise-1',
            workoutId: 'workout-1',
            exerciseId: 'exercise-1',
            orderIndex: 0,
            createdAt: new Date(),
          },
        ],
        currentSets: {
          'workout-exercise-1': [
            {
              id: 'set-1',
              workoutExerciseId: 'workout-exercise-1',
              setNumber: 1,
              reps: 5,
              weightKg: 100,
              rpe: 8,
              createdAt: new Date(),
            },
          ],
        },
      };
      
      const result = workoutReducer(stateWithWorkout, clearCurrentWorkout());
      
      expect(result.currentWorkout).toBeNull();
      expect(result.currentWorkoutExercises).toHaveLength(0);
      expect(Object.keys(result.currentSets)).toHaveLength(0);
    });

    it('should handle setIsLoggingWorkout', () => {
      const result = workoutReducer(initialState, setIsLoggingWorkout(true));
      
      expect(result.isLoggingWorkout).toBe(true);
      
      const result2 = workoutReducer(result, setIsLoggingWorkout(false));
      
      expect(result2.isLoggingWorkout).toBe(false);
    });
  });

  describe('complex scenarios', () => {
    it('should handle multiple sets for the same exercise', () => {
      const mockSet1 = {
        workoutExerciseId: 'workout-exercise-1',
        setNumber: 1,
        reps: 5,
        weightKg: 100,
        rpe: 8,
      };
      
      const mockSet2 = {
        workoutExerciseId: 'workout-exercise-1',
        setNumber: 2,
        reps: 3,
        weightKg: 110,
        rpe: 9,
      };
      
      let result = workoutReducer(
        initialState,
        addSet({ workoutExerciseId: 'workout-exercise-1', set: mockSet1 })
      );
      
      result = workoutReducer(
        result,
        addSet({ workoutExerciseId: 'workout-exercise-1', set: mockSet2 })
      );
      
      expect(result.currentSets['workout-exercise-1']).toHaveLength(2);
      expect(result.currentSets['workout-exercise-1'][0].reps).toBe(5);
      expect(result.currentSets['workout-exercise-1'][1].reps).toBe(3);
    });

    it('should handle sets for different exercises', () => {
      const mockSet1 = {
        workoutExerciseId: 'workout-exercise-1',
        setNumber: 1,
        reps: 5,
        weightKg: 100,
        rpe: 8,
      };
      
      const mockSet2 = {
        workoutExerciseId: 'workout-exercise-2',
        setNumber: 1,
        reps: 5,
        weightKg: 80,
        rpe: 7,
      };
      
      let result = workoutReducer(
        initialState,
        addSet({ workoutExerciseId: 'workout-exercise-1', set: mockSet1 })
      );
      
      result = workoutReducer(
        result,
        addSet({ workoutExerciseId: 'workout-exercise-2', set: mockSet2 })
      );
      
      expect(Object.keys(result.currentSets)).toHaveLength(2);
      expect(result.currentSets['workout-exercise-1']).toHaveLength(1);
      expect(result.currentSets['workout-exercise-2']).toHaveLength(1);
    });
  });
});