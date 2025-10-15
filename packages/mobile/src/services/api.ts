import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { User, AuthTokens } from '@sbdsa/shared';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
  path: string;
  method: string;
}

// API Service class
class ApiService {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.defaultHeaders = API_CONFIG.HEADERS;
  }

  // Get stored auth tokens
  private async getAuthTokens(): Promise<AuthTokens | null> {
    try {
      const tokens = await AsyncStorage.getItem('authTokens');
      return tokens ? JSON.parse(tokens) : null;
    } catch (error) {
      console.error('Error getting auth tokens:', error);
      return null;
    }
  }

  // Store auth tokens
  private async setAuthTokens(tokens: AuthTokens): Promise<void> {
    try {
      await AsyncStorage.setItem('authTokens', JSON.stringify(tokens));
    } catch (error) {
      console.error('Error setting auth tokens:', error);
    }
  }

  // Clear auth tokens
  private async clearAuthTokens(): Promise<void> {
    try {
      await AsyncStorage.removeItem('authTokens');
    } catch (error) {
      console.error('Error clearing auth tokens:', error);
    }
  }

  // Get headers with auth token
  private async getHeaders(includeAuth: boolean = true): Promise<Record<string, string>> {
    const headers = { ...this.defaultHeaders };
    
    if (includeAuth) {
      const tokens = await this.getAuthTokens();
      if (tokens) {
        headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
    }
    
    return headers;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.getHeaders(includeAuth);
    
    // Set up timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      // Handle 401 Unauthorized
      if (response.status === 401 && includeAuth) {
        // Try to refresh the token
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the request with new token
          return this.request<T>(endpoint, options, includeAuth);
        } else {
          // Refresh failed, clear tokens and redirect to login
          await this.clearAuthTokens();
          throw new Error('Authentication failed');
        }
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || `Request failed with status ${response.status}`);
      }
      
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      
      throw new Error('An unknown error occurred');
    }
  }

  // Refresh access token
  private async refreshToken(): Promise<boolean> {
    try {
      const tokens = await this.getAuthTokens();
      if (!tokens) return false;
      
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });
      
      const data: ApiResponse<AuthTokens> = await response.json();
      
      if (response.ok && data.success && data.data) {
        await this.setAuthTokens(data.data);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  }

  // HTTP methods
  async get<T>(endpoint: string, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, includeAuth);
  }

  async post<T>(
    endpoint: string,
    data?: any,
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  async put<T>(
    endpoint: string,
    data?: any,
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      includeAuth
    );
  }

  async delete<T>(endpoint: string, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, includeAuth);
  }

  // Authentication methods
  async login(email: string, password: string): Promise<ApiResponse<{user: User | null; tokens: AuthTokens}>> {
    const response = await this.post<{user: User | null; tokens: AuthTokens}>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password },
      false
    );
    
    if (response.success && response.data) {
      await this.setAuthTokens(response.data.tokens);
    }
    
    return response;
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<ApiResponse<{user: User | null; tokens: AuthTokens}>> {
    const response = await this.post<{user: User | null; tokens: AuthTokens}>(
      API_ENDPOINTS.AUTH.REGISTER,
      { email, password, firstName, lastName },
      false
    );
    
    if (response.success && response.data) {
      await this.setAuthTokens(response.data.tokens);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      await this.clearAuthTokens();
    }
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse> {
    return this.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.get(API_ENDPOINTS.AUTH.HEALTH, false);
      return response.success;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export default new ApiService();