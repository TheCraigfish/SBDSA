import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthTokens, LoginRequest, RegisterRequest } from '@sbdsa/shared';
import apiService from '../../services/api';

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
      const response = await apiService.login(credentials.email, credentials.password);
      
      if (response.success && response.data && response.data.tokens) {
        // Store tokens in AsyncStorage
        await AsyncStorage.setItem('authTokens', JSON.stringify(response.data.tokens));
        
        return {
          user: response.data.user || null,
          tokens: response.data.tokens,
        };
      } else {
        throw new Error(response.error?.message || 'Login failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await apiService.register(
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName
      );
      
      if (response.success && response.data && response.data.tokens) {
        // Store tokens in AsyncStorage
        await AsyncStorage.setItem('authTokens', JSON.stringify(response.data.tokens));
        
        return {
          user: response.data.user || null,
          tokens: response.data.tokens,
        };
      } else {
        throw new Error(response.error?.message || 'Registration failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      // API service handles token refresh automatically
      // This is just a placeholder for state management
      throw new Error('Token refresh should be handled automatically by the API service');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Token refresh failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiService.logout();
      
      // Tokens are cleared in the API service
      return true;
    } catch (error: any) {
      // Even if the API call fails, return success
      // The API service clears local tokens even if the server call fails
      return true;
    }
  }
);

export const loadStoredAuth = createAsyncThunk(
  'auth/loadStored',
  async (_, { rejectWithValue }) => {
    try {
      const tokens = await AsyncStorage.getItem('authTokens');
      
      if (!tokens) {
        return null;
      }
      
      const parsedTokens = JSON.parse(tokens);
      
      // TODO: Validate tokens with backend if needed
      // For now, just return the tokens
      
      return {
        user: null, // We would need to fetch user data
        tokens: parsedTokens,
      };
    } catch (error: any) {
      // Clear invalid tokens
      await AsyncStorage.removeItem('authTokens');
      return rejectWithValue(error.message || 'Failed to load stored auth');
    }
  }
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
    // Load stored auth
    builder
      .addCase(loadStoredAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.tokens = action.payload.tokens;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      })
      .addCase(loadStoredAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.tokens = null;
      });
    
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.tokens = {
          accessToken: action.payload.tokens.accessToken,
          refreshToken: action.payload.tokens.refreshToken,
          expiresIn: action.payload.tokens.expiresIn || 86400, // Default to 24 hours
        };
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.tokens = null;
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
        state.tokens = {
          accessToken: action.payload.tokens.accessToken,
          refreshToken: action.payload.tokens.refreshToken,
          expiresIn: action.payload.tokens.expiresIn || 86400, // Default to 24 hours
        };
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.tokens = null;
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Still clear auth state even if logout API call failed
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setFirstLaunch, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;