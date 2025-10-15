# SBD SA App Deployment Runbook

This document provides step-by-step instructions for deploying the SBD SA powerlifting app to various environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Backend Deployment](#backend-deployment)
4. [Mobile App Deployment](#mobile-app-deployment)
5. [Database Migrations](#database-migrations)
6. [Monitoring and Verification](#monitoring-and-verification)
7. [Rollback Procedures](#rollback-procedures)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools
- Node.js 18.x or later
- npm 8.x or later
- React Native CLI
- Android Studio (for Android builds)
- Xcode (for iOS builds)
- Docker (for backend deployment)
- PostgreSQL 14+
- Redis 7+
- Git

### Access Requirements
- GitHub repository access
- Google Play Console access
- Apple App Store Connect access
- Server access for backend deployment
- Database administrative access

### Environment Variables
Create a `.env.production` file with the following variables:

```bash
# Backend Environment Variables
NODE_ENV=production
DATABASE_URL=postgresql://username:password@hostname:5432/sbdsa_prod
REDIS_URL=redis://hostname:6379/0
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
PORT=3000

# Firebase Configuration (Mobile)
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef

# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
SENTRY_DSN=your-sentry-dsn

# South African Specific
DEFAULT_CURRENCY=ZAR
DEFAULT_COUNTRY=ZA
TIMEZONE=Africa/Johannesburg
```

## Environment Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/sbdsa-app.git
cd sbdsa-app
```

### 2. Install Dependencies
```bash
npm install
npm run bootstrap
```

### 3. Setup Environment Files
```bash
# Copy environment templates
cp packages/backend/.env.example packages/backend/.env.production
cp packages/mobile/.env.example packages/mobile/.env.production

# Edit the production environment files with your values
```

### 4. Build Shared Package
```bash
cd packages/shared
npm run build
```

## Backend Deployment

### 1. Build Backend
```bash
cd packages/backend
npm run build
```

### 2. Run Database Migrations
```bash
# Generate migration if needed
npm run migration:generate -- --name=InitSchema

# Run migrations
npm run migration:run
```

### 3. Deploy to Production Server

#### Option A: Docker Deployment
```bash
# Build Docker image
docker build -t sbdsa-backend:latest .

# Run container
docker run -d \
  --name sbdsa-backend \
  -p 3000:3000 \
  --env-file .env.production \
  sbdsa-backend:latest
```

#### Option B: PM2 Deployment
```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start dist/main.js --name sbdsa-backend

# Save PM2 configuration
pm2 save
pm2 startup
```

### 4. Configure Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name api.sbd-sa.co.za;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. Setup SSL Certificate
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d api.sbd-sa.co.za
```

## Mobile App Deployment

### Android Deployment

#### 1. Setup Android Signing
```bash
# Generate signing key
cd packages/mobile/android/app
keytool -genkeypair -v -storetype PKCS12 -keystore sbdsa-release-key.keystore -alias sbdsa -keyalg RSA -keysize 2048 -validity 10000

# Create signing configuration in android/app/build.gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

#### 2. Build Release APK
```bash
cd packages/mobile
npx react-native build-android --mode=release
```

#### 3. Upload to Google Play Console
1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app
3. Navigate to "Release" -> "Production"
4. Create new release
5. Upload the APK from `packages/mobile/android/app/build/outputs/apk/release/app-release.apk`
6. Fill in release notes
7. Submit for review

### iOS Deployment

#### 1. Setup iOS Signing
```bash
# Install certificates and provisioning profiles
# These should be provided by your Apple Developer account
# Place them in the appropriate directories
```

#### 2. Build Release IPA
```bash
cd packages/mobile
npx react-native build-ios --mode=Release
```

#### 3. Upload to App Store Connect
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Select your app
3. Navigate to "TestFlight" -> "Internal Testing"
4. Upload the IPA from `packages/mobile/ios/build/Build/Products/Release-iphoneos/SBD SA.ipa`
5. Add testers and submit for review
6. Once approved, submit to App Store review

## Database Migrations

### 1. Create Migration
```bash
cd packages/backend
npm run migration:generate -- --name=MigrationName
```

### 2. Run Migration
```bash
npm run migration:run
```

### 3. Verify Migration
```bash
# Connect to database and verify schema
psql -h hostname -U username -d sbdsa_prod
\dt
```

### 4. Rollback Migration (if needed)
```bash
npm run migration:revert
```

## Monitoring and Verification

### 1. Health Checks
```bash
# Backend health check
curl https://api.sbd-sa.co.za/health

# Check database connection
curl https://api.sbd-sa.co.za/health/db

# Check Redis connection
curl https://api.sbd-sa.co.za/health/redis
```

### 2. Log Monitoring
```bash
# View application logs
pm2 logs sbdsa-backend

# View error logs
tail -f /var/log/nginx/error.log

# View access logs
tail -f /var/log/nginx/access.log
```

### 3. Performance Monitoring
- Check Firebase Performance Monitoring dashboard
- Monitor Google Analytics for user metrics
- Check Sentry for error reports
- Monitor server resources (CPU, memory, disk)

### 4. Mobile App Monitoring
- Check Firebase Crashlytics for crashes
- Monitor app performance in Firebase
- Check user feedback in app stores
- Monitor analytics for user engagement

## Rollback Procedures

### Backend Rollback
```bash
# PM2 Rollback
pm2 reload sbdsa-backend

# Docker Rollback
docker stop sbdsa-backend
docker run -d \
  --name sbdsa-backend \
  -p 3000:3000 \
  --env-file .env.production \
  sbdsa-backend:previous-version

# Database Rollback
npm run migration:revert
```

### Mobile App Rollback
1. Go to respective app store console
2. Create new release with previous version
3. Submit for expedited review (if necessary)
4. Communicate with users about rollback

### Emergency Rollback Script
```bash
#!/bin/bash
# emergency-rollback.sh

echo "Starting emergency rollback..."

# Rollback backend
docker stop sbdsa-backend
docker run -d \
  --name sbdsa-backend-rollback \
  -p 3000:3000 \
  --env-file .env.production \
  sbdsa-backend:stable

# Notify team
echo "Backend rolled back to stable version" | mail -s "Emergency Rollback" team@sbd-sa.co.za

echo "Emergency rollback completed"
```

## Troubleshooting

### Common Issues

#### 1. Backend Won't Start
```bash
# Check logs
pm2 logs sbdsa-backend

# Check environment variables
printenv | grep NODE_ENV

# Check port availability
netstat -tlnp | grep :3000
```

#### 2. Database Connection Issues
```bash
# Test database connection
psql -h hostname -U username -d sbdsa_prod -c "SELECT 1;"

# Check database logs
tail -f /var/log/postgresql/postgresql-14-main.log
```

#### 3. Mobile Build Issues
```bash
# Clear React Native cache
npx react-native start --reset-cache

# Clear Metro cache
npx react-native start --reset-cache

# Clean Android build
cd packages/mobile/android
./gradlew clean

# Clean iOS build
cd packages/mobile/ios
xcodebuild clean
```

#### 4. SSL Certificate Issues
```bash
# Check certificate expiration
openssl s_client -connect api.sbd-sa.co.za:443 -servername api.sbd-sa.co.za 2>/dev/null | openssl x509 -noout -dates

# Renew certificate
sudo certbot renew
```

### Emergency Contacts
- Backend Team: backend@sbd-sa.co.za
- Mobile Team: mobile@sbd-sa.co.za
- DevOps Team: devops@sbd-sa.co.za
- On-call Engineer: +27 12 345 6789

### Documentation
- [API Documentation](https://api.sbd-sa.co.za/docs)
- [Mobile App Documentation](https://docs.sbd-sa.co.za/mobile)
- [Database Schema](https://docs.sbd-sa.co.za/database)

## Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Code review completed
- [ ] Security scan passed
- [ ] Performance tests passed
- [ ] Backup current version
- [ ] Notify stakeholders

### Deployment
- [ ] Deploy backend
- [ ] Run database migrations
- [ ] Verify backend health
- [ ] Deploy mobile app
- [ ] Submit to app stores

### Post-deployment
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify user functionality
- [ ] Update documentation
- [ ] Communicate deployment success
- [ ] Monitor for 24 hours after deployment

## South African Specific Considerations

### Network Connectivity
- Test offline functionality thoroughly
- Verify sync capabilities when connection is restored
- Monitor performance on slower networks common in rural areas

### Device Compatibility
- Test on low-end Android devices common in South Africa
- Verify performance on devices with limited memory
- Test on various screen sizes and resolutions

### Compliance
- Ensure POPIA (Protection of Personal Information Act) compliance
- Verify data handling meets South African regulations
- Check accessibility compliance

### Localization
- Verify South African English localization
- Check date and time formats
- Verify currency formatting (ZAR)
- Test measurement units (kg preferred)