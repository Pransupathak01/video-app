# VideoApp

A React Native + Expo project demonstrating video playback, WebView integration, and local notifications with a clean, reusable architecture.

## Overview

This app includes:

1. **Video Player**
   - Uses `expo-av` and `expo-video-player` for HLS video playback.
   - Custom controls (skip, mute) with icons.

2. **WebView Integration**
   - Displays external content using `react-native-webview`.
   - Triggers local notifications **only after the WebView finishes loading**.
   - Uses `onLoadEnd` with a `useRef` flag to prevent multiple triggers.

3. **Notifications**
   - Implemented using `expo-notifications`.
   - Supports **Android and iOS** with proper permission handling and notification channels.
   - Notifications are scheduled with delays (2s and 5s) after WebView load.
   - Reusable `NotificationItem` component for displaying notifications in a list.
   - Context API (`NotificationContext`) used for global notification handling.

## Implementation Choices

- **Context API for notifications:** Makes triggering and storing notifications globally easy and keeps components decoupled.
- **useRef for one-time triggers:** Prevents multiple notification triggers from repeated WebView events.
- **Expo Router & EAS Build:** Simplifies navigation and cross-platform build processes.
- **Reusable components (NotificationItem):** Clean UI with borderRadius and elevation for consistent 

## How to Run
```bash
npm install
npx expo start
