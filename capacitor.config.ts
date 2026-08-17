import type { CapacitorConfig } from '@capacitor/cli';

/**
 * iVessel mobile shell configuration.
 *
 * PHASE 1 (current): the shell loads the live Lovable web app remotely via
 * `server.url`. This is the fastest path to a testable build. It requires
 * connectivity — no offline yet. That comes in Phase 2.
 *
 * PHASE 2 (offline): remove `server.url`, run a local build of the web app
 * into `webDir`, and add a service worker + local storage + sync engine so
 * the app works offline and pushes queued changes on reconnect.
 */
const config: CapacitorConfig = {
  appId: 'co.ivessel.app',
  appName: 'iVessel',
  // webDir is only used in Phase 2 (bundled offline build). Harmless now.
  webDir: 'www',
  server: {
    // Phase 1: point the shell at the live app on its custom domain.
    // (harbor-hatch.lovable.app serves the same build; app.ivessel.co is canonical.)
    url: 'https://app.ivessel.co',
    cleartext: false,
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    allowMixedContent: false,
    // Android 15 (SDK 35+) forces edge-to-edge; this re-adds system-bar margins
    // so content stops rendering under the status bar / gesture area.
    adjustMarginsForEdgeToEdge: 'force',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#0b1220',
      showSpinner: false,
    },
    Geolocation: {},
    Camera: {},
    // Assignment pings (FCM). iOS foreground presentation options; harmless on Android.
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
