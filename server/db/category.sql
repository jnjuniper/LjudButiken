-- database: db.db
CREATE TABLE Category (
    categoryId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    categoryDescription TEXT,
    image TEXT
);

DROP TABLE IF EXISTS Category;