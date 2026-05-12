# AI Content Generator
> Built with Next.js 14 + Groq API by Heena Kapoor

A full-stack AI app that generates LinkedIn posts, Twitter threads, blog intros, Instagram captions, and newsletter sections using Groq's blazing-fast Llama 3 model.

---

## Tech Stack
- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (App Router)
- **AI:** Groq API · `llama-3.3-70b-versatile` (free, no credit card needed)

---

## How the API Key Works

```
Browser (React UI)
      ↓  calls
/api/generate  ← Your Next.js backend (server-side)
      ↓  calls with API key
Groq API (Llama 3 model)
      ↓  returns content
/api/generate  → sends result back
      ↓
Browser shows the result
```

The API key ONLY lives on the server (in `.env.local`).
It is NEVER sent to the browser. This is the correct, secure pattern.

---

## Setup

### Step 1 — Clone & install
```bash
git clone https://github.com/YOUR_USERNAME/ai-content-generator
cd ai-content-generator
npm install
```

### Step 2 — Get your free Groq API key
1. Go to https://console.groq.com/keys
2. Sign up with Google (free, no credit card needed)
3. Click **Create API Key** → name it → copy it

### Step 3 — Add your API key
```bash
# Copy the example file
cp .env.local.example .env.local

# Open .env.local and paste your key
GROQ_API_KEY=gsk_xxxxxxxxxxxxxx
```

### Step 4 — Run locally
```bash
npm run dev
# Open http://localhost:3000
```

---

## Deploy to Vercel (free)

1. Push this project to GitHub
2. Go to https://vercel.com → Import your repo
3. In Vercel project settings → **Environment Variables**
4. Add: `GROQ_API_KEY` = your key
5. Click Deploy — done!

> Vercel injects the env variable securely on the server. Your key stays safe.

---

## Project Structure

```
ai-content-generator/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts         ← Backend: calls Groq API securely
│   ├── components/
│   │   └── ContentGenerator.tsx ← Frontend: the full UI
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── .env.local           ← Your secret API key (never commit this!)
├── .env.local.example   ← Safe template to share on GitHub
├── .gitignore           ← Ensures .env.local is never committed
└── README.md
```

---

## Features
- 5 platforms: LinkedIn, Twitter/X, Blog, Instagram, Newsletter
- 3 lengths: Short / Medium / Long
- 6 tones: Professional, Casual, Storytelling, Motivational, Educational, Witty
- One-click copy & regenerate
- Fully responsive UI

---

Made by Heena Kapoor · [LinkedIn](https://linkedin.com/in/heena-kap00r) · [GitHub](https://github.com/Heena-Kapoor)