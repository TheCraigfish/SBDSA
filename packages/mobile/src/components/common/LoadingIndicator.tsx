import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
  style?: any;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'large',
  color,
  style,
}) => {
  const theme = useTheme();
  const indicatorColor = color || theme.colors.primary;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        testID="loading-indicator"
        size={size}
        color={indicatorColor}
        animating={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;