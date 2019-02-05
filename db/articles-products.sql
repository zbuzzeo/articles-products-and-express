DROP DATABASE IF EXISTS articles_products;
DROP TABLE IF EXISTS articles;

CREATE DATABASE articles_products;

\connect articles_products;

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE,
  price VARCHAR(12) NOT NULL default 0,
  inventory VARCHAR(12) NOT NULL default 0,
  created_at TIMESTAMP WITH TIME ZONE default NOW(),
  updated_at TIMESTAMP WITH TIME ZONE default NOW()
);

CREATE TABLE articles(
  id SERIAL PRIMARY KEY,
  url_title VARCHAR(255) UNIQUE,
  title VARCHAR(255) NOT NULL UNIQUE,
  author VARCHAR(50) default NULL,
  body text NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE default NOW(),
  updated_at TIMESTAMP WITH TIME ZONE default NOW()
);
