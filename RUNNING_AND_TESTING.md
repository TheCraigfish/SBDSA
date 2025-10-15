# Running and Testing Guide for SBD SA

This guide provides comprehensive instructions for setting up, running, and testing the SBD SA (South African Powerlifting) application in a development environment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Development Environment Setup](#development-environment-setup)
3. [Installing Dependencies](#installing-dependencies)
4. [Database Setup](#database-setup)
5. [Running the Backend Server](#running-the-backend-server)
6. [Running the Mobile App](#running-the-mobile-app)
7. [Running Tests](#running-tests)
8. [Common Troubleshooting](#common-troubleshooting)
9. [Current Implementation Status](#current-implementation-status)

## Prerequisites

Before you begin, ensure you have the following software installed:

### Required Software

1. **Node.js** (v16.x or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` (should be 16.x or higher)

2. **npm** (v8.x or higher)
   - Usually installed with Node.js
   - Verify installation: `npm --version` (should be 8.x or higher)

3. **PostgreSQL** (v12 or higher)
   - Download from [postgresql.org](https://www.postgresql.org/download/)
   - For Windows: Use the installer or Chocolatey: `choco install postgresql`
   - For macOS: Use Homebrew: `brew install postgresql`
   - For Linux (Ubuntu/Debian): `sudo apt-get install postgresql postgresql-contrib`

4. **Redis** (v6 or higher)
   - Download from [redis.io](https://redis.io/download)
   - For Windows: Use WSL or Docker
   - For macOS: Use Homebrew: `brew install redis`
   - For Linux (Ubuntu/Debian): `sudo apt-get install redis-server`

### Mobile Development Requirements

5. **React Native CLI**
   - Install globally: `npm install -g react-native-cli`

6. **For Android Development:**
   - **Java Development Kit (JDK)** (v11 or higher)
   - **Android Studio** (latest version)
     - Download from [developer.android.com](https://developer.android.com/studio)
     - Install Android SDK (API level 30 or higher)
     - Configure Android Virtual Device (AVD) or connect a physical device
   - Set `ANDROID_HOME` environment variable to your Android SDK path

7. **For iOS Development (macOS only):**
   - **Xcode** (latest version)
     - Install from Mac App Store
     - Install Xcode Command Line Tools: `xcode-select --install`
   - **CocoaPods** (dependency manager for iOS)
     - Install: `sudo gem install cocoapods`

### Optional Tools

8. **Git** - For version control
9. **VS Code** or another code editor
10. **Postman** or similar API testing tool
11. **Docker** - For containerized database setup (optional)

## Development Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/sbdsa-app.git
cd sbdsa-app
```

### 2. Verify Node and npm Versions

```bash
node --version  # Should be 16.x or higher
npm --version   # Should be 8.x or higher
```

### 3. Verify Database Services

```bash
# Check PostgreSQL
psql --version

# Check Redis
redis-server --version
```

## Installing Dependencies

The project uses a monorepo structure with npm workspaces. Install dependencies for all packages:

```bash
# Install dependencies for all packages
npm run bootstrap

# This command runs:
# - npm install (root dependencies)
# - npm run setup:mobile
# - npm run setup:backend
# - npm run setup:shared
```

If you prefer to install dependencies manually:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd packages/backend
npm install

# Install mobile dependencies
cd ../mobile
npm install

# Install shared dependencies
cd ../shared
npm install

# Return to root directory
cd ../..
```

## Database Setup

### 1. PostgreSQL Setup

1. **Start PostgreSQL Service**
   - Windows: Start the PostgreSQL service from Services
   - macOS: `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`

2. **Create Database**
   ```bash
   # Create a new database named 'sbdsa'
   createdb sbdsa
   
   # Or using psql
   psql -U postgres -c "CREATE DATABASE sbdsa;"
   ```

3. **Create Database User (Optional)**
   ```bash
   # Create a dedicated user for the application
   psql -U postgres -c "CREATE USER sbdsa_user WITH PASSWORD 'your_password';"
   psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE sbdsa TO sbdsa_user;"
   ```

### 2. Redis Setup

1. **Start Redis Service**
   - Windows: Start Redis server
   - macOS: `brew services start redis`
   - Linux: `sudo systemctl start redis`

2. **Verify Redis is Running**
   ```bash
   redis-cli ping
   # Should return: PONG
   ```

### 3. Configure Environment Variables

1. **Backend Environment Configuration**
   ```bash
   # Copy the example environment file
   cp packages/backend/.env.example packages/backend/.env
   
   # Edit the environment file with your configuration
   # Important: Update the following values:
   # - DATABASE_PASSWORD: Your PostgreSQL password
   # - JWT_SECRET: Generate a secure random string
   # - JWT_REFRESH_SECRET: Generate another secure random string
   ```

2. **Mobile Environment Configuration**
   ```bash
   # Copy the example environment file
   cp packages/mobile/.env.example packages/mobile/.env
   
   # Edit the environment file if needed
   # Most default values should work for development
   ```

### 4. Run Database Migrations

```bash
# Navigate to the backend directory
cd packages/backend

# Run database migrations
npm run migration:run

# Return to root directory
cd ../..
```

## Running the Backend Server

### 1. Start the Backend in Development Mode

```bash
# Navigate to the backend directory
cd packages/backend

# Start the server in development mode with hot reload
npm run start:dev

# The server will start on http://localhost:3000
# API endpoints will be available at http://localhost:3000/api
# Swagger documentation will be available at http://localhost:3000/api/swagger
```

### 2. Verify Backend is Running

You can verify the backend is running correctly by:

1. **Check the Console Output**
   - You should see logs indicating the server is running
   - Database connection should be established successfully
   - Redis connection should be established successfully

2. **Access the API**
   - Open http://localhost:3000/api in your browser
   - You should see the API response or Swagger documentation

3. **Test API Endpoints**
   ```bash
   # Test the health endpoint
   curl http://localhost:3000/api/health
   
   # Test API documentation
   curl http://localhost:3000/api/swagger
   ```

### 3. Backend Development Options

```bash
# Start in debug mode
npm run start:debug

# Start in production mode (after building)
npm run build
npm run start:prod
```

## Running the Mobile App

### Prerequisites for Mobile Development

1. Ensure your backend server is running (see previous section)
2. Ensure your development environment is set up (see Prerequisites section)

### Running on Android

1. **Start Android Emulator or Connect Physical Device**
   - For Android Studio: Open AVD Manager and start an emulator
   - For physical device: Enable USB debugging and connect via USB

2. **Start the Metro Bundler**
   ```bash
   # Open a new terminal window
   cd packages/mobile
   npm start
   # Metro bundler will start on http://localhost:8081
   ```

3. **Run the Android App**
   ```bash
   # In another terminal window
   cd packages/mobile
   npm run android
   ```

### Running on iOS (macOS Only)

1. **Install iOS Dependencies**
   ```bash
   cd packages/mobile
   cd ios
   pod install
   cd ..
   ```

2. **Start the Metro Bundler**
   ```bash
   # Open a new terminal window
   cd packages/mobile
   npm start
   # Metro bundler will start on http://localhost:8081
   ```

3. **Run the iOS App**
   ```bash
   # In another terminal window
   cd packages/mobile
   npm run ios
   ```

### Mobile Development Tips

1. **Reload the App**
   - Press `R` in the Metro terminal to reload
   - Shake the device/emulator and select "Reload"

2. **Open Developer Menu**
   - Press `D` in the Metro terminal to open the developer menu
   - Shake the device/emulator and select "Debug"

3. **Debugging**
   - For Android: Use Chrome DevTools by selecting "Debug JS Remotely"
   - For iOS: Use Safari Web Inspector

## Running Tests

### Running All Tests

```bash
# Run tests for all packages
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests for CI
npm run test:ci
```

### Running Tests for Specific Packages

1. **Backend Tests**
   ```bash
   cd packages/backend
   npm test
   npm run test:watch
   npm run test:cov
   ```

2. **Mobile Tests**
   ```bash
   cd packages/mobile
   npm test
   npm run test:watch
   npm run test:coverage
   ```

3. **Shared Code Tests**
   ```bash
   cd packages/shared
   npm test
   ```

### Running End-to-End Tests

```bash
# Run E2E tests for the mobile app
npm run test:e2e

# Run E2E tests for Android
cd packages/mobile
npm run test:e2e:android

# Build E2E tests for iOS
cd packages/mobile
npm run test:e2e:build
```

### Linting and Type Checking

```bash
# Run linting for all packages
npm run lint

# Run type checking for mobile app
cd packages/mobile
npm run type-check
```

## Common Troubleshooting

### Backend Issues

1. **Database Connection Errors**
   - Ensure PostgreSQL is running
   - Verify database credentials in `.env` file
   - Check if the database exists: `psql -l`

2. **Redis Connection Errors**
   - Ensure Redis is running: `redis-cli ping`
   - Verify Redis configuration in `.env` file

3. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill the process using the port:
     - Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
     - macOS/Linux: `lsof -ti:3000 | xargs kill`

4. **Migration Errors**
   - Check database connection
   - Run `npm run migration:revert` to undo last migration
   - Delete database and recreate if necessary

### Mobile Issues

1. **Metro Bundler Issues**
   - Clear Metro cache: `npx react-native start --reset-cache`
   - Clear npm cache: `npm start -- --reset-cache`

2. **Android Build Issues**
   - Clean the project: `cd android && ./gradlew clean`
   - Rebuild: `cd .. && npm run android`
   - Check Android SDK installation and paths

3. **iOS Build Issues**
   - Reinstall pods: `cd ios && pod install && cd ..`
   - Clean Xcode build folder in Xcode
   - Reset iOS Simulator: "Device > Erase All Content and Settings"

4. **Network Connection Issues**
   - Ensure backend is running on the correct IP
   - For physical devices, update API_BASE_URL to your computer's IP
   - Check firewall settings

### General Issues

1. **Node Modules Issues**
   - Clean all node_modules: `npm run clean`
   - Reinstall: `npm run bootstrap`

2. **Environment Variable Issues**
   - Ensure `.env` files exist in correct locations
   - Verify all required variables are set
   - Check for syntax errors in `.env` files

3. **Permission Issues**
   - Run commands with appropriate permissions
   - On Unix systems, use `sudo` if necessary (not recommended for npm)

## Current Implementation Status

### Completed Features

1. **Backend**
   - Basic NestJS application structure
   - Authentication module with JWT
   - User management
   - Workout logging
   - Training programs
   - Analytics
   - Competition management
   - Database entities and relationships
   - API documentation with Swagger

2. **Mobile App**
   - React Native application structure
   - Navigation setup
   - Redux store with state management
   - Basic screens for core features
   - Authentication screens
   - Workout tracking screens
   - Program management screens
   - Profile screens
   - Offline-first data storage with WatermelonDB

3. **Shared Code**
   - TypeScript type definitions
   - Validation schemas
   - Utility functions
   - Constants

### Known Limitations

1. **Backend**
   - No real-time notifications
   - Limited competition data
   - Basic analytics implementation

2. **Mobile App**
   - Limited offline sync functionality
   - No video recording for exercise form
   - Basic UI components

### Areas for Improvement

1. **Performance**
   - Implement API caching
   - Optimize database queries
   - Improve mobile app performance

2. **Security**
   - Implement rate limiting
   - Add input sanitization
   - Enhance authentication mechanisms

3. **Testing**
   - Increase test coverage
   - Add more integration tests
   - Implement performance testing

4. **Documentation**
   - Add more API documentation
   - Create developer guides
   - Document deployment processes

### Next Steps

1. Complete the implementation of remaining features
2. Enhance the mobile app UI/UX
3. Implement comprehensive testing
4. Set up CI/CD pipeline
5. Deploy to staging and production environments