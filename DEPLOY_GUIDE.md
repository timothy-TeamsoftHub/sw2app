Deployment & Migration Guide
----------------------------

1. Install dependencies:
   npm install

2. Configure environment (.env):
   DATABASE_URL=postgres://user:pass@host:5432/dbname
   JWT_SECRET=your_jwt_secret
   SMTP_HOST=...
   SMTP_USER=...
   SMTP_PASS=...

3. Run migrations (using psql):
   psql $DATABASE_URL -f migrations/001_create_tables.sql

4. Seed initial data:
   psql $DATABASE_URL -f seeders/seed_initial_data.sql
   (Replace bcrypt password placeholders manually or use a small node script to hash and insert)

5. Start server:
   npm run dev

Docker (local)
- docker-compose up --build
- After DB is ready, run psql inside the db container and apply migrations/seeders.

Render Deployment (example)
- Create new Web Service on Render, connect your GitHub repo.
- Set environment variables on Render (DATABASE_URL, JWT_SECRET, SMTP_*).
- Add a health check path: /api/
- Configure auto-deploy on main branch.

Security notes
- Use strong JWT secret, enforce HTTPS (TLS) in production.
- Use proper SMTP credentials and consider transactional mail services.
- Add CORS restrictions to allowed frontend origin(s).