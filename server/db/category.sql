CREATE TABLE Category (
    categoryId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    categoryDescription TEXT,
    image TEXT
);

Om ni behöver lägga in kategorier, så kan ni använda följande SQL: /AL

PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

INSERT INTO Category (categoryId, name, categoryDescription, image) VALUES
(1, 'Högtalare', 'Golvhögtalare och stativhögtalare för stereolyssning och hemmabio.', '/images/categories/hogtalare.jpg'),
(2, 'Förstärkare & Receivers', 'Stereo-förstärkare och nätverksreceivers med streaming och HDMI.', '/images/categories/forstarkare-receivers.jpg'),
(3, 'Hörlurar', 'Brusreducerande, öppna och slutna hörlurar för musik och studio.', '/images/categories/horlurar.jpg'),
(4, 'Skivspelare & Vinyl', 'Skivspelare, pickuper och tillbehör för vinylsamlingen.', '/images/categories/skivspelare-vinyl.jpg');

COMMIT;