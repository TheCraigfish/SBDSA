# Android Studio Setup for SBD SA App

## Prerequisites

1. Install [Android Studio](https://developer.android.com/studio)
2. Install Java JDK (version 11 or higher)
3. Set up Android SDK with API 33
4. Configure Android Virtual Device (AVD) or connect a physical device

## Initial Setup

1. Open Android Studio
2. Select "Open an existing project"
3. Navigate to `packages/mobile/android` and select the folder
4. Wait for Gradle to sync the project

## Generating Debug Keystore

Before building the app, you need to generate a debug keystore:

1. Open Command Prompt or Terminal
2. Navigate to `packages/mobile/android/app`
3. Run the following command:
   ```
   keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
   ```
4. If you already have a `debug.keystore.placeholder` file, rename it to `debug.keystore`

## Running the App

### Using Android Studio

1. Connect a physical device or start an emulator
2. Select the device from the dropdown menu
3. Click the "Run" button (green play icon)

### Using Command Line

1. Navigate to the project root directory
2. Run:
   ```
   cd packages/mobile
   npm run android
   ```

## Troubleshooting

### Gradle Sync Issues

- Ensure you have a stable internet connection
- Check that your Android SDK is properly installed
- Verify the `local.properties` file points to the correct SDK location

### Build Errors

- Make sure you have generated the debug keystore
- Check that all required permissions are in `AndroidManifest.xml`
- Verify that your Java version is compatible

### Device Connection Issues

- Enable USB debugging on your physical device
- Check that the device drivers are properly installed
- Try restarting ADB: `adb kill-server && adb start-server`

## Project Structure

```
android/
├── app/
│   ├── build.gradle              # App-level build configuration
│   ├── src/main/
│   │   ├── java/com/sbdsa/       # Java source code
│   │   ├── res/                  # App resources
│   │   └── AndroidManifest.xml   # App manifest
│   └── proguard-rules.pro        # ProGuard configuration
├── build.gradle                  # Project-level build configuration
├── gradle.properties             # Gradle properties
├── local.properties              # Local SDK path (not version controlled)
└── settings.gradle               # Gradle settings
```

## Additional Notes

- The project uses React Native 0.72.3
- Target SDK version: 33
- Minimum SDK version: 21
- The app package name is `com.sbdsa`