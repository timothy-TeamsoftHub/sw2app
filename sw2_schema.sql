-- SW2 Backend DDL (Postgres)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200) UNIQUE,
  phone VARCHAR(30) UNIQUE,
  password_hash VARCHAR(255),
  role VARCHAR(30) DEFAULT 'student',
  wallet BIGINT DEFAULT 0,
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  subject VARCHAR(100),
  grade_level VARCHAR(50),
  duration_seconds INT,
  media_url TEXT,
  content TEXT,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  lesson_id INT REFERENCES lessons(id),
  title VARCHAR(255),
  passing INT DEFAULT 50,
  time_limit_seconds INT DEFAULT 600,
  questions JSONB, -- array of question objects
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE attempts (
  id SERIAL PRIMARY KEY,
  quiz_id INT REFERENCES quizzes(id),
  student_id INT REFERENCES users(id),
  score INT,
  answers JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price INT,
  interval VARCHAR(30),
  duration_days INT
);

CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  plan_id INT REFERENCES plans(id),
  started_at TIMESTAMP,
  expires_at TIMESTAMP
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount INT,
  kind VARCHAR(50),
  created_at TIMESTAMP DEFAULT now()
);