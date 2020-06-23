DROP DATABASE IF EXISTS airbrbExp;

CREATE DATABASE airbrbExp;

USE airbrbExp;

CREATE TABLE explore (
  id int NOT NULL AUTO_INCREMENT,
  place varchar(30) NOT NULL,
  longitude varchar(30) NOT NULL,
  latitude varchar(30) NOT NULL,
  listingId int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE options (
  id int NOT NULL AUTO_INCREMENT,
  opt varchar(30) NOT NULL,
  explore_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (explore_id)
      REFERENCES explore (id)
      ON DELETE CASCADE
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/