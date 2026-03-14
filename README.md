# AI Study Topic Explainer

A Next.js web application that uses Google's Gemini AI to generate simple, student-friendly explanations for any study topic.

## Live Demo

> Add your Vercel deployment link here after deploying.

---

## Project Description

Students often struggle when they encounter an unfamiliar topic. Instead of searching across multiple websites, this tool lets a student type in any topic and instantly receive a clear, easy-to-understand explanation — powered by AI.

The app uses a clean editorial UI with a warm paper aesthetic, making studying feel less intimidating.

---

## How the AI API Was Used

This project uses the **Google Gemini API** (free tier) via the `@google/generative-ai` SDK.

- **Model:** `gemini-1.5-flash` (fast, free tier available)
- **Integration point:** `lib/aiClient.ts` — a wrapper that builds a student-friendly prompt and calls the Gemini API
- **API route:** `POST /api/explain` — a Next.js App Router route that receives the topic from the frontend, calls `explainTopic()`, and returns the explanation as JSON
- **Prompt design:** The prompt instructs Gemini to act as a teacher for 12–16 year olds, write in flowing paragraphs (no markdown), and include a real-world analogy and a fun fact

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | Next.js 15 (App Router)           |
| Language   | TypeScript                        |
| Styling    | Tailwind CSS                      |
| AI         | Google Gemini API (free tier)     |
| Deployment | Vercel                            |

---

## Project Structure

```
ai-study-explainer/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Main page (client component)
│   ├── globals.css         # Global styles + animations
│   └── api/
│       └── explain/
│           └── route.ts    # POST /api/explain endpoint
├── components/
│   ├── TopicInput.tsx      # Input field + example chips
│   ├── ExplanationCard.tsx # Renders the AI explanation
│   └── LoadingState.tsx    # Skeleton loading UI
├── lib/
│   └── aiClient.ts         # Gemini API wrapper
├── .env.local      # Environment variable template
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-study-explainer.git
cd ai-study-explainer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a Gemini API key (free)

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the key

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and replace the placeholder:

```
GEMINI_API_KEY=your_actual_key_here
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment on Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-study-explainer.git
git push -u origin main
```

### Step 2 — Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import your GitHub repository
4. Under **Environment Variables**, add:
   - Key: `GEMINI_API_KEY`
   - Value: your Gemini API key
5. Click **Deploy**

### Step 3 — Submit

Once deployed, your live URL will look like:

```
https://ai-study-explainer.vercel.app
```

Submit this URL along with the GitHub repository link.

---

## Features

- **Topic input** with example chips for quick testing
- **AI-powered explanation** via Gemini 1.5 Flash
- **Skeleton loading state** while the AI thinks
- **Error handling** for empty input, API failures, and network errors
- **Clean, responsive UI** built with Tailwind CSS
- **Enter key support** for quick submission
