# FitLedger Deployment

## Recommended Free Setup

Use GitHub Pages for the frontend and Google Sheets plus Apps Script for the backend.

This keeps monthly cost at zero. The only costs come later if you publish native apps:

- Apple Developer Program: required for TestFlight/App Store
- Google Play Developer account: required for Play Store

## Frontend Hosting: GitHub Pages

1. Create a GitHub repository.
2. Push this project to the repository.
3. In GitHub, open Settings > Pages.
4. Under Build and deployment, choose:
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/root`
5. Save.
6. GitHub will give you a URL like:

```text
https://your-username.github.io/your-repo-name/
```

7. Open that URL.
8. Tap the `Local only` pill in the app.
9. Paste your Apps Script Web App URL ending in `/exec`.

## Backend: Google Sheets and Apps Script

Deploy Apps Script as a Web App with:

- Execute as: `Me`
- Who has access: `Anyone`

The Google Sheet itself does not need to be public.

## iPhone Before TestFlight

Once hosted on GitHub Pages, open the app in Safari on iPhone:

1. Tap Share.
2. Tap Add to Home Screen.
3. Launch FitLedger from the home screen.

This gives a near-app experience before doing native store work.

## TestFlight and App Stores

For TestFlight and Google Play, use Capacitor to wrap this web app.

High-level steps:

1. Install Node.js and npm.
2. Install Capacitor packages.
3. Add iOS and Android native projects.
4. Build the web assets.
5. Open iOS in Xcode for TestFlight.
6. Open Android in Android Studio for Play Store.

Typical commands:

```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init FitLedger com.fitledger.trainer --web-dir .
npx cap add ios
npx cap add android
npx cap sync
npx cap open ios
npx cap open android
```

Use bundle IDs you own, for example:

```text
com.yourname.fitledger
```

## Store Account Requirements

TestFlight requires:

- Apple Developer Program membership
- macOS with Xcode
- App signing certificates managed by Xcode

Google Play requires:

- Google Play Console developer account
- Android Studio
- Signed Android App Bundle (`.aab`)

## Practical Recommendation

First launch the hosted PWA with GitHub Pages. Let the trainer use it for real clients. Once the workflow feels right, wrap the same frontend with Capacitor for TestFlight and Play Store.
