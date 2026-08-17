# iVessel Mobile — Build & Submit Guide (Windows PC, Phase 1: shell)

Gets iVessel onto **Play internal testing (Android — built locally on Windows)** and
**TestFlight (iOS — built in the cloud via Codemagic, no Mac needed)**. The shell wraps
your live Lovable app (`harbor-hatch.lovable.app`).

- **Files I generated:** `package.json`, `capacitor.config.ts`, `www/index.html`,
  `ivessel-native-bridge.ts` (GPS+camera for the Lovable app), `codemagic.yaml` (iOS CI).
- **App ID / bundle:** `co.ivessel.app` — change in `capacitor.config.ts` before step 2 if
  desired. It must match what you register in both stores.

> **The Mac problem, solved:** Apple only compiles iOS apps on macOS. You don't own a Mac,
> so we build iOS in the cloud with **Codemagic** (free tier, builds from your GitHub repo,
> uploads straight to TestFlight). Android builds fine on Windows locally.

---

## 0. One-time prerequisites (Windows)

- **Node 18+** — https://nodejs.org (check: `node -v`)
- **Android Studio** — https://developer.android.com/studio (open once, install SDK + an emulator)
- **Git** — https://git-scm.com/download/win
- A **GitHub account** — https://github.com (free)
- Your **Apple Developer** ($99/yr) and **Google Play** ($25) accounts — you have both.

---

## 1. Install the shell

Open **PowerShell** in the project folder:

```powershell
cd "$env:USERPROFILE\Claude\Projects\Ivessel\mobile-shell"
npm install
```

## 2. Add native platforms

```powershell
npx cap add android
npx cap add ios        # generates the ios/ folder; it BUILDS in the cloud, not here
npx cap sync
```

---

## 3. ANDROID — build locally on Windows → Play internal testing

1. `npx cap run android` — pick your emulator; confirm the iVessel app loads. (Sanity check.)
2. `npx cap open android` — opens Android Studio.
3. In `android/app/build.gradle` set `versionCode 1` and `versionName "0.1.0"`.
4. **Build → Generate Signed App Bundle / APK → Android App Bundle**.
   - Create a new **keystore**. **Back it up + save the passwords in your password manager** —
     every future update MUST use this same key. Losing it means you can't update the app.
5. You get `app-release.aab`.
6. **Play Console** (play.google.com/console) → **Create app** → name "iVessel", type App.
7. **Testing → Internal testing → Create new release** → upload the `.aab`.
8. Add your tester emails → **Review release → Start rollout to Internal testing**.
9. Open the opt-in link on your Android phone → install.

> Permissions: after `cap sync`, check `android/app/src/main/AndroidManifest.xml` has
> `ACCESS_FINE_LOCATION` and `CAMERA`.

---

## 4. iOS — build in the cloud with Codemagic → TestFlight (no Mac)

### 4a. Put the project on GitHub
```powershell
cd "$env:USERPROFILE\Claude\Projects\Ivessel\mobile-shell"
git init
git add .
git commit -m "iVessel Capacitor shell"
```
Then on github.com → **New repository** → name it `ivessel-mobile-shell`, Private → **Create**.
GitHub shows two "push an existing repository" lines; run them, e.g.:
```powershell
git remote add origin https://github.com/<you>/ivessel-mobile-shell.git
git branch -M main
git push -u origin main
```

### 4b. Register the app in App Store Connect
1. **appstoreconnect.apple.com** → **Apps → +** → New App.
2. Platform iOS, name "iVessel", bundle ID `co.ivessel.app` (create it if prompted), your SKU.
3. Note the app's **Apple ID** number (shown on the app's App Information page) — put it in
   `codemagic.yaml` under `APP_STORE_APPLE_ID`.

### 4c. Create an App Store Connect API key (lets Codemagic sign + upload)
1. App Store Connect → **Users and Access → Integrations → App Store Connect API** →
   generate a key with **App Manager** role.
2. Download the `.p8` file and note the **Key ID** and **Issuer ID**.

### 4d. Set up Codemagic
1. **codemagic.io** → sign up with GitHub → authorize → select your `ivessel-mobile-shell` repo.
2. **Teams → Integrations → App Store Connect** → add the API key from 4c. Name it exactly
   **`iVessel ASC Key`** (matches `codemagic.yaml`).
3. Codemagic detects `codemagic.yaml`. Open the app → pick the **ios-testflight** workflow →
   **Start new build**.
4. It builds on their Mac, signs with your API key, and uploads to TestFlight automatically.
5. After ~15–30 min, open **TestFlight** on your iPhone and install.

> `codemagic.yaml` is already in this folder. Before the first run, edit one line:
> replace `APP_STORE_APPLE_ID: 0000000000` with your real Apple ID number from step 4b.

> iOS permission strings: add to `ios/App/App/Info.plist` (commit the change):
> - `NSLocationWhenInUseUsageDescription` = "iVessel records the vessel's position for issues and logs."
> - `NSCameraUsageDescription` = "iVessel attaches photos to issues and inventory."
> - `NSPhotoLibraryUsageDescription` = "iVessel attaches photos from your library."

---

## 5. App icon & splash (before final submission)

The `assets/` folder already contains generated files from the iVessel logo: `icon.png`
(1024, white background), `splash.png` (2732, light background to match the app's light
default) and `splash-dark.png` (dark variant). Then:

```powershell
npm i -D @capacitor/assets
npx capacitor-assets generate --iconBackgroundColor "#ffffff" --splashBackgroundColor "#f8fafc" --splashBackgroundColorDark "#0b1220"
npx cap sync
git add . ; git commit -m "icons" ; git push
```

---

## 6. Wiring GPS + camera (code goes in the LOVABLE app)

1. In Lovable, install `@capacitor/core @capacitor/geolocation @capacitor/camera`.
2. Add `ivessel-native-bridge.ts` as `src/lib/native.ts`.
3. Call `captureLocation()` / `capturePhoto()` from your issue / inventory forms.
4. Publish in Lovable. The shell loads the live URL, so **web changes appear instantly** with
   no new store build. Only native changes (plugins, icons, permissions) need a rebuild.

---

## 7. Updating later
- **Web/feature change:** publish in Lovable → live immediately.
- **Android native change:** re-bundle in Android Studio → re-upload to Play (~20 min).
- **iOS native change:** `git push` → Codemagic rebuilds → new TestFlight build.

---

## Phase 2 preview (offline) — later
Remove `server.url`, bundle a real web build into `www/`, add a service worker + local
SQLite/IndexedDB + a sync engine (queue offline writes, push to Supabase on reconnect,
last-write-wins). Everything above stays valid; Phase 2 is additive.
