# CareRoam — Setup Guide

## Prerequisites
- Node.js 18+
- A [Firebase](https://console.firebase.google.com) account (free tier)
- A [Vercel](https://vercel.com) account (free tier) — optional, for deployment
- An [EmailJS](https://www.emailjs.com) account (free tier) — optional, for contact form

---

## 1. Firebase Setup

### Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Add project** → name it `care-roam` → disable Analytics → **Create project**
3. Click the **Web** icon (`</>`) to register a web app → name it `care-roam-web` → **Register app**
4. Copy the `firebaseConfig` values shown

### Configure `.env`
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in the Firebase values:
   ```
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=care-roam.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=care-roam
   VITE_FIREBASE_STORAGE_BUCKET=care-roam.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

### Enable Email/Password Authentication
1. In Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Go to **Users** tab → **Add user**
   - Email: `vdlkondayash1208@gmail.com`
   - Password: `@Yashwanth1208`
4. This user is now the **only admin** who can modify dashboard data

### Set Up Firestore Database
1. In Firebase Console → **Firestore Database** → **Create database**
2. Choose **Start in test mode** (you'll lock it down next)
3. Select a region (e.g., `asia-south1` for India)

### Deploy Firestore Security Rules
Go to **Firestore Database** → **Rules** and replace with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /metrics/interviews {
      allow read: if true;
      allow write: if request.auth != null 
        && request.auth.token.email == 'vdlkondayash1208@gmail.com';
    }
  }
}
```
This ensures **only your admin account** can write to the counter. All visitors can read.

---

## 2. EmailJS Setup (Contact Form)

1. Sign up at [EmailJS](https://www.emailjs.com) (free: 200 emails/month)
2. Go to **Email Services** → **Add New Service** → connect your Gmail/Outlook
3. Go to **Email Templates** → **Create New Template**:
   - Template Name: `CareRoam Contact`
   - Subject: `{{subject}}`
   - Content (HTML):
     ```html
     <h3>New Contact Message</h3>
     <p><strong>From:</strong> {{name}} ({{email}})</p>
     <p><strong>Phone:</strong> {{phone}}</p>
     <p><strong>Subject:</strong> {{subject}}</p>
     <p><strong>Message:</strong></p>
     <p>{{message}}</p>
     ```
   - Click **Save**
4. Go to **Account** → **API Keys** → copy your **Public Key**
5. Add to `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

The contact form will automatically send emails to `vdlkondayash1208@gmail.com`.

---

## 3. Deploy to Vercel

### Option A: Vercel CLI
```bash
npm i -g vercel
cd care-roam
vercel --prod
```
Add the 6 Firebase env vars + 3 EmailJS env vars when prompted.

### Option B: GitHub + Vercel (recommended)
1. Push to GitHub:
   ```bash
   cd care-roam
   git add .
   git commit -m "Ready for deployment"
   git push
   ```
2. Go to [Vercel](https://vercel.com) → **Add New Project**
3. Import your `care-roam` GitHub repo
4. Framework preset: **Vite**
5. Add all environment variables from `.env`
6. Deploy

---

## 4. Verify Everything Works

| Feature | How to Test |
|---------|-------------|
| Admin Login | Go to `/founder` → Login with your credentials → +/- buttons appear |
| Interview Counter | Click + → counter increases → refresh page → value persists |
| Contact Form | Go to `/contact` → Fill form → Submit → "Message Sent!" |
| Market Values | Go to `/investor` → Verify ₹ values displayed |
| Transparency | Go to Homepage → "Commitment to Transparency" section visible |
