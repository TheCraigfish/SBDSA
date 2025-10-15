import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import authReducer, {
  loginUser,
  registerUser,
  refreshToken,
  logoutUser,
  clearError,
  setFirstLaunch,
  updateUserProfile,
} from '../authSlice';

// Define the AuthState interface locally since it's not exported
interface AuthState {
  user: any;
  tokens: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isFirstLaunch: boolean;
}

const middlewares = [thunk];
const mockStore = configureStore<Partial<{ auth: AuthState }>, ThunkDispatch<any, any, AnyAction>>(middlewares);

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isFirstLaunch: true,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should handle clearError', () => {
      const stateWithError = { ...initialState, error: 'Test error' };
      const result = authReducer(stateWithError, clearError());
      
      expect(result.error).toBeNull();
    });

    it('should handle setFirstLaunch', () => {
      const result = authReducer(initialState, setFirstLaunch(false));
      
      expect(result.isFirstLaunch).toBe(false);
    });

    it('should handle updateUserProfile', () => {
      const stateWithUser = {
        ...initialState,
        user: {
          id: '1',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          preferredUnits: 'kg' as const,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      
      const result = authReducer(stateWithUser, updateUserProfile({ firstName: 'Jane' }));
      
      expect(result.user?.firstName).toBe('Jane');
      expect(result.user?.lastName).toBe('Doe'); // Should remain unchanged
    });

    it('should handle updateUserProfile when user is null', () => {
      const result = authReducer(initialState, updateUserProfile({ firstName: 'Jane' }));
      
      expect(result.user).toBeNull();
    });
  });

  describe('async thunks', () => {
    describe('loginUser', () => {
      it('should handle pending state', () => {
        const action = { type: loginUser.pending.type };
        const result = authReducer(initialState, action);
        
        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
      });

      it('should handle fulfilled state', () => {
        const mockUser = {
          id: '1',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          preferredUnits: 'kg' as const,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        const mockTokens = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 86400,
        };
        
        const action = {
          type: loginUser.fulfilled.type,
          payload: { user: mockUser, tokens: mockTokens },
        };
        
        const result = authReducer(initialState, action);
        
        expect(result.isLoading).toBe(false);
        expect(result.user).toEqual(mockUser);
        expect(result.tokens).toEqual(mockTokens);
        expect(result.isAuthenticated).toBe(true);
        expect(result.error).toBeNull();
      });

      it('should handle rejected state', () => {
        const action = {
          type: loginUser.rejected.type,
          payload: 'Login failed',
        };
        
        const result = authReducer(initialState, action);
        
        expect(result.isLoading).toBe(false);
        expect(result.error).toBe('Login failed');
        expect(result.isAuthenticated).toBe(false);
      });
    });

    describe('registerUser', () => {
      it('should handle pending state', () => {
        const action = { type: registerUser.pending.type };
        const result = authReducer(initialState, action);
        
        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
      });

      it('should handle fulfilled state', () => {
        const mockUser = {
          id: '1',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: new Date('1990-01-01'),
          gender: 'male' as const,
          preferredUnits: 'kg' as const,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        const mockTokens = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 86400,
        };
        
        const action = {
          type: registerUser.fulfilled.type,
          payload: { user: mockUser, tokens: mockTokens },
        };
        
        const result = authReducer(initialState, action);
        
        expect(result.isLoading).toBe(false);
        expect(result.user).toEqual(mockUser);
        expect(result.tokens).toEqual(mockTokens);
        expect(result.isAuthenticated).toBe(true);
        expect(result.error).toBeNull();
      });

      it('should handle rejected state', () => {
        const action = {
          type: registerUser.rejected.type,
          payload: 'Registration failed',
        };
        
        const result = authReducer(initialState, action);
        
        expect(result.isLoading).toBe(false);
        expect(result.error).toBe('Registration failed');
        expect(result.isAuthenticated).toBe(false);
      });
    });

    describe('refreshToken', () => {
      it('should handle fulfilled state', () => {
        const stateWithTokens = {
          ...initialState,
          tokens: {
            accessToken: 'old-access-token',
            refreshToken: 'old-refresh-token',
            expiresIn: 86400,
          },
        };
        
        const action = {
          type: refreshToken.fulfilled.type,
          payload: {
            accessToken: 'new-access-token',
            refreshToken: 'new-refresh-token',
            expiresIn: 86400,
          },
        };
        
        const result = authReducer(stateWithTokens, action);
        
        expect(result.tokens?.accessToken).toBe('new-access-token');
        expect(result.tokens?.refreshToken).toBe('new-refresh-token');
      });

      it('should handle rejected state', () => {
        const stateWithAuth = {
          ...initialState,
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            preferredUnits: 'kg' as const,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          tokens: {
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
            expiresIn: 86400,
          },
          isAuthenticated: true,
        };
        
        const action = {
          type: refreshToken.rejected.type,
          payload: 'Token refresh failed',
        };
        
        const result = authReducer(stateWithAuth, action);
        
        expect(result.user).toBeNull();
        expect(result.tokens).toBeNull();
        expect(result.isAuthenticated).toBe(false);
      });
    });

    describe('logoutUser', () => {
      it('should handle fulfilled state', () => {
        const stateWithAuth = {
          ...initialState,
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            preferredUnits: 'kg' as const,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          tokens: {
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
            expiresIn: 86400,
          },
          isAuthenticated: true,
        };
        
        const action = { type: logoutUser.fulfilled.type };
        const result = authReducer(stateWithAuth, action);
        
        expect(result.user).toBeNull();
        expect(result.tokens).toBeNull();
        expect(result.isAuthenticated).toBe(false);
      });

      it('should handle rejected state', () => {
        const stateWithAuth = {
          ...initialState,
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            preferredUnits: 'kg' as const,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          tokens: {
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
            expiresIn: 86400,
          },
          isAuthenticated: true,
        };
        
        const action = {
          type: logoutUser.rejected.type,
          payload: 'Logout failed',
        };
        
        const result = authReducer(stateWithAuth, action);
        
        expect(result.user).toBeNull();
        expect(result.tokens).toBeNull();
        expect(result.isAuthenticated).toBe(false);
        expect(result.error).toBe('Logout failed');
      });
    });
  });

  describe('async actions', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
      store = mockStore({ auth: initialState });
    });

    it('should dispatch loginUser and succeed', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      await store.dispatch(loginUser(credentials));
      const actions = store.getActions();

      expect(actions[0].type).toEqual(loginUser.pending.type);
      expect(actions[1].type).toEqual(loginUser.fulfilled.type);
      expect(actions[1].payload).toHaveProperty('user');
      expect(actions[1].payload).toHaveProperty('tokens');
    });

    it('should dispatch registerUser and succeed', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male' as const,
        membershipNumber: 'SA123456',
      };

      await store.dispatch(registerUser(userData));
      const actions = store.getActions();

      expect(actions[0].type).toEqual(registerUser.pending.type);
      expect(actions[1].type).toEqual(registerUser.fulfilled.type);
      expect(actions[1].payload).toHaveProperty('user');
      expect(actions[1].payload).toHaveProperty('tokens');
    });
  });
});