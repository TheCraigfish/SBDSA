// Main export file for the shared package

// Export all types
export * from './types';

// Export all constants
export * from './constants';

// Export validation schemas and utilities
export * from './validation';

// Export calculation utilities
export * from './utils/calculations';

// Import specific types for explicit re-exports
import {
  User,
  UserProfile,
  Exercise,
  Workout,
  Set,
  PersonalRecord,
  Program,
  UserProgram,
  LoginRequest,
  RegisterRequest,
  AuthTokens,
} from './types';

// Import specific constants for explicit re-exports
import {
  SOUTH_AFRICAN_PLATES,
  BAR_WEIGHTS,
  ONE_RM_FORMULAS,
  DEFAULT_PROGRAMS,
  WEIGHT_CLASSES,
  AGE_CATEGORIES,
  RPE_SCALE,
  APP_SETTINGS,
  API_ENDPOINTS,
  STORAGE_KEYS,
} from './constants';

// Import specific validation schemas for explicit re-exports
import {
  userSchema,
  userProfileSchema,
  exerciseSchema,
  workoutSchema,
  setSchema,
  personalRecordSchema,
  programSchema,
  userProgramSchema,
  loginRequestSchema,
  registerRequestSchema,
  validateAndSanitize,
  validatePartial,
} from './validation';

// Re-export commonly used combinations
export {
  // Types that are frequently used together
  User,
  UserProfile,
  Exercise,
  Workout,
  Set,
  PersonalRecord,
  Program,
  UserProgram,
  LoginRequest,
  RegisterRequest,
  AuthTokens,
};

// Re-export constants that are commonly used
export {
  SOUTH_AFRICAN_PLATES,
  BAR_WEIGHTS,
  ONE_RM_FORMULAS,
  DEFAULT_PROGRAMS,
  WEIGHT_CLASSES,
  AGE_CATEGORIES,
  RPE_SCALE,
  APP_SETTINGS,
  API_ENDPOINTS,
  STORAGE_KEYS,
};

// Re-export validation schemas
export {
  userSchema,
  userProfileSchema,
  exerciseSchema,
  workoutSchema,
  setSchema,
  personalRecordSchema,
  programSchema,
  userProgramSchema,
  loginRequestSchema,
  registerRequestSchema,
  validateAndSanitize,
  validatePartial,
};