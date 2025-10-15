import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthTokens, LoginRequest, RegisterRequest } from '@sbdsa/shared';

// Define state interface
interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isFirstLaunch: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isFirstLaunch: true,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      // For now, return a mock response
      const mockResponse = {
        user: {
          id: '1',
          email: credentials.email,
          firstName: 'John',
          lastName: 'Doe',
          preferredUnits: 'kg' as const,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 86400,
        },
      };
      return mockResponse;
    } catch (error) {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      // For now, return a mock response
      const mockResponse = {
        user: {
          id: '1',
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          dateOfBirth: userData.dateOfBirth,
          gender: userData.gender,
          preferredUnits: 'kg' as const,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 86400,
        },
      };
      return mockResponse;
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const { tokens } = state.auth;
      
      if (!tokens?.refreshToken) {
        return rejectWithValue('No refresh token available');
      }
      
      // This will be implemented with actual API call
      // For now, return a mock response
      const mockResponse = {
        accessToken: 'new-mock-access-token',
        refreshToken: 'new-mock-refresh-token',
        expiresIn: 86400,
      };
      return mockResponse;
    } catch (error) {
      return rejectWithValue('Token refresh failed');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual API call
      // For now, just return success
      return;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  },
);

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Refresh token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (state.tokens) {
          state.tokens.accessToken = action.payload.accessToken;
          state.tokens.refreshToken = action.payload.refreshToken;
          state.tokens.expiresIn = action.payload.expiresIn;
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
        // Still clear auth state even if logout API call failed
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setFirstLaunch, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;