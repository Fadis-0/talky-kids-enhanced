# Talky Kids - APK Build Guide

## Overview
This guide explains how to build an APK for the Talky Kids app using EAS Build.

## Prerequisites
- Node.js and npm/pnpm installed
- EAS CLI installed (`npm install -g eas-cli`)
- Expo account created (https://expo.dev)
- Logged in to EAS CLI (`eas login`)

## Configuration Files Updated
✅ `eas.json` - Configured with Android build settings
✅ `app.json` - Updated with Android permissions and version code

## Build Commands

### 1. Development Build (APK)
Creates a development build for testing with Expo development client:
```bash
eas build --platform android --profile development
```

### 2. Preview Build (APK)
Creates a preview/internal testing APK:
```bash
eas build --platform android --profile preview
```

### 3. Production Build (AAB)
Creates a production-ready Android App Bundle for Google Play Store:
```bash
eas build --platform android --profile production
```

### 4. Quick APK Build (without EAS)
For local development testing:
```bash
npm run android
```

## Build Profiles Explained

### Development
- **Type**: APK
- **Distribution**: Internal (for testing)
- **Use Case**: Development and testing with Expo dev client
- **Build Time**: ~10-15 minutes

### Preview
- **Type**: APK  
- **Distribution**: Internal (for testing)
- **Use Case**: Final testing before production
- **Build Time**: ~10-15 minutes

### Production
- **Type**: App Bundle (AAB)
- **Distribution**: Google Play Store
- **Use Case**: Publishing to store
- **Build Time**: ~15-20 minutes

## Downloading Your APK

After the build completes:
1. Visit https://expo.dev/builds
2. Find your build in the list
3. Click on it to view details
4. Download the APK file from the artifacts section

## Direct Download APK

For preview/development builds, you can get a direct download link:
```bash
eas build --platform android --profile preview --non-interactive
```

Then access the artifacts from the build details page.

## What's Configured

### Android Settings
- **Package Name**: `com.fadis.talkykids`
- **Version Code**: 1
- **Permissions**: 
  - `RECORD_AUDIO` - For audio recording features
  - `INTERNET` - For network requests
  - `ACCESS_NETWORK_STATE` - For connectivity checks
- **Cleartext Traffic**: Enabled (for development)

### Build Profiles
- Development: For testing with dev client
- Preview: For internal testing
- Production: For Google Play Store submission

## Troubleshooting

### Issue: "Not logged in to EAS"
**Solution**: Run `eas login` and enter your Expo credentials

### Issue: "Build failed"
**Solution**: 
- Check build logs on Expo website
- Ensure all dependencies are properly installed
- Verify Android configuration in app.json

### Issue: "APK won't install"
**Solution**:
- Ensure your Android device is Android 7.0+ (API 24+)
- Enable installation from unknown sources
- Clear app cache if reinstalling

## Next Steps

1. **Install EAS CLI** (if not already installed):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Build the APK**:
   ```bash
   eas build --platform android --profile development
   ```

4. **Wait for build** to complete and download the APK

5. **Test on device**:
   - Transfer APK to Android device
   - Or use direct download link from build page
   - Install and test the app

## Production Deployment

For Google Play Store submission:
1. Use the `production` profile to generate AAB
2. Follow Google Play Console submission guidelines
3. Upload AAB to Google Play Store
4. Configure app listing and release notes

---

For more information, visit: https://docs.expo.dev/build/setup/
