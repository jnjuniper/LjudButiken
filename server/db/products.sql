-- database: db.db
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    productName TEXT NOT NULL,
    productDescription TEXT,
    brand TEXT,
    sku TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    slug TEXT
);

DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    productName TEXT NOT NULL,
    productDescription TEXT,
    brand TEXT,
    sku TEXT NOT NULL,
    price REAL NOT NULL,
    categoryId INTEGER NOT NULL,
    slug TEXT,
    FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
);