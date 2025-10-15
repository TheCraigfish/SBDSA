import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SyncQueueItem, SyncStatus } from '@sbdsa/shared';

// Define state interface
interface SyncState {
  syncStatus: SyncStatus;
  syncQueue: SyncQueueItem[];
  lastSyncTime: Date | null;
  isOnline: boolean;
  syncInProgress: boolean;
  error: string | null;
  pendingItems: number;
}

// Initial state
const initialState: SyncState = {
  syncStatus: {
    lastSyncAt: undefined,
    pendingItems: 0,
    syncInProgress: false,
    online: true,
  },
  syncQueue: [],
  lastSyncTime: null,
  isOnline: true,
  syncInProgress: false,
  error: null,
  pendingItems: 0,
};

// Async thunks
export const syncData = createAsyncThunk(
  'sync/syncData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { sync: SyncState };
      const { syncQueue } = state.sync;
      
      if (syncQueue.length === 0) {
        return { syncedItems: 0, remainingItems: 0 };
      }
      
      // This will be implemented with actual API calls
      // For now, just simulate successful sync
      const syncedItems = syncQueue.length;
      
      return { syncedItems, remainingItems: 0 };
    } catch (error) {
      return rejectWithValue('Sync failed');
    }
  },
);

export const addToSyncQueue = createAsyncThunk(
  'sync/addToSyncQueue',
  async (item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'synced'>, { rejectWithValue }) => {
    try {
      const syncItem: SyncQueueItem = {
        ...item,
        id: Date.now().toString(),
        timestamp: new Date(),
        synced: false,
      };
      
      return syncItem;
    } catch (error) {
      return rejectWithValue('Failed to add item to sync queue');
    }
  },
);

export const removeFromSyncQueue = createAsyncThunk(
  'sync/removeFromSyncQueue',
  async (itemId: string, { rejectWithValue }) => {
    try {
      return itemId;
    } catch (error) {
      return rejectWithValue('Failed to remove item from sync queue');
    }
  },
);

export const checkConnectionStatus = createAsyncThunk(
  'sync/checkConnectionStatus',
  async (_, { rejectWithValue }) => {
    try {
      // This will be implemented with actual network check
      // For now, just return true
      return true;
    } catch (error) {
      return rejectWithValue('Failed to check connection status');
    }
  },
);

// Create slice
const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
      state.syncStatus.online = action.payload;
    },
    setSyncInProgress: (state, action: PayloadAction<boolean>) => {
      state.syncInProgress = action.payload;
      state.syncStatus.syncInProgress = action.payload;
    },
    updateSyncStatus: (state, action: PayloadAction<Partial<SyncStatus>>) => {
      state.syncStatus = { ...state.syncStatus, ...action.payload };
    },
    clearSyncQueue: (state) => {
      state.syncQueue = [];
      state.syncStatus.pendingItems = 0;
      state.pendingItems = 0;
    },
    retryFailedSyncs: (state) => {
      // Mark all unsynced items as ready for retry
      state.syncQueue = state.syncQueue.map(item => ({
        ...item,
        synced: false,
      }));
      state.syncStatus.pendingItems = state.syncQueue.length;
      state.pendingItems = state.syncQueue.length;
    },
  },
  extraReducers: (builder) => {
    // Sync data
    builder
      .addCase(syncData.pending, (state) => {
        state.syncInProgress = true;
        state.syncStatus.syncInProgress = true;
        state.error = null;
      })
      .addCase(syncData.fulfilled, (state, action) => {
        state.syncInProgress = false;
        state.syncStatus.syncInProgress = false;
        state.lastSyncTime = new Date();
        state.syncStatus.lastSyncAt = new Date();
        
        // Remove synced items from queue
        const { syncedItems } = action.payload;
        if (syncedItems > 0) {
          state.syncQueue = [];
          state.syncStatus.pendingItems = 0;
          state.pendingItems = 0;
        }
      })
      .addCase(syncData.rejected, (state, action) => {
        state.syncInProgress = false;
        state.syncStatus.syncInProgress = false;
        state.error = action.payload as string;
      });

    // Add to sync queue
    builder
      .addCase(addToSyncQueue.fulfilled, (state, action) => {
        state.syncQueue.push(action.payload);
        state.syncStatus.pendingItems = state.syncQueue.length;
        state.pendingItems = state.syncQueue.length;
      })
      .addCase(addToSyncQueue.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Remove from sync queue
    builder
      .addCase(removeFromSyncQueue.fulfilled, (state, action) => {
        state.syncQueue = state.syncQueue.filter(
          item => item.id !== action.payload
        );
        state.syncStatus.pendingItems = state.syncQueue.length;
        state.pendingItems = state.syncQueue.length;
      })
      .addCase(removeFromSyncQueue.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Check connection status
    builder
      .addCase(checkConnectionStatus.pending, (state) => {
        // Could show a loading indicator if needed
      })
      .addCase(checkConnectionStatus.fulfilled, (state, action) => {
        const wasOffline = !state.isOnline;
        state.isOnline = action.payload;
        state.syncStatus.online = action.payload;
        
        // If we just came back online, trigger a sync
        if (wasOffline && action.payload && state.syncQueue.length > 0) {
          // In a real app, this would trigger the syncData thunk
          state.syncStatus.pendingItems = state.syncQueue.length;
          state.pendingItems = state.syncQueue.length;
        }
      })
      .addCase(checkConnectionStatus.rejected, (state, action) => {
        state.error = action.payload as string;
        // Assume offline if check fails
        state.isOnline = false;
        state.syncStatus.online = false;
      });
  },
});

export const {
  clearError,
  setOnlineStatus,
  setSyncInProgress,
  updateSyncStatus,
  clearSyncQueue,
  retryFailedSyncs,
} = syncSlice.actions;

export default syncSlice.reducer;