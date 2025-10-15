import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Workout, WorkoutExercise, Set, Exercise } from '@sbdsa/shared';

// Define state interface
interface WorkoutState {
  currentWorkout: Workout | null;
  workoutHistory: Workout[];
  exercises: Exercise[];
  currentWorkoutExercises: WorkoutExercise[];
  currentSets: { [workoutExerciseId: string]: Set[] };
  isLoading: boolean;
  error: string | null;
  isLoggingWorkout: boolean;
}

// Initial state
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

// Async thunks
export const fetchExercises = createAsyncThunk(
  'workout/fetchExercises',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      // For now, return mock data
      const mockExercises: Exercise[] = [
        {
          id: '1',
          name: 'Barbell Squat',
          category: 'squat',
          muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
          equipment: ['barbell', 'squat-rack'],
          instructions: 'Stand with bar on upper back, squat down until thighs are parallel to floor',
          southAfricanStandard: true,
          createdAt: new Date(),
        },
        {
          id: '2',
          name: 'Barbell Bench Press',
          category: 'bench',
          muscleGroups: ['chest', 'shoulders', 'triceps'],
          equipment: ['barbell', 'bench'],
          instructions: 'Lie on bench, lower bar to chest, press up until arms are extended',
          southAfricanStandard: true,
          createdAt: new Date(),
        },
        {
          id: '3',
          name: 'Conventional Deadlift',
          category: 'deadlift',
          muscleGroups: ['back', 'glutes', 'hamstrings'],
          equipment: ['barbell', 'plates'],
          instructions: 'Stand with bar over feet, hinge at hips, lift bar to standing position',
          southAfricanStandard: true,
          createdAt: new Date(),
        },
      ];
      return mockExercises;
    } catch (error) {
      return rejectWithValue('Failed to fetch exercises');
    }
  },
);

export const fetchWorkoutHistory = createAsyncThunk(
  'workout/fetchWorkoutHistory',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      // For now, return mock data
      const mockWorkouts: Workout[] = [];
      return mockWorkouts;
    } catch (error) {
      return rejectWithValue('Failed to fetch workout history');
    }
  },
);

export const createWorkout = createAsyncThunk(
  'workout/createWorkout',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      const newWorkout: Workout = {
        id: Date.now().toString(),
        userId: '1', // This will come from auth state
        date: new Date(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return newWorkout;
    } catch (error) {
      return rejectWithValue('Failed to create workout');
    }
  },
);

export const saveWorkout = createAsyncThunk(
  'workout/saveWorkout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { workout: WorkoutState };
      const { currentWorkout, currentWorkoutExercises, currentSets } = state.workout;
      
      if (!currentWorkout) {
        return rejectWithValue('No active workout to save');
      }
      
      // This will be implemented with actual API call
      // For now, just return the workout as saved
      const savedWorkout = {
        ...currentWorkout,
        completed: true,
        updatedAt: new Date(),
      };
      
      return savedWorkout;
    } catch (error) {
      return rejectWithValue('Failed to save workout');
    }
  },
);

// Create slice
const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addExerciseToWorkout: (state, action: PayloadAction<Exercise>) => {
      if (!state.currentWorkout) return;
      
      const newWorkoutExercise: WorkoutExercise = {
        id: Date.now().toString(),
        workoutId: state.currentWorkout.id,
        exerciseId: action.payload.id,
        orderIndex: state.currentWorkoutExercises.length,
        createdAt: new Date(),
      };
      
      state.currentWorkoutExercises.push(newWorkoutExercise);
    },
    removeExerciseFromWorkout: (state, action: PayloadAction<string>) => {
      state.currentWorkoutExercises = state.currentWorkoutExercises.filter(
        (exercise) => exercise.id !== action.payload
      );
      
      // Also remove sets for this exercise
      delete state.currentSets[action.payload];
    },
    addSet: (state, action: PayloadAction<{ workoutExerciseId: string; set: Omit<Set, 'id' | 'createdAt'> }>) => {
      const { workoutExerciseId, set: setData } = action.payload;
      
      if (!state.currentSets[workoutExerciseId]) {
        state.currentSets[workoutExerciseId] = [];
      }
      
      const newSet: Set = {
        ...setData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      
      state.currentSets[workoutExerciseId].push(newSet);
    },
    updateSet: (state, action: PayloadAction<{ workoutExerciseId: string; setId: string; updates: Partial<Set> }>) => {
      const { workoutExerciseId, setId, updates } = action.payload;
      
      if (state.currentSets[workoutExerciseId]) {
        const setIndex = state.currentSets[workoutExerciseId].findIndex(set => set.id === setId);
        if (setIndex !== -1) {
          state.currentSets[workoutExerciseId][setIndex] = {
            ...state.currentSets[workoutExerciseId][setIndex],
            ...updates,
          };
        }
      }
    },
    removeSet: (state, action: PayloadAction<{ workoutExerciseId: string; setId: string }>) => {
      const { workoutExerciseId, setId } = action.payload;
      
      if (state.currentSets[workoutExerciseId]) {
        state.currentSets[workoutExerciseId] = state.currentSets[workoutExerciseId].filter(
          set => set.id !== setId
        );
      }
    },
    clearCurrentWorkout: (state) => {
      state.currentWorkout = null;
      state.currentWorkoutExercises = [];
      state.currentSets = {};
    },
    setIsLoggingWorkout: (state, action: PayloadAction<boolean>) => {
      state.isLoggingWorkout = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch exercises
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch workout history
    builder
      .addCase(fetchWorkoutHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workoutHistory = action.payload;
      })
      .addCase(fetchWorkoutHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create workout
    builder
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.currentWorkout = action.payload;
        state.currentWorkoutExercises = [];
        state.currentSets = {};
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Save workout
    builder
      .addCase(saveWorkout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentWorkout) {
          state.workoutHistory.unshift(action.payload);
        }
        state.currentWorkout = null;
        state.currentWorkoutExercises = [];
        state.currentSets = {};
        state.isLoggingWorkout = false;
      })
      .addCase(saveWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  addSet,
  updateSet,
  removeSet,
  clearCurrentWorkout,
  setIsLoggingWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;