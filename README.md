# Deepa Priya — Portfolio

## Folder Structure
```
portfolio/
├── public/
│   ├── index.html          ← frontend
│   └── DeepaPriya_Resume.pdf
├── server.js               ← backend (Node.js + Express)
├── package.json
├── .env.example            ← copy to .env and fill in
└── README.md
```

## Setup & Run Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Configure email
```bash
cp .env.example .env
```
Then edit `.env`:
- `EMAIL_USER` = your Gmail address
- `EMAIL_PASS` = Gmail App Password
  - Go to: Google Account → Security → 2-Step Verification → App Passwords
  - Create one for "Mail" → copy the 16-character password

### 3. Run locally
```bash
npm start
# or for auto-reload during development:
npm run dev
```

Open → http://localhost:3000

---

## Deploy to Render (free)

1. Push your code to a GitHub repo
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables in Render dashboard:
   - `EMAIL_USER` = your Gmail
   - `EMAIL_PASS` = your app password
6. Deploy ✦

---

## Deploy to Vercel (alternative)

1. Install Vercel CLI: `npm i -g vercel`
2. Add `vercel.json`:
```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```
3. Run: `vercel --prod`
