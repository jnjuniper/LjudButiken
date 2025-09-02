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