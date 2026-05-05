# makotrends.com

makotrends.com is a full-stack MVP for a gamified trend prediction market. Users create accounts, vote yes/no on future trends, earn points when predictions are resolved, and compete on a ranking board.

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
