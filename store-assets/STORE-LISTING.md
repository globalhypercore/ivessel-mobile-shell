# iVessel — Store Listing Pack (Play + App Store)

Prepared 2026-08-11. Internal testing / TestFlight don't need most of this — it gates the PUBLIC release. It's all here so store setup is copy-paste when you're ready.

Public contact email is `info@ivessel.co` (confirmed live by Max 2026-08-11) — Play shows this email publicly. Never use the private gmail on anything store-facing.

---

## 1. GOOGLE PLAY

**App name (30 chars max):**
```
iVessel — Boat Maintenance
```

**Short description (80 chars max):**
```
Engine hours, service logs, checklists & fleet management for boats and yachts.
```
(79 chars)

**Full description (4000 chars max):**
```
iVessel keeps every boat you run maintained, documented and ready to go — whether you look after one outboard or manage a whole fleet.

LOG IT IN SECONDS
• Engine hours in two taps with iVessel Lite — a simplified phone mode built for the dock, not the desk
• Service and maintenance records for inboards, outboards, generators and every other machinery item on board
• Pre-sail checklists so nothing gets skipped before you leave the berth

STAY AHEAD OF MAINTENANCE
• Service schedules tracked per machinery item, driven by real engine hours
• Overdue and upcoming work surfaced automatically on your dashboard
• Issues with photos — snap a problem, assign it, close it out

RUN THE WHOLE FLEET
• Fleet dashboard with exception views: see only the boats that need attention
• Per-boat dashboards for owners and crew
• My Work view for technicians: everything assigned to you, in one list
• Invite crew, owners, and technicians with role-based access

EVERYTHING ELSE ON BOARD
• Inventory with barcode scanning — scan a part, find it, restock it
• Manuals library shared across your boats
• Trip logging with GPS position capture
• Works on your phone, tablet, and desktop — same account, same data, everywhere

BUILT FOR REAL CREWS
iVessel was built by people who run boats, replacing spreadsheets and paper logs with something the whole crew will actually use. Two-factor authentication and role-based permissions keep your fleet's data locked down.

Get set up in minutes: add your boat, add its machinery, and start logging.
```

**Category:** Business. **Tags:** boat, maintenance, fleet.

**Contact details:** email `info@ivessel.co` · website `https://app.ivessel.co`

**Privacy policy URL (required):**
```
https://app.ivessel.co/privacy
```

**Graphics:**
- App icon 512×512 — auto-taken from the .aab / use `assets/icon.png` downscaled
- Feature graphic 1024×500 — ready: `store-assets/feature-graphic.png`
- Phone screenshots: min 2, ideally 4–8 (see shot list, §3)

### Play Data Safety form (answers)

*Does your app collect or share user data?* **Yes, collects. No sharing** (Supabase and Google Analytics act as processors, not data sharing under Play's definition).

| Data type | Collected? | Optional? | Purpose |
|---|---|---|---|
| Personal info → Email address | Yes | No (account) | Account management |
| Personal info → Name | Yes | No | Account management, app functionality |
| Photos | Yes | Optional | App functionality (issue/inventory photos) |
| Location → Precise location | Yes | Optional (only when using GPS/trip features) | App functionality |
| App activity → App interactions | Yes | Yes (consent banner) | Analytics |

- Data encrypted in transit: **Yes**
- Users can request deletion: **Yes** (per privacy policy / account settings)
- Account deletion URL (Play requires one since accounts exist): use `https://app.ivessel.co/privacy` unless a dedicated delete-account page exists — flag if you want a proper /delete-account page built.
- Independent security review: No
- Committed to Play Families policy: N/A (not a kids' app)

**Content rating questionnaire:** Utility/productivity app, no user-generated public content (photos are private to the fleet), no violence/gambling/etc. → will rate Everyone / PEGI 3.

**App access for review:** app requires login → provide a demo account (see §4).

---

## 2. APPLE APP STORE

**Name (30 chars):**
```
iVessel — Boat Maintenance
```

**Subtitle (30 chars):**
```
Engine hours, service & fleet
```
(29 chars)

**Keywords (100 chars, comma-separated, no spaces):**
```
boat,yacht,vessel,maintenance,engine,hours,fleet,marine,logbook,service,checklist,outboard,crew
```
(95 chars)

**Promotional text (170 chars, editable without review):**
```
New: iVessel Lite — log engine hours and pre-sail checks from the dock in seconds. Plus outboard service tracking, trip GPS logging, and barcode inventory scanning.
```

**Description:** reuse the Play full description above (drop the bullet symbols if you prefer Apple's plainer look — bullets are allowed).

**Category:** Primary **Business**, Secondary **Productivity**.

**Support URL:** `https://app.ivessel.co` · **Marketing URL:** `https://app.ivessel.co` · **Privacy Policy URL:** `https://app.ivessel.co/privacy`

**Age rating:** 4+ (questionnaire: all "No").

**Screenshots:** 6.9" iPhone set required (1320×2868 portrait). If the iPad target stays enabled in the Xcode project (Capacitor default = universal), a 13" iPad set (2064×2752) is also required — either take them in a browser at iPad size, or tell me and I'll walk you through making the app iPhone-only for v1.

### Apple Privacy "Nutrition Label" (answers)

Data types collected, all **linked to identity** (account-based app), **none used for tracking** (GA4 is first-party analytics, no cross-app ads):

- Contact Info: Email Address, Name — App Functionality
- User Content: Photos or Videos — App Functionality
- Location: Precise Location — App Functionality (only while using GPS features)
- Usage Data: Product Interaction — Analytics
- Identifiers: User ID — App Functionality

*Do you or your partners use data for tracking?* **No.**

### App Review notes (paste into "Notes" + demo account fields)

```
iVessel is a boat/fleet maintenance management app. An account is required
(fleet data is private). Demo credentials provided below.

- Camera is used to scan part barcodes (Inventory > scan icon) and attach
  photos to issues.
- Location is requested only when the user starts a trip log or captures a
  position on an issue/log entry.
- The app is fully functional after login; there are no purchases in-app.
  Subscriptions are handled on the web (business/fleet SaaS billing), and the
  app makes no reference to external purchasing (Guideline 3.1.1 / 3.1.3(b)
  reader-app style compliance is not needed — nothing is sold in the app).
```

Demo account: see §4 — a clean reviewer login must exist before public submission (TestFlight internal testing doesn't need it).

---

## 3. SCREENSHOT SHOT LIST (both stores, take on the A23 + iPhone via TestFlight)

Light mode (default), demo/PYM data, no real customer names visible:

1. Lite dashboard — the 12 tiles (the phone pitch: "log it from the dock")
2. Add engine hours (Lite) — mid-entry
3. Fleet dashboard with exception tabs (the manager pitch)
4. Machinery panel of a boat — service rows + status
5. Issue with photo attached
6. Barcode scanner open over a part (staged is fine)
7. Map tab with a trip/track visible
8. Pre-sail checklist mid-completion

Play accepts raw phone screenshots as-is. For the App Store, take the same shots on an iPhone once TestFlight is installed (Apple requires actual-ratio images; 6.9" frames).

---

## 4. BEFORE PUBLIC RELEASE (not needed for internal/TestFlight)

1. Reviewer demo account: create a dedicated `appstore.review@…` user on the demo boat (read/write, no billing admin, no real data) — do NOT reuse michael.stoten's demo login.
2. (done) Contact email confirmed live: info@ivessel.co.
3. Decide iPhone-only vs iPad-supported (affects screenshot burden).
4. Consider a `/delete-account` page (Play likes an explicit URL).
5. Lawyer pass on /privacy /terms (already queued in go-live checklist).
