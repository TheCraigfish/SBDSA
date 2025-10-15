import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Program, UserProgram, ProgramWorkout } from '@sbdsa/shared';

// Define state interface
interface ProgramState {
  availablePrograms: Program[];
  userPrograms: UserProgram[];
  activeUserProgram: UserProgram | null;
  programWorkouts: { [programId: string]: ProgramWorkout[] };
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProgramState = {
  availablePrograms: [],
  userPrograms: [],
  activeUserProgram: null,
  programWorkouts: {},
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchPrograms = createAsyncThunk(
  'program/fetchPrograms',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      // For now, return mock data
      const mockPrograms: Program[] = [
        {
          id: '1',
          name: '5/3/1 Powerlifting',
          description: 'Jim Wendler\'s classic powerlifting program focusing on slow progression',
          authorId: 'system',
          category: 'powerlifting',
          difficultyLevel: 3,
          durationWeeks: 16,
          public: true,
          southAfricanSpecific: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Starting Strength',
          description: 'Mark Rippetoe\'s novice linear progression program',
          authorId: 'system',
          category: 'powerlifting',
          difficultyLevel: 2,
          durationWeeks: 12,
          public: true,
          southAfricanSpecific: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          name: 'Basic Hypertrophy',
          description: 'Bodybuilding program focused on muscle growth',
          authorId: 'system',
          category: 'bodybuilding',
          difficultyLevel: 2,
          durationWeeks: 8,
          public: true,
          southAfricanSpecific: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      return mockPrograms;
    } catch (error) {
      return rejectWithValue('Failed to fetch programs');
    }
  },
);

export const fetchUserPrograms = createAsyncThunk(
  'program/fetchUserPrograms',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      // For now, return empty array
      return [];
    } catch (error) {
      return rejectWithValue('Failed to fetch user programs');
    }
  },
);

export const enrollInProgram = createAsyncThunk(
  'program/enrollInProgram',
  async (programId: string, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      const newUserProgram: UserProgram = {
        id: Date.now().toString(),
        userId: '1', // This will come from auth state
        programId,
        startDate: new Date(),
        currentWeek: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return newUserProgram;
    } catch (error) {
      return rejectWithValue('Failed to enroll in program');
    }
  },
);

export const fetchProgramWorkouts = createAsyncThunk(
  'program/fetchProgramWorkouts',
  async (programId: string, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      // For now, return mock data
      const mockWorkouts: ProgramWorkout[] = [
        {
          id: '1',
          programId,
          dayNumber: 1,
          workoutTemplate: {
            name: 'Day 1: Squat Focus',
            exercises: [
              {
                exerciseId: '1', // Barbell Squat
                orderIndex: 0,
                sets: [
                  { setNumber: 1, weightKg: 60, reps: 5, restSeconds: 180 },
                  { setNumber: 2, weightKg: 70, reps: 5, restSeconds: 180 },
                  { setNumber: 3, weightKg: 80, reps: 5, restSeconds: 180 },
                ],
              },
            ],
          },
          createdAt: new Date(),
        },
      ];
      return { programId, workouts: mockWorkouts };
    } catch (error) {
      return rejectWithValue('Failed to fetch program workouts');
    }
  },
);

export const updateProgramProgress = createAsyncThunk(
  'program/updateProgramProgress',
  async (data: { userProgramId: string; currentWeek: number }, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      const updatedUserProgram: UserProgram = {
        id: data.userProgramId,
        userId: '1',
        programId: '1',
        startDate: new Date(),
        currentWeek: data.currentWeek,
        completed: data.currentWeek >= 16, // Assuming 16 week program
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return updatedUserProgram;
    } catch (error) {
      return rejectWithValue('Failed to update program progress');
    }
  },
);

// Create slice
const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setActiveUserProgram: (state, action: PayloadAction<UserProgram | null>) => {
      state.activeUserProgram = action.payload;
    },
    clearProgramWorkouts: (state, action: PayloadAction<string>) => {
      delete state.programWorkouts[action.payload];
    },
  },
  extraReducers: (builder) => {
    // Fetch programs
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availablePrograms = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch user programs
    builder
      .addCase(fetchUserPrograms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPrograms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPrograms = action.payload;
        
        // Set active user program if there's one that's not completed
        const activeProgram = action.payload.find((program: UserProgram) => !program.completed);
        state.activeUserProgram = activeProgram || null;
      })
      .addCase(fetchUserPrograms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Enroll in program
    builder
      .addCase(enrollInProgram.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(enrollInProgram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPrograms.push(action.payload);
        state.activeUserProgram = action.payload;
      })
      .addCase(enrollInProgram.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch program workouts
    builder
      .addCase(fetchProgramWorkouts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProgramWorkouts.fulfilled, (state, action) => {
        state.isLoading = false;
        const { programId, workouts } = action.payload;
        state.programWorkouts[programId] = workouts;
      })
      .addCase(fetchProgramWorkouts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update program progress
    builder
      .addCase(updateProgramProgress.fulfilled, (state, action) => {
        const index = state.userPrograms.findIndex(
          program => program.id === action.payload.id
        );
        if (index !== -1) {
          state.userPrograms[index] = action.payload;
        }
        
        if (state.activeUserProgram?.id === action.payload.id) {
          state.activeUserProgram = action.payload;
        }
      })
      .addCase(updateProgramProgress.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  setActiveUserProgram,
  clearProgramWorkouts,
} = programSlice.actions;

export default programSlice.reducer;