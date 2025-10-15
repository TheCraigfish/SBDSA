// Application constants for SBD SA app

// South African specific constants
export const SOUTH_AFRICAN_PLATES = [
  { weight: 25, color: '#FF0000', count: 2 }, // Red - 25kg
  { weight: 20, color: '#0000FF', count: 2 }, // Blue - 20kg
  { weight: 15, color: '#FFFF00', count: 2 }, // Yellow - 15kg
  { weight: 10, color: '#00FF00', count: 2 }, // Green - 10kg
  { weight: 5, color: '#000000', count: 4 },  // Black - 5kg
  { weight: 2.5, color: '#FFFFFF', count: 4 }, // White - 2.5kg
  { weight: 1.25, color: '#C0C0C0', count: 4 }, // Silver - 1.25kg
  { weight: 0.5, color: '#808080', count: 4 }, // Gray - 0.5kg
  { weight: 0.25, color: '#FFD700', count: 4 }, // Gold - 0.25kg
];

export const BAR_WEIGHTS = {
  mens: 20, // 20kg men's Olympic bar
  womens: 15, // 15kg women's Olympic bar
  standard: 15, // 15kg standard bar
};

// South African federations
export const SOUTH_AFRICAN_FEDERATIONS = {
  PSA: 'Powerlifting South Africa',
  SAPF: 'South African Powerlifting Federation',
  CRPSA: 'Classic Raw Powerlifting South Africa',
};

// Exercise categories
export const EXERCISE_CATEGORIES = {
  squat: 'Squat',
  bench: 'Bench Press',
  deadlift: 'Deadlift',
  accessory: 'Accessory',
  cardio: 'Cardio',
  mobility: 'Mobility',
};

// Muscle groups
export const MUSCLE_GROUPS = {
  quadriceps: 'Quadriceps',
  hamstrings: 'Hamstrings',
  glutes: 'Glutes',
  calves: 'Calves',
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  biceps: 'Biceps',
  triceps: 'Triceps',
  core: 'Core',
  forearms: 'Forearms',
};

// Equipment types
export const EQUIPMENT_TYPES = {
  barbell: 'Barbell',
  dumbbell: 'Dumbbell',
  kettlebell: 'Kettlebell',
  machine: 'Machine',
  cable: 'Cable',
  bodyweight: 'Bodyweight',
  bands: 'Bands',
  plates: 'Plates',
  'squat-rack': 'Squat Rack',
  bench: 'Bench',
  'deadlift-platform': 'Deadlift Platform',
};

// 1RM calculation formulas
export const ONE_RM_FORMULAS = {
  epley: (weight: number, reps: number): number => {
    return weight * (1 + reps / 30);
  },
  brzycki: (weight: number, reps: number): number => {
    return weight * 36 / (37 - reps);
  },
  lander: (weight: number, reps: number): number => {
    return weight * (100 / (101.3 - 2.67123 * reps));
  },
  oConner: (weight: number, reps: number): number => {
    return weight * (1 + 0.025 * reps);
  },
};

// Default program templates
export const DEFAULT_PROGRAMS = {
  // 5/3/1 Powerlifting Program
  '5-3-1': {
    name: '5/3/1 Powerlifting',
    description: 'Jim Wendler\'s classic powerlifting program focusing on slow progression',
    durationWeeks: 16,
    difficultyLevel: 3,
    category: 'powerlifting' as const,
  },
  
  // Starting Strength
  'starting-strength': {
    name: 'Starting Strength',
    description: 'Mark Rippetoe\'s novice linear progression program',
    durationWeeks: 12,
    difficultyLevel: 2,
    category: 'powerlifting' as const,
  },
  
  // Texas Method
  'texas-method': {
    name: 'Texas Method',
    description: 'Intermediate powerlifting program with volume, intensity, and recovery days',
    durationWeeks: 12,
    difficultyLevel: 4,
    category: 'powerlifting' as const,
  },
  
  // Basic Hypertrophy
  'basic-hypertrophy': {
    name: 'Basic Hypertrophy',
    description: 'Bodybuilding program focused on muscle growth',
    durationWeeks: 8,
    difficultyLevel: 2,
    category: 'bodybuilding' as const,
  },
  
  // Upper/Lower Split
  'upper-lower': {
    name: 'Upper/Lower Split',
    description: '4-day split with upper and lower body focus',
    durationWeeks: 8,
    difficultyLevel: 3,
    category: 'bodybuilding' as const,
  },
};

// Weight classes (South African standards)
export const WEIGHT_CLASSES = {
  male: {
    '52': '52kg',
    '56': '56kg',
    '59': '59kg',
    '66': '66kg',
    '74': '74kg',
    '83': '83kg',
    '93': '93kg',
    '105': '105kg',
    '120': '120kg',
    '120+': '120kg+',
  },
  female: {
    '43': '43kg',
    '47': '47kg',
    '52': '52kg',
    '57': '57kg',
    '63': '63kg',
    '69': '69kg',
    '76': '76kg',
    '84': '84kg',
    '84+': '84kg+',
  },
};

// Age categories
export const AGE_CATEGORIES = {
  'sub-junior': 'Sub-Junior (14-18)',
  'junior': 'Junior (19-23)',
  'open': 'Open (24-39)',
  'masters-1': 'Masters 1 (40-49)',
  'masters-2': 'Masters 2 (50-59)',
  'masters-3': 'Masters 3 (60-69)',
  'masters-4': 'Masters 4 (70+)',
};

// RPE (Rate of Perceived Exertion) scale
export const RPE_SCALE = {
  10: '10 - Max Effort',
  9.5: '9.5 - No more reps',
  9: '9 - 1 rep left',
  8.5: '8.5 - 2 reps left',
  8: '8 - 3 reps left',
  7.5: '7.5 - 4 reps left',
  7: '7 - 5+ reps left',
  6: '6 - No effort',
  5: '5 - Very light',
  4: '4 - Light',
  3: '3 - Moderate',
  2: '2 - Somewhat hard',
  1: '1 - Hard',
};

// App settings and defaults
export const APP_SETTINGS = {
  DEFAULT_UNITS: 'kg' as const,
  DEFAULT_REST_TIME: 120, // seconds
  DEFAULT_WORKOUT_DURATION: 60, // minutes
  SYNC_INTERVAL: 30000, // 30 seconds
  AUTO_SYNC_ENABLED: true,
  OFFLINE_MODE_ENABLED: true,
  MAX_WORKOUT_HISTORY_DAYS: 365,
  MAX_SETS_PER_EXERCISE: 10,
  MAX_EXERCISES_PER_WORKOUT: 20,
};

// Navigation and UI constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  MAX_INPUT_LENGTH: 255,
  MIN_PASSWORD_LENGTH: 8,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes in milliseconds
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  USERS: {
    PROFILE: '/users/profile',
    PREFERENCES: '/users/preferences',
  },
  WORKOUTS: {
    LIST: '/workouts',
    CREATE: '/workouts',
    DETAIL: (id: string) => `/workouts/${id}`,
    UPDATE: (id: string) => `/workouts/${id}`,
    DELETE: (id: string) => `/workouts/${id}`,
  },
  EXERCISES: {
    LIST: '/exercises',
    DETAIL: (id: string) => `/exercises/${id}`,
    CATEGORIES: '/exercises/categories',
  },
  PROGRAMS: {
    LIST: '/programs',
    DETAIL: (id: string) => `/programs/${id}`,
    USER_PROGRAMS: '/user-programs',
  },
  PROGRESS: {
    PERSONAL_RECORDS: '/progress/personal-records',
    ANALYTICS: '/progress/analytics',
    ONE_REP_MAX: '/progress/one-rep-max',
  },
  COMPETITIONS: {
    LIST: '/competitions',
    DETAIL: (id: string) => `/competitions/${id}`,
  },
};

// Error codes
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  SYNC_FAILED: 'SYNC_FAILED',
  OFFLINE_MODE: 'OFFLINE_MODE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
};

// Success messages
export const SUCCESS_MESSAGES = {
  WORKOUT_SAVED: 'Workout saved successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PROGRAM_STARTED: 'Program started successfully',
  PERSONAL_RECORD_ACHIEVED: 'New personal record achieved!',
  SYNC_COMPLETED: 'Data synchronized successfully',
};

// Validation regex patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  NAME: /^[a-zA-Z\s]{2,50}$/,
  PHONE: /^(\+27|0)[6-8][0-9]{8}$/, // South African phone numbers
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DDTHH:mm:ssZ',
  TIME: 'HH:mm',
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKENS: '@sbdsa_auth_tokens',
  USER_PROFILE: '@sbdsa_user_profile',
  APP_SETTINGS: '@sbdsa_app_settings',
  SYNC_QUEUE: '@sbdsa_sync_queue',
  LAST_SYNC: '@sbdsa_last_sync',
  OFFLINE_DATA: '@sbdsa_offline_data',
};