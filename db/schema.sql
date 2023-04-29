DROP DATABASE IF EXISTS ethiopians_db;

CREATE DATABASE ethiopians_db;

USE ethiopians_db;

CREATE TABLE
    foods (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        food_name VARCHAR(25) NOT NULL
    );

CREATE TABLE
    reviews (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        review TEXT NOT NULL,
        
        food_id INT,
        FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
    );