# Firebase Deployment Troubleshooting Guide

## Common Issues After Deployment

### 1. Script Loading Issues
- **Problem**: Scripts not loading due to incorrect paths
- **Solution**: Ensure all script paths are correct and relative to the deployed location
- **Check**: Verify `js/register.js` and `js/firebase-debug.js` are accessible

### 2. Firebase Configuration Issues
- **Problem**: Firebase config not working in production
- **Solution**: Verify Firebase project settings and domain whitelisting
- **Check**: 
  - Go to Firebase Console → Project Settings → General
  - Ensure your deployed domain is in the "Authorized domains" list
  - Check if you need to add your deployment URL to authorized domains

### 3. CORS Issues
- **Problem**: Cross-origin requests blocked
- **Solution**: Configure Firebase security rules properly
- **Check**: 
  - Go to Firebase Console → Firestore Database → Rules
  - Ensure rules allow read/write operations

### 4. Security Rules Issues
- **Problem**: Firestore operations blocked by security rules
- **Solution**: Update Firestore security rules
- **Check**: Current rules should allow authenticated users to read/write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /test/{document} {
      allow read, write: if true; // For testing only
    }
  }
}
```

### 5. Network/HTTPS Issues
- **Problem**: Mixed content or HTTPS requirements
- **Solution**: Ensure all resources are loaded over HTTPS
- **Check**: 
  - Verify your deployment uses HTTPS
  - Check browser console for mixed content warnings

## Debugging Steps

### Step 1: Check Browser Console
1. Open your deployed site
2. Open Developer Tools (F12)
3. Check Console tab for errors
4. Look for Firebase-related error messages

### Step 2: Test Firebase Connectivity
1. The debug script will automatically run
2. Check console for test results
3. Look for ✅ or ❌ indicators

### Step 3: Verify Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (redhope-2)
3. Check Project Settings → General
4. Verify API key and configuration

### Step 4: Check Domain Authorization
1. In Firebase Console → Project Settings → General
2. Scroll to "Authorized domains"
3. Add your deployment domain if not present
4. Common domains to add:
   - `your-app.netlify.app`
   - `your-app.vercel.app`
   - `your-custom-domain.com`

## Testing Firebase Functions

### Manual Testing
```javascript
// In browser console, test Firebase manually:
firebaseDebug.runAllTests()
```

### Expected Output
```
🚀 Starting Firebase connectivity tests...
✅ Firebase app initialized successfully
✅ Firebase Auth initialized successfully
✅ Firestore initialized successfully
✅ All Firebase services are accessible
✅ Firebase Auth test successful, current user: null
✅ Firestore write test successful
✅ Firestore read test successful, {timestamp: "...", message: "...", status: "success"}

📊 Test Results Summary:
Firebase Auth: ✅ PASS
Firestore Write: ✅ PASS
Firestore Read: ✅ PASS
🎉 All tests passed! Firebase is working correctly.
```

## Common Error Messages and Solutions

### "Firebase: Error (auth/unauthorized-domain)"
- **Cause**: Domain not authorized in Firebase
- **Solution**: Add domain to Firebase authorized domains

### "Firebase: Error (auth/network-request-failed)"
- **Cause**: Network connectivity issues
- **Solution**: Check internet connection and firewall settings

### "Firebase: Error (permission-denied)"
- **Cause**: Firestore security rules blocking operation
- **Solution**: Update Firestore security rules

### "Firebase: Error (app/no-app)"
- **Cause**: Firebase not properly initialized
- **Solution**: Check script loading order and Firebase config

## Deployment Checklist

- [ ] All script paths are correct
- [ ] Firebase configuration is valid
- [ ] Domain is authorized in Firebase
- [ ] Firestore security rules are configured
- [ ] HTTPS is enabled (if required)
- [ ] No mixed content warnings
- [ ] Browser console shows no errors
- [ ] Firebase debug tests pass

## Getting Help

If issues persist:
1. Check browser console for specific error messages
2. Verify Firebase project configuration
3. Test with Firebase debug script
4. Check Firebase status page for service issues
5. Review Firebase documentation for your specific error

## Useful Links
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Status Page](https://status.firebase.google.com/)
- [Firebase Community](https://firebase.google.com/community) 