# FuteTrends

FuteTrends is a full-stack MVP for a points-based Brazilian football prediction game. Users create accounts, vote yes/no on Brasileirao 2026 and Libertadores signals, earn points when predictions are resolved, and compete on a ranking board.

This is not a betting app. There are no deposits, withdrawals, odds, payouts, or real-money wagers.

## Folder Structure

```text
futetrends/
  backend/
    src/
      config/
      controllers/
      data/
      middleware/
      models/
      routes/
      scripts/
      utils/
      app.js
      server.js
    .env.example
    package.json
  frontend/
    public/
    src/
      api/
      assets/
      components/
      context/
      pages/
      styles/
      App.jsx
      main.jsx
    .env.example
    index.html
    package.json
    vite.config.js
  package.json
```

## Run Locally

1. Install MongoDB locally or create a MongoDB Atlas database.
2. Install dependencies:

```bash
npm run install:all
```

3. Create backend environment file:

```bash
cp backend/.env.example backend/.env
```

4. Update `backend/.env` with your MongoDB URI, JWT secret, and admin seed credentials.
5. Create frontend environment file:

```bash
cp frontend/.env.example frontend/.env
```

6. For a new, empty database, seed the FuteTrends football markets:

```bash
npm run seed --prefix backend
```

7. Start both apps:

```bash
npm run dev
```

8. Open the frontend at `http://localhost:5173`.

The backend runs at `http://localhost:5000`.

## Market Data

For an existing database, use the non-destructive market upserts instead of `seed`. The `seed` command deletes votes and markets and resets user scores.

```bash
npm run markets:launch --prefix backend
npm run markets:news --prefix backend
```

The launch market pack includes objective markets for:

- Brasileirao 2026 title race
- Brasileirao relegation cutoff
- Rio and Sao Paulo table comparisons
- coaching changes
- transfer signals
- Libertadores finalists, champion, final format, and top scorer

The market upserts preserve existing votes, points, and prediction history.

## Admin Access

Set these values in `backend/.env` before running `npm run seed --prefix backend`:

```bash
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-password
```

Admins can create, edit, delete, and resolve predictions from the admin dashboard. Resolving a market distributes points to users with correct votes.

## Deployment Notes

- Frontend: deploy `frontend/` to Netlify.
- Backend: deploy `backend/` to Render.
- Database: use MongoDB Atlas and set `MONGODB_URI` in Render.
- Set `JWT_SECRET` only in the backend hosting environment.
- Set `VITE_API_URL` in Netlify to the Render backend URL.
- Optional analytics: set `VITE_GA_MEASUREMENT_ID`.
