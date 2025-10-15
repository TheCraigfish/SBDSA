# SBD SA - South African Powerlifting App

A comprehensive powerlifting tracking application designed specifically for the South African market, focusing on Squat, Bench, and Deadlift (SBD) training.

## Features

- **Offline-First Architecture**: Full functionality without internet connection, with automatic sync when connection is restored
- **Powerlifting Focus**: Specialized tracking for SBD lifts with 1RM calculation and progression
- **South African Localization**: South African weight plates (kg), federations (PSA, SAPF, CRPSA), and payment gateways (PayFast, Yoco)
- **Training Programs**: Pre-built powerlifting programs with South African adaptations
- **Progress Analytics**: Detailed tracking of personal records, strength curves, and training volume
- **Competition Integration**: South African competition calendar and qualifying standards
- **POPIA Compliant**: Full compliance with South African data protection regulations

## Project Structure

This is a monorepo with separate packages for the mobile app, backend API, and shared code:

```
sbdsa-app/
├── packages/
│   ├── mobile/                 # React Native mobile app
│   │   ├── android/           # Android-specific code
│   │   ├── ios/               # iOS-specific code
│   │   └── src/               # Cross-platform source code
│   │       ├── components/    # Reusable UI components
│   │       ├── navigation/    # Navigation configuration
│   │       ├── screens/       # App screens
│   │       ├── services/      # API and external service integration
│   │       ├── store/         # Redux store configuration
│   │       └── theme/         # App theming
│   ├── backend/               # NestJS backend API
│   │   └── src/
│   │       ├── auth/          # Authentication module
│   │       ├── users/         # User management module
│   │       ├── workouts/      # Workout logging module
│   │       ├── programs/      # Training programs module
│   │       ├── analytics/     # Analytics module
│   │       └── competitions/  # Competition module
│   └── shared/                # Shared code between frontend and backend
│       ├── src/
│       │   ├── types/         # TypeScript type definitions
│       │   ├── constants/     # Shared constants
│       │   └── validation/    # Shared validation schemas
├── infrastructure/            # Infrastructure as code
├── docs/                     # Documentation
└── scripts/                  # Build and deployment scripts
```

## Technology Stack

### Mobile App (React Native)
- React Native 0.72.x
- TypeScript 5.0.x
- Redux Toolkit for state management
- React Navigation 6 for navigation
- React Native Paper for UI components
- WatermelonDB for offline-first data storage

### Backend API (NestJS)
- NestJS 10.x with TypeScript
- PostgreSQL with TypeORM
- Redis for caching
- JWT for authentication
- AWS for infrastructure

### Shared Code
- TypeScript 5.0.x
- Joi for validation
- Shared types and constants

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- React Native CLI
- Android Studio for Android development
- Xcode for iOS development (macOS only)
- PostgreSQL for backend database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/sbdsa-app.git
cd sbdsa-app
```

2. Install dependencies:
```bash
npm run bootstrap
```

3. Set up environment variables:
```bash
# For backend
cp packages/backend/.env.example packages/backend/.env
# Edit packages/backend/.env with your configuration
# Important: Change the JWT secrets and database credentials in production

# For mobile
cp packages/mobile/.env.example packages/mobile/.env
# Edit packages/mobile/.env with your configuration
# Update the API_BASE_URL to point to your backend server
```

4. Set up the database:
```bash
# Create PostgreSQL database
createdb sbdsa

# Run migrations
cd packages/backend
npm run migration:run
```

### Running the Application

#### Backend API

```bash
cd packages/backend
npm run start:dev
```

The API will be available at `http://localhost:3000`

#### Mobile App

For Android:

```bash
cd packages/mobile
npm run android
```

For iOS:

```bash
cd packages/mobile
npm run ios
```

## Development

### Code Style

This project uses ESLint and Prettier for code formatting. Run the linter before committing:

```bash
npm run lint
```

### Testing

Run tests for all packages:

```bash
npm test
```

Run tests for a specific package:

```bash
cd packages/mobile
npm test
```

### Building

Build the backend:

```bash
cd packages/backend
npm run build
```

Build the mobile app for Android:

```bash
cd packages/mobile
npm run build:android
```

Build the mobile app for iOS:

```bash
cd packages/mobile
npm run build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## South African Powerlifting Resources

- [Powerlifting South Africa (PSA)](https://www.powerliftingsa.co.za/)
- [South African Powerlifting Federation (SAPF)](https://www.sapowerlifting.co.za/)
- [Classic Raw Powerlifting South Africa (CRPSA)](https://www.crpsa.co.za/)

## Acknowledgments

- The React Native team for the excellent framework
- The NestJS team for the robust backend framework
- The South African powerlifting community for inspiration and feedback