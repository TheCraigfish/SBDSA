import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Text } from 'react-native-paper';
import { RootState, AppDispatch } from '../../store';
import { checkConnectionStatus } from '../../store/slices/syncSlice';

const SyncStatusIndicator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOnline, syncInProgress, lastSyncTime, pendingItems } = useSelector(
    (state: RootState) => state.sync
  );
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = React.useState(false);

  // Show indicator when sync status changes
  useEffect(() => {
    if (syncInProgress || pendingItems > 0) {
      setVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [syncInProgress, pendingItems, fadeAnim]);

  // Check connection status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkConnectionStatus());
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  if (!visible) return null;

  const getStatusIcon = () => {
    if (syncInProgress) {
      return 'sync';
    } else if (pendingItems > 0) {
      return 'sync-alert';
    } else if (isOnline) {
      return 'check-circle';
    } else {
      return 'wifi-off';
    }
  };

  const getStatusColor = () => {
    if (syncInProgress) {
      return '#FFB300'; // Amber
    } else if (pendingItems > 0) {
      return '#FF5722'; // Deep Orange
    } else if (isOnline) {
      return '#4CAF50'; // Green
    } else {
      return '#F44336'; // Red
    }
  };

  const getStatusText = () => {
    if (syncInProgress) {
      return 'Syncing...';
    } else if (pendingItems > 0) {
      return `${pendingItems} pending`;
    } else if (isOnline) {
      return 'Synced';
    } else {
      return 'Offline';
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Icon
        source={getStatusIcon()}
        size={16}
        color={getStatusColor()}
      />
      <Text style={[styles.statusText, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
      {syncInProgress && (
        <View style={styles.syncingDot} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 1000,
  },
  statusText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  syncingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFB300',
    marginLeft: 6,
    // Add pulsing animation
  },
});

export default SyncStatusIndicator;