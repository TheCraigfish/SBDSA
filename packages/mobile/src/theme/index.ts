import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// South African brand colors
const saBrandColors = {
  primary: '#00875A', // South African green
  secondary: '#FF7900', // South African orange
  accent: '#E63946', // South African red
  background: '#1a1a1a',
  surface: '#2a2a2a',
  error: '#E63946',
  success: '#00875A',
  warning: '#FF7900',
  info: '#4361EE',
};

// Light theme
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: saBrandColors.primary,
    secondary: saBrandColors.secondary,
    background: '#FFFFFF',
    surface: '#F5F5F5',
    error: saBrandColors.error,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#1a1a1a',
    onSurface: '#1a1a1a',
    onError: '#FFFFFF',
    outline: '#E0E0E0',
    disabled: '#757575',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF7900',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontSize: 32,
      fontWeight: '700' as const,
    },
    headlineMedium: {
      ...MD3LightTheme.fonts.headlineMedium,
      fontSize: 28,
      fontWeight: '600' as const,
    },
    headlineSmall: {
      ...MD3LightTheme.fonts.headlineSmall,
      fontSize: 24,
      fontWeight: '600' as const,
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontSize: 22,
      fontWeight: '500' as const,
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontSize: 16,
      fontWeight: '500' as const,
    },
    titleSmall: {
      ...MD3LightTheme.fonts.titleSmall,
      fontSize: 14,
      fontWeight: '500' as const,
    },
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontSize: 16,
      fontWeight: '400' as const,
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontSize: 14,
      fontWeight: '400' as const,
    },
    bodySmall: {
      ...MD3LightTheme.fonts.bodySmall,
      fontSize: 12,
      fontWeight: '400' as const,
    },
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontSize: 14,
      fontWeight: '500' as const,
    },
    labelMedium: {
      ...MD3LightTheme.fonts.labelMedium,
      fontSize: 12,
      fontWeight: '500' as const,
    },
    labelSmall: {
      ...MD3LightTheme.fonts.labelSmall,
      fontSize: 11,
      fontWeight: '500' as const,
    },
  },
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

// Dark theme
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: saBrandColors.primary,
    secondary: saBrandColors.secondary,
    background: saBrandColors.background,
    surface: saBrandColors.surface,
    error: saBrandColors.error,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onError: '#FFFFFF',
    outline: '#424242',
    disabled: '#757575',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF7900',
  },
  fonts: lightTheme.fonts,
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

// Spacing constants
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius constants
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Shadow constants
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Default theme (can be switched based on user preference)
export const theme = lightTheme;

// Theme helper functions
export const getTheme = (isDark: boolean) => (isDark ? darkTheme : lightTheme);

export const getColor = (colorName: keyof typeof saBrandColors) => saBrandColors[colorName];

export const getSpacing = (size: keyof typeof spacing) => spacing[size];

export const getBorderRadius = (size: keyof typeof borderRadius) => borderRadius[size];

export const getShadow = (size: keyof typeof shadows) => shadows[size];