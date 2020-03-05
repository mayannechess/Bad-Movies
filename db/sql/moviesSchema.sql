DROP DATABASE IF EXISTS badmovies;

CREATE DATABASE badmovies;

USE badmovies;

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
  id INTEGER,
  poster_path VARCHAR(255),
  original_title VARCHAR(60),
  release_date VARCHAR(60),
  vote_average DECIMAL(2,1)
);