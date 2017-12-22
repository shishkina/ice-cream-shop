\c icecream_dev

CREATE TABLE IF not exists icecream (
  id SERIAL PRIMARY KEY,
  flavor VARCHAR(255),
  description VARCHAR(255),
  rating VARCHAR(6),
  url VARCHAR(255),
  brand VARCHAR(255)
);

CREATE TABLE IF not exists users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password_digest VARCHAR(255)
);
