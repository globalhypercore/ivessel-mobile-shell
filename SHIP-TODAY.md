# iVessel mobile — REMAINING ACTIONS ONLY
*(rewritten 2026-08-17 after verifying the actual state on disk — anything not listed here is done)*

**Verified done, no action:** icons + splash (in repo) · keystore + signed `app-release.aab` built (versionCode 2) · Play app record exists · store copy in `store-assets/STORE-LISTING.md`.

## Android — optional, only when you want the next build on Play
Play Console → existing iVessel app → Testing → Internal testing → Create new release → upload `android\app\release\app-release.aab`. Nothing else.

## iOS — the remaining track (in this order)

1. Push the shell to GitHub (`.gitignore` already protects keys):
```powershell
cd "$env:USERPROFILE\Claude\Projects\Ivessel\mobile-shell"
git init
git add .
git commit -m "iVessel shell"
```
Create a **private** repo at https://github.com/new named `ivessel-mobile-shell`, then:
```powershell
git remote add origin https://github.com/<your-username>/ivessel-mobile-shell.git
git branch -M main
git push -u origin main
```

2. https://appstoreconnect.apple.com → Apps: if iVessel is NOT already listed, + → New App — Name `iVessel`, Bundle ID `co.ivessel.app` (create the ID at https://developer.apple.com/account/resources/identifiers/list if missing), SKU `ivessel-001`. Then from App Information copy the 10-digit **Apple ID** number → **paste it to Claude** (codemagic.yaml needs it).

3. Same site → Users and Access → Integrations → App Store Connect API → + (role **App Manager**). Download the `.p8` ONCE, store it with your keystore backup, note **Key ID** + **Issuer ID**.

4. https://codemagic.io → sign up with GitHub → add the repo → Teams → Integrations → App Store Connect → add the key, named exactly `iVessel ASC Key` → Start new build on workflow **ios-testflight** → build lands in TestFlight (~25 min + up to 30 min "Processing").

Build fails → paste the failing log to Claude.
