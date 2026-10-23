# MakoTrends

MakoTrends is a full-stack MVP for a gamified trend prediction market. Users create accounts, vote yes/no on future trends, earn points when predictions are resolved, and compete on a ranking board.

## Folder Structure

```text
makotrends/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      app.js
      server.js
    .env.example
    package.json
  frontend/
    src/
      api/
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

4. Update `backend/.env` with your MongoDB URI and JWT secret.
5. Create frontend environment file:

```bash
cp frontend/.env.example frontend/.env
```

6. Start both apps:

```bash
npm run dev
```

7. Open the frontend at `http://localhost:5173`.

The backend runs at `http://localhost:5000`.

## Admin Access

Sign up normally, then update that user's role in MongoDB:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

Admins can create, edit, delete, and resolve predictions from the admin dashboard.

## Weekly Market Cycle

MakoTrends uses a predictable short-term publishing rhythm:

- Sunday: publish 5 to 8 new markets.
- Friday at 18:00 UTC: voting closes automatically.
- Saturday: verify the listed sources and resolve each market.
- Weekend: publish results and prepare the next forecast.

The create-market form defaults to the next Friday deadline and Saturday
resolution window. Use the **Use weekly schedule** action to restore those dates
after editing them. Each question must still include an objective threshold, a
named resolution source, and criteria that can be verified after the deadline.

The reviewed weekly batch in `backend/src/data/weeklyPredictions.js` can be
created or updated without deleting votes or history:

```bash
npm run markets:weekly --prefix backend
```

Review titles, thresholds, sources, and dates before updating this file for the
next round. Running the command again updates matching unresolved markets and
does not create duplicates.

## Automated Market Maintenance

The hourly GitHub Actions workflow in `.github/workflows/market-maintenance.yml`
closes expired markets and resolves markets that have an approved automatic
provider. Add the production `MONGODB_URI` as a GitHub Actions repository secret
before enabling the workflow. It never needs the admin password.

Point awards are applied inside a MongoDB transaction. Repeated or concurrent
resolution attempts cannot award points twice. Markets without an approved,
machine-readable provider remain closed and are reported for editorial review.
The first supported provider is Coinbase one-minute candles; the weekly Bitcoin
market shows the required `automaticResolution` configuration.

Run the same maintenance safely on demand with:

```bash
npm run markets:maintain --prefix backend
```

MongoDB transactions require a replica set, which MongoDB Atlas provides.
