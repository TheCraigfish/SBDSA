# SBD SA - South African Powerlifting App

A comprehensive mobile application for South African powerlifters to track workouts, manage programs, analyze progress, and stay connected with the powerlifting community.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the App](#running-the-app)
5. [Android Studio Setup](#android-studio-setup)
6. [Project Structure](#project-structure)
7. [Features](#features)
8. [API Documentation](#api-documentation)
9. [Testing](#testing)
10. [Contributing](#contributing)
11. [License](#license)

## Project Overview

SBD SA is a monorepo containing:
- **Backend API**: NestJS-based REST API with SQLite database
- **Mobile App**: React Native app for iOS and Android
- **Web Demo**: HTML/CSS/JS mobile simulator for testing

## Prerequisites

### Required Software

1. **Node.js** (version 16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (version 7 or higher)
   - Comes with Node.js
   - Verify installation: `npm --version`

3. **Java Development Kit (JDK)** (version 11 or higher)
   - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/)
   - Verify installation: `java -version`

4. **Android Studio** (latest version)
   - Download from [developer.android.com](https://developer.android.com/studio)
   - Required for Android development

5. **Android SDK**
   - Installed with Android Studio
   - API level 33 or higher required

6. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

### Environment Setup

1. **Install React Native CLI**
   ```bash
   npm install -g react-native-cli
   npm install -g @react-native-community/cli
   ```

2. **Set up Android environment**
   - Open Android Studio
   - Install Android SDK Platform 33
   - Configure Android Virtual Device (AVD)
   - Set ANDROID_HOME environment variable

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sbdsa.git
   cd sbdsa
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd packages/backend
   npm install
   cd ../..
   
   # Install mobile dependencies
   cd packages/mobile
   npm install
   cd ../..
   
   # Install web demo dependencies
   cd packages/web-demo
   npm install
   cd ../..
   ```

## Running the App

### Option 1: Using the Mobile Simulator (Recommended for Testing)

1. **Start the backend API**
   ```bash
   cd packages/backend
   npx ts-node src/main.ts
   ```

2. **Start the web demo server**
   ```bash
   cd packages/web-demo
   http-server -p 8080 -o mobile-simulator.html
   ```

3. **Access the mobile simulator**
   - Open your browser and go to `http://localhost:8080/mobile-simulator.html`
   - Test registration and login functionality

### Option 2: Using Android Studio

1. **Start the backend API**
   ```bash
   cd packages/backend
   npx ts-node src/main.ts
   ```

2. **Start Metro bundler**
   ```bash
   cd packages/mobile
   npm start
   ```

3. **Open Android Studio**
   - Click "Open" and navigate to `packages/mobile/android`
   - Wait for Gradle sync to complete
   - Select your AVD from the device dropdown
   - Click the "Run" button (green play icon)

### Option 3: Using Command Line

1. **Start the backend API**
   ```bash
   cd packages/backend
   npx ts-node src/main.ts
   ```

2. **Start Metro bundler**
   ```bash
   cd packages/mobile
   npm start
   ```

3. **Run the Android app**
   ```bash
   cd packages/mobile
   npm run android
   ```

## Android Studio Setup

### Step 1: Import the Project

1. Open Android Studio
2. Click "Open" (or File > Open)
3. Navigate to `packages/mobile/android`
4. Click "OK"

### Step 2: Configure the Project

1. Wait for Gradle sync to complete (may take several minutes)
2. Install any missing SDK components when prompted
3. Ensure the correct SDK version is selected (API level 33)

### Step 3: Set Up an Emulator

1. Go to Tools > AVD Manager
2. Click "Create Virtual Device"
3. Select a phone model (e.g., Pixel 6)
4. Select a system image (API level 33 or higher)
5. Click "Finish"
6. Wait for the emulator to download and install

### Step 4: Run the App

1. Select your emulator from the device dropdown
2. Click the "Run" button (green play icon)
3. Wait for the build to complete

### Troubleshooting Android Studio Issues

1. **Gradle sync fails**
   - Check your internet connection
   - Try using a different network or VPN
   - Clear Gradle cache: `cd android && gradlew cleanBuildCache`

2. **Build fails with "SDK location not found"**
   - Set ANDROID_HOME environment variable
   - In Android Studio: File > Project Structure > SDK Location

3. **Emulator is slow**
   - Enable hardware acceleration in BIOS
   - Use x86 images instead of ARM
   - Allocate more RAM to the AVD

4. **Metro bundler connection issues**
   - Make sure Metro is running on port 8081
   - Check that your firewall allows connections on port 8081
   - Try `adb reverse tcp:8081 tcp:8081` in a terminal

## Project Structure

```
sbdsa/
├── packages/
│   ├── backend/          # NestJS API
│   │   ├── src/
│   │   │   ├── auth/      # Authentication module
│   │   │   ├── users/     # Users module
│   │   │   ├── workouts/  # Workouts module
│   │   │   ├── programs/  # Programs module
│   │   │   └── analytics/ # Analytics module
│   │   └── ...
│   ├── mobile/           # React Native app
│   │   ├── src/
│   │   │   ├── components/ # Reusable components
│   │   │   ├── screens/    # App screens
│   │   │   ├── navigation/ # Navigation setup
│   │   │   ├── store/      # Redux store
│   │   │   ├── services/   # API services
│   │   │   └── config/     # App configuration
│   │   ├── android/        # Android-specific code
│   │   └── ...
│   ├── shared/           # Shared types and utilities
│   └── web-demo/         # HTML/CSS/JS simulator
├── docs/                 # Documentation
└── README.md
```

## Features

### Authentication
- User registration and login
- JWT-based authentication with refresh tokens
- Password reset functionality

### Workouts
- Create and track workouts
- Exercise library with instructions
- Set tracking and personal records

### Programs
- Follow structured training programs
- Program enrollment and progress tracking
- Custom program creation

### Analytics
- Progress charts and statistics
- Personal records tracking
- Workout history analysis

### Competitions
- Browse upcoming competitions
- Filter by federation
- Competition details and registration

## API Documentation

The backend API documentation is available at `http://localhost:3000/api/docs` when the backend is running.

### Key Endpoints

- **Authentication**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Workouts**: `/api/workouts/*`
- **Programs**: `/api/programs/*`
- **Analytics**: `/api/analytics/*`
- **Competitions**: `/api/competitions/*`

## Testing

### Backend Tests
```bash
cd packages/backend
npm test
```

### Mobile Tests
```bash
cd packages/mobile
npm test
```

### E2E Tests
```bash
cd packages/mobile
npm run test:e2e
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-username/sbdsa/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem
4. Provide screenshots if applicable

## Acknowledgments

- South African Powerlifting Federation (SBD SA)
- React Native community
- NestJS team
- All contributors