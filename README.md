<div align="center">

# Qodum Mobile

**The companion app to Qodum ERP — built for teachers, students, and staff.**

Where the [web platform](https://github.com/jonathanadel-dev/qodum-web) handles school operations from an admin/staff view, Qodum Mobile gives teachers and students their own dedicated way to interact with the system day-to-day, from wherever they are.

![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Messaging-FFCA28?logo=firebase)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)

<img src="https://res.cloudinary.com/jobook/image/upload/v1785648059/1_ecoihe.png" alt="Student Dashboard" width="300"/>
<img src="https://res.cloudinary.com/jobook/image/upload/v1785648071/2_bw8m0y.png" alt="Payment Page" width="300"/>
<img src="https://res.cloudinary.com/jobook/image/upload/v1785648080/3_ny3u6r.png" alt="Push Notifications" width="300"/>
<img src="https://res.cloudinary.com/jobook/image/upload/v1785648092/4_yoqltq.png" alt="Teachers Assignments" width="300"/>
<img src="https://res.cloudinary.com/jobook/image/upload/v1785648102/6_remha3.jpg" alt="Students Assignments" width="300"/>

</div>

---

## 📖 Overview

Qodum Mobile is a single-codebase React Native app supporting **two distinct user roles** — Teachers and Students — each with their own tailored navigation, screens, and permissions.

Multi-tenancy is built in from the ground up: users log in with a **school code** first, so the same app instance can serve different schools, each seeing only their own data.

---

## ✨ Features

### 👨‍🏫 Teacher
- 🏠 Home dashboard
- 📝 Assignments — create, review, and give feedback on student submissions
- 📓 E-diaries
- 📣 Class notices
- 🔔 General notices
- 💬 Messages
- 📊 Activity log
- 👤 Profile & settings

### 🎓 Student
- 🏠 Home dashboard
- 📝 Assignments — view and submit answers, receive teacher feedback
- 💳 Fee payment — pay school fees directly from the app
- 📓 E-diaries
- 📣 Class notices
- 🔔 General notices
- 💬 Messages
- 📊 Activity log
- 👤 Profile & settings

### 🔐 Authentication
- School-code based login (multi-school / multi-tenant support)
- OTP verification flow (send OTP → verify OTP)
- Registration flow for new users
- Session persisted locally via `AsyncStorage`, with JWT decoded client-side to check expiry on load

### 🔔 Push Notifications
- Real-time push notifications via **Firebase Cloud Messaging**
- Dedicated `NotificationProvider` context to manage notification state app-wide

### 💳 Payments
- Integrated fee payment gateway using **Easebuzz** (`react-native-easebuzz-kit`)

---

## 🏗️ Architecture

- **Framework:** React Native 0.74, using the **React Native CLI (bare workflow)** — native `android/` and `ios/` folders are present and versioned — run via `react-native run-android` / `react-native run-ios`
- **Navigation:** React Navigation — native stack + bottom tabs, with separate navigators per role (teacher vs. student)
- **State & Session:** Two dedicated context providers:
  - `Auth` context — handles user/session/school state, backed by `AsyncStorage`
  - `NotificationProvider` — manages Firebase push notification state
- **Forms:** `react-hook-form` for input handling across auth and in-app forms
- **UI:** `react-native-paper` components, `react-native-vector-icons`, `react-native-linear-gradient` for themed gradients
- **File handling:** `react-native-document-picker`, `react-native-fs`, `@react-native-camera-roll/camera-roll` for uploads/downloads (e.g. assignment submissions), backed by AWS S3
- **In-app web content:** `react-native-webview` (used for the Easebuzz payment checkout flow)

### Folder structure

```
qodum-app/
├─ App.js                  → Root navigation & providers
├─ context/
│  ├─ Auth.js               → Session, token, and school-code state
│  └─ NotificationProvider.js → Firebase push notification handling
├─ pages/
│  ├─ auth/                  → welcome, login, register, send-otp, check-otp, school-code
│  └─ app/
│     ├─ teacher/             → home, assignments, e-diaries, class-notice, notice, messages, activity, profile, settings
│     └─ student/             → home, assignments, fee, e-diaries, class-notices, notice, messages, activity, profile, settings
├─ utils/
│  ├─ teacher/                → Teacher-specific helpers
│  └─ student/                → Student-specific helpers
├─ theme/                     → App-wide theming
├─ android/ & ios/             → Native project files
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Watchman (recommended for macOS/Linux)
- A Firebase project with `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
- Xcode (for iOS) and/or Android Studio (for Android)

### Installation

```bash
git clone https://github.com/jonathanadel-dev/qodum-app.git
cd qodum-app
npm install

# iOS only
bundle install
bundle exec pod install
```

### Firebase setup

Place your Firebase config files in the project root:
- `google-services.json` (Android)
- `GoogleService-Info.plist` (iOS)

These are referenced directly in the native Android/iOS projects and are required for push notifications to work.

### Run locally

```bash
# Start Metro
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

> This project uses the React Native CLI (bare workflow) — native modules (Firebase, Easebuzz) require a native rebuild, not just a JS reload.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.74 (React Native CLI, bare workflow) |
| Navigation | React Navigation (native stack + bottom tabs) |
| Auth | School-code + OTP login, JWT session (AsyncStorage) |
| Push Notifications | Firebase Cloud Messaging |
| Forms | React Hook Form |
| UI | React Native Paper, Vector Icons, Linear Gradient |
| File Storage | AWS S3 SDK, React Native Document Picker / FS / Camera Roll |
| Payments | Easebuzz (`react-native-easebuzz-kit`) |
| Build & Deploy | Native Gradle (Android) & Xcode (iOS) build pipelines |

---

## 📌 Project Status

Actively developed as the mobile counterpart to the live Qodum ERP platform, sharing the same school-management domain (assignments, notices, fees) but scoped specifically to the day-to-day teacher and student experience.

---

<div align="center">

Built and maintained by **Jonathan Adel**

</div>
