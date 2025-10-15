import { Platform } from 'react-native';

// Get the local IP address for development
const getLocalIpAddress = () => {
  // In development, use your computer's IP address
  // Replace with your actual IP address if needed
  return Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
};

// API configuration
export const API_CONFIG = {
  // Use your computer's IP address when running on Android emulator
  BASE_URL: __DEV__ 
    ? `http://${getLocalIpAddress()}:3000/api` 
    : 'https://api.sbdsa.co.za/api', // Production URL
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Headers that will be sent with every request
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    CHANGE_PASSWORD: '/auth/change-password',
    HEALTH: '/auth/health',
  },
  
  // Users
  USERS: {
    PROFILE: '/users/profile',
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
  },
  
  // Workouts
  WORKOUTS: {
    LIST: '/workouts',
    DETAIL: (id: string) => `/workouts/${id}`,
    CREATE: '/workouts',
    UPDATE: (id: string) => `/workouts/${id}`,
    DELETE: (id: string) => `/workouts/${id}`,
    EXERCISES: (id: string) => `/workouts/${id}/exercises`,
    SETS: (workoutId: string, exerciseId: string) => `/workouts/${workoutId}/exercises/${exerciseId}/sets`,
  },
  
  // Programs
  PROGRAMS: {
    LIST: '/programs',
    DETAIL: (id: string) => `/programs/${id}`,
    CREATE: '/programs',
    ENROLL: (id: string) => `/programs/${id}/enroll`,
    MY_PROGRAMS: '/programs/my/programs',
    ACTIVE: '/programs/my/active',
    UPDATE: (id: string) => `/programs/my/programs/${id}`,
  },
  
  // Analytics
  ANALYTICS: {
    PROGRESS: '/analytics/progress',
    PERSONAL_RECORDS: '/analytics/personal-records',
    WORKOUT_HISTORY: '/analytics/workout-history',
    STATS: '/analytics/stats',
  },
  
  // Competitions
  COMPETITIONS: {
    LIST: '/competitions',
    DETAIL: (id: string) => `/competitions/${id}`,
    CREATE: '/competitions',
    FEDERATION: (federation: string) => `/competitions/federation/${federation}`,
    UPCOMING: '/competitions/upcoming',
  },
};