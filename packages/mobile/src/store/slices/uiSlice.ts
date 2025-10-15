import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define state interface
interface UIState {
  theme: 'light' | 'dark' | 'system';
  isLoading: boolean;
  loadingMessage: string | null;
  error: string | null;
  successMessage: string | null;
  activeModal: string | null;
  modalData: any;
  bottomSheetVisible: boolean;
  bottomSheetContent: string | null;
  workoutTimerActive: boolean;
  workoutTimerSeconds: number;
  activeWorkoutId: string | null;
  networkActivityIndicatorVisible: boolean;
  keyboardVisible: boolean;
  keyboardHeight: number;
}

// Initial state
const initialState: UIState = {
  theme: 'system',
  isLoading: false,
  loadingMessage: null,
  error: null,
  successMessage: null,
  activeModal: null,
  modalData: null,
  bottomSheetVisible: false,
  bottomSheetContent: null,
  workoutTimerActive: false,
  workoutTimerSeconds: 0,
  activeWorkoutId: null,
  networkActivityIndicatorVisible: false,
  keyboardVisible: false,
  keyboardHeight: 0,
};

// Create slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || null;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },
    
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
      state.loadingMessage = null;
    },
    
    showModal: (state, action: PayloadAction<{ modalType: string; data?: any }>) => {
      state.activeModal = action.payload.modalType;
      state.modalData = action.payload.data || null;
    },
    
    hideModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
    },
    
    showBottomSheet: (state, action: PayloadAction<string>) => {
      state.bottomSheetVisible = true;
      state.bottomSheetContent = action.payload;
    },
    
    hideBottomSheet: (state) => {
      state.bottomSheetVisible = false;
      state.bottomSheetContent = null;
    },
    
    startWorkoutTimer: (state, action: PayloadAction<{ workoutId: string; initialSeconds?: number }>) => {
      state.workoutTimerActive = true;
      state.activeWorkoutId = action.payload.workoutId;
      state.workoutTimerSeconds = action.payload.initialSeconds || 0;
    },
    
    stopWorkoutTimer: (state) => {
      state.workoutTimerActive = false;
      state.activeWorkoutId = null;
      state.workoutTimerSeconds = 0;
    },
    
    setWorkoutTimerSeconds: (state, action: PayloadAction<number>) => {
      state.workoutTimerSeconds = action.payload;
    },
    
    showNetworkActivityIndicator: (state) => {
      state.networkActivityIndicatorVisible = true;
    },
    
    hideNetworkActivityIndicator: (state) => {
      state.networkActivityIndicatorVisible = false;
    },
    
    setKeyboardState: (state, action: PayloadAction<{ visible: boolean; height: number }>) => {
      state.keyboardVisible = action.payload.visible;
      state.keyboardHeight = action.payload.height;
    },
  },
});

export const {
  setTheme,
  setLoading,
  setError,
  setSuccessMessage,
  clearMessages,
  showModal,
  hideModal,
  showBottomSheet,
  hideBottomSheet,
  startWorkoutTimer,
  stopWorkoutTimer,
  setWorkoutTimerSeconds,
  showNetworkActivityIndicator,
  hideNetworkActivityIndicator,
  setKeyboardState,
} = uiSlice.actions;

export default uiSlice.reducer;