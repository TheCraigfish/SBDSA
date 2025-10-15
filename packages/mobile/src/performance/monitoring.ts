import { Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import perf from '@react-native-firebase/perf';

/**
 * Performance monitoring utilities for the SBD SA app
 * This module provides tools to monitor app performance, track crashes,
 * and collect analytics data specifically tailored for South African users
 */

export interface PerformanceMetrics {
  appStartTime: number;
  screenLoadTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  batteryUsage: number;
  networkLatency: number;
}

export interface ScreenPerformanceData {
  screenName: string;
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  timestamp: Date;
}

export interface ApiPerformanceData {
  endpoint: string;
  method: string;
  responseTime: number;
  statusCode: number;
  timestamp: Date;
  networkType: string;
}

class PerformanceMonitor {
  private startTime: number = Date.now();
  private screenMetrics: Map<string, ScreenPerformanceData> = new Map();
  private apiMetrics: ApiPerformanceData[] = [];
  private isOnline: boolean = true;

  constructor() {
    this.initializeMonitoring();
  }

  /**
   * Initialize performance monitoring
   */
  private initializeMonitoring(): void {
    // Set user attributes for South African context
    analytics().setUserProperty('country', 'South Africa');
    analytics().setUserProperty('app_version', '1.0.0');
    
    // Enable performance monitoring
    if (perf().isPerformanceCollectionEnabled) {
      perf().setPerformanceCollectionEnabled(true);
    }

    // Log app startup
    this.logAppStartup();
  }

  /**
   * Log app startup performance
   */
  private logAppStartup(): void {
    const appStartTime = Date.now() - this.startTime;
    
    // Log to Firebase Performance
    const trace = perf().newTrace('app_startup');
    trace.putMetric('startup_time', appStartTime);
    trace.putAttribute('platform', Platform.OS);
    trace.putAttribute('device_type', this.getDeviceType());
    trace.stop();

    // Log to analytics
    analytics().logEvent('app_startup', {
      startup_time: appStartTime,
      platform: Platform.OS,
      device_type: this.getDeviceType(),
    });

    // Log to crashlytics for low-end device monitoring
    if (this.isLowEndDevice()) {
      crashlytics().log(`App startup on low-end device: ${appStartTime}ms`);
      crashlytics().setAttribute('device_performance_category', 'low_end');
    }
  }

  /**
   * Start tracking screen performance
   */
  startScreenTracking(screenName: string): string {
    const traceId = `${screenName}_${Date.now()}`;
    const trace = perf().newTrace(`screen_${screenName}`);
    trace.start();
    
    return traceId;
  }

  /**
   * Stop tracking screen performance
   */
  stopScreenTracking(traceId: string, screenName: string): void {
    const trace = perf().newTrace(`screen_${screenName}`);
    trace.stop();
    
    // Record screen view in analytics
    analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    });
  }

  /**
   * Track API call performance
   */
  trackApiCall(
    endpoint: string,
    method: string,
    startTime: number,
    statusCode: number,
    networkType: string
  ): void {
    const responseTime = Date.now() - startTime;
    
    const apiData: ApiPerformanceData = {
      endpoint,
      method,
      responseTime,
      statusCode,
      timestamp: new Date(),
      networkType,
    };
    
    this.apiMetrics.push(apiData);
    
    // Log to Firebase Performance
    const trace = perf().newHttpMetric(endpoint, method);
    trace.setHttpResponseCode(statusCode);
    trace.setRequestPayloadSize(0); // Would be calculated in real implementation
    trace.setResponsePayloadSize(0); // Would be calculated in real implementation
    trace.setResponseContentType('application/json');
    trace.stop();

    // Log slow API calls for South African network conditions
    if (responseTime > 5000) { // 5 seconds threshold for SA mobile networks
      crashlytics().log(`Slow API call: ${endpoint} took ${responseTime}ms on ${networkType}`);
      crashlytics().recordError(new Error(`Slow API: ${endpoint}`));
    }

    // Keep only last 100 API metrics
    if (this.apiMetrics.length > 100) {
      this.apiMetrics = this.apiMetrics.slice(-100);
    }
  }

  /**
   * Track memory usage
   */
  trackMemoryUsage(): void {
    // This would use a native module to get actual memory usage
    // For now, we'll simulate it
    const memoryUsage = Math.random() * 100; // MB
    
    const trace = perf().newTrace('memory_usage');
    trace.putMetric('memory_mb', memoryUsage);
    trace.putAttribute('platform', Platform.OS);
    trace.stop();

    // Alert on high memory usage
    if (memoryUsage > 150) { // 150MB threshold
      crashlytics().log(`High memory usage: ${memoryUsage}MB`);
      crashlytics().setAttribute('memory_warning', 'high');
    }
  }

  /**
   * Track battery usage during workout
   */
  startWorkoutBatteryTracking(workoutId: string): void {
    const trace = perf().newTrace(`workout_battery_${workoutId}`);
    trace.start();
    
    // Log workout start
    analytics().logEvent('workout_start', {
      workout_id: workoutId,
      battery_level: 'unknown', // Would get from battery API
    });
  }

  /**
   * Stop tracking battery usage during workout
   */
  stopWorkoutBatteryTracking(workoutId: string): void {
    const trace = perf().newTrace(`workout_battery_${workoutId}`);
    trace.stop();
    
    // Log workout end
    analytics().logEvent('workout_end', {
      workout_id: workoutId,
      battery_level: 'unknown', // Would get from battery API
    });
  }

  /**
   * Log custom performance event
   */
  logPerformanceEvent(
    eventName: string,
    parameters?: { [key: string]: any }
  ): void {
    // Add South African context
    const enrichedParameters = {
      ...parameters,
      country: 'South Africa',
      platform: Platform.OS,
      timestamp: new Date().toISOString(),
    };

    analytics().logEvent(`perf_${eventName}`, enrichedParameters);
  }

  /**
   * Log error with performance context
   */
  logError(error: Error, context?: { [key: string]: any }): void {
    // Add performance context to error
    const enrichedContext: { [key: string]: any } = {
      ...context,
      memory_usage: 'unknown', // Would get from memory API
      network_type: 'unknown', // Would get from network info API
      battery_level: 'unknown', // Would get from battery API
      screen_name: 'unknown', // Would get from navigation state
    };

    crashlytics().log(`Error: ${error.message}`);
    Object.keys(enrichedContext).forEach(key => {
      crashlytics().setAttribute(key, String(enrichedContext[key]));
    });
    
    crashlytics().recordError(error);
  }

  /**
   * Get performance metrics summary
   */
  getPerformanceMetrics(): PerformanceMetrics {
    const avgApiResponseTime = this.apiMetrics.length > 0
      ? this.apiMetrics.reduce((sum, metric) => sum + metric.responseTime, 0) / this.apiMetrics.length
      : 0;

    return {
      appStartTime: Date.now() - this.startTime,
      screenLoadTime: 0, // Would calculate from screen metrics
      apiResponseTime: avgApiResponseTime,
      memoryUsage: 0, // Would get from memory API
      batteryUsage: 0, // Would get from battery API
      networkLatency: 0, // Would calculate from network metrics
    };
  }

  /**
   * Determine device type for performance categorization
   */
  private getDeviceType(): string {
    // This would use device info to determine device type
    // For South African market, we're particularly interested in low-end devices
    return 'unknown'; // Would implement actual detection
  }

  /**
   * Check if device is low-end based on common South African devices
   */
  private isLowEndDevice(): boolean {
    // This would check against known low-end devices common in SA
    return false; // Would implement actual detection
  }

  /**
   * Report performance issues specific to South African conditions
   */
  reportSouthAfricanPerformanceIssues(): void {
    const metrics = this.getPerformanceMetrics();
    
    // Check for issues common in South Africa
    if (metrics.apiResponseTime > 3000) {
      crashlytics().log('Slow API response times detected - potential network issue');
    }
    
    if (metrics.appStartTime > 5000) {
      crashlytics().log('Slow app startup - potential issue on South African devices');
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export convenience functions
export const startScreenTracking = (screenName: string) => 
  performanceMonitor.startScreenTracking(screenName);

export const stopScreenTracking = (traceId: string, screenName: string) => 
  performanceMonitor.stopScreenTracking(traceId, screenName);

export const trackApiCall = (
  endpoint: string,
  method: string,
  startTime: number,
  statusCode: number,
  networkType: string
) => performanceMonitor.trackApiCall(endpoint, method, startTime, statusCode, networkType);

export const logPerformanceEvent = (
  eventName: string,
  parameters?: { [key: string]: any }
) => performanceMonitor.logPerformanceEvent(eventName, parameters);

export const logError = (error: Error, context?: { [key: string]: any }) =>
  performanceMonitor.logError(error, context);