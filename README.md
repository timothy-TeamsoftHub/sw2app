SW² Backend Skeleton (Express + Postgres)
========================================

What's included:
- Express server with routes for auth, users, lessons, quizzes.
- PostgreSQL DDL (sw2_schema.sql)
- Dockerfile + docker-compose for local development
- Basic JWT auth + password hashing (bcrypt)

Quickstart (local)
1. Copy .env.example -> .env and set DATABASE_URL and JWT_SECRET
2. Install dependencies:
   npm install
3. Create Postgres DB and run the SQL in sw2_schema.sql (psql -f sw2_schema.sql)
4. Start the server:
   npm run dev
5. API endpoints:
   POST /api/auth/register  {name,email,phone,password,role}
   POST /api/auth/login     {identifier, password}
   GET  /api/lessons        (list lessons)
   POST /api/lessons       (create lesson, teacher only - Authorization: Bearer <token>)
   GET  /api/quizzes/:id    (get quiz JSON)
   POST /api/quizzes/:id/attempt   (submit attempt, Authorization required)

Docker (recommended)
- Ensure Docker and docker-compose installed
- Run: docker-compose up --build
- This will bring up Postgres and the web service. Use psql to run sw2_schema.sql on the running Postgres to create tables.

Notes & Next Steps
- Implement more controllers: sponsorships, subscriptions query endpoints, reports
- Add migrations (node-pg-migrate or Knex)
- Swap simple SQL queries for a query builder / ORM if preferred (Knex/Objection or Sequelize)
- Add input validation, rate-limiting, structured logging, and tests for production readiness.