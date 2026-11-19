# DSpace Jubilee International Conference Website

Official academic conference website and poster submission portal for the **Jubilee Celebration of DSpace (2002-2026)**, commemorating more than two decades of open-source repository innovation under the stewardship of **Lyrasis**.

---

## Overview

- **Aesthetic**: Authentic academic design featuring a deep pine slate (`#12201D`), warm cream/linen background (`#F7F5F0`), deep terracotta accent (`#A24B27`), and emerald green (`#125740`) highlights. Free of purple gradients, pill buttons, fake counters, and em dashes.
- **Home Page Sections**:
  1. **About DSpace, How It Works & Lyrasis**: Origins at MIT Libraries and HP Labs (2002), 3-step workflow (Ingest & Dublin Core metadata, bitstream preservation, OAI-PMH open access discovery), and non-profit community governance under Lyrasis.
  2. **National Repositories (India)**: Highlights India's two largest national repositories built on DSpace:
     - **Shodhganga (INFLIBNET Centre, UGC)**: The national digital reservoir of Indian electronic theses and dissertations. [Visit Shodhganga](https://shodhganga.inflibnet.ac.in/)
     - **eGyanKosh (IGNOU)**: National Digital Repository for Open and Distance Learning educational resources. [Visit eGyanKosh](https://egyankosh.ac.in/)
  3. **The Conference, Occasion & Organizers**: Significance of the Jubilee, conference schedule (November 18-20, 2026 in hybrid format), and steering committee members.
  4. **Poster Guidelines & Structure**: ISO A0 portrait specifications (841 x 1189 mm), required structural sections (Header, Institutional Context, DSpace Implementation, Outcomes, Key Takeaways), and direct link to submit.
- **Poster Submission Page (`/submit`)**:
  - Compact, low-scroll submission form.
  - Required fields: Author Full Name, Academic Email, Institution, Poster Title, Brief Abstract, and Google Drive Share Link.
  - Automated dual-email pipeline via Google Gmail SMTP (acknowledgment to submitter with Reference ID, alert with full dossier to admin).
  - Credentials remain strictly server-side in environment variables and are never leaked to client browsers.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email Pipeline**: Nodemailer (Google Gmail SMTP with 16-character App Password)
- **Hosting**: Vercel (100% Free Hobby Tier Compatible)

---

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Set your Google Gmail credentials in `.env.local`:
```env
GMAIL_USER=your-conference-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=admin-conference@your-institution.edu
CONFERENCE_NAME="DSpace Jubilee Conference"
```

> If `GMAIL_USER` and `GMAIL_APP_PASSWORD` are left blank, the portal safely runs in local preview simulation mode.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Google Gmail App Password Setup

1. Go to your Google Account Security page: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Ensure **2-Step Verification** is turned ON.
3. In the search bar at the top, search for **App passwords**.
4. Create an App password named `DSpace Conference Portal`.
5. Copy the generated 16-letter passcode into `GMAIL_APP_PASSWORD` in your `.env.local` or Vercel Environment Variables.

---

## Deploy to Vercel (Free Tier)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: DSpace Jubilee Conference Website"
   git branch -M main
   git remote add origin https://github.com/sudhanshu2025sharma-max/dspace.git
   git push -u origin main
   ```
2. Log in to [https://vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository `sudhanshu2025sharma-max/dspace`.
4. Under **Environment Variables**, configure:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `ADMIN_EMAIL`
   - `CONFERENCE_NAME`
5. Click **Deploy**. Vercel will build and deploy the application with free SSL.
