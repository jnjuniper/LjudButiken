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


Om ni behöver lägga in kategorier/produkter, så kan ni använda följande SQL: /AL

PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- 2) Kategorier
INSERT INTO Category (categoryId, name, categoryDescription, image) VALUES
(1, 'Högtalare', 'Golvhögtalare och stativhögtalare för stereolyssning och hemmabio.', '/images/categories/hogtalare.jpg'),
(2, 'Förstärkare & Receivers', 'Stereo-förstärkare och nätverksreceivers med streaming och HDMI.', '/images/categories/forstarkare-receivers.jpg'),
(3, 'Hörlurar', 'Brusreducerande, öppna och slutna hörlurar för musik och studio.', '/images/categories/horlurar.jpg'),
(4, 'Skivspelare & Vinyl', 'Skivspelare, pickuper och tillbehör för vinylsamlingen.', '/images/categories/skivspelare-vinyl.jpg');

-- 3) Produkter (8 st)
INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/heco-aurora-700.jpg',
 'Golvhögtalare – Aurora 700',
 'Kraftfull golvhögtalare med dynamik och varm klang. Passar både musik och film.',
 'Heco', 'HE-AUR-700-BK', 8990, 1, 'golvhogtalare-aurora-700');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/elac-debut-b62.jpg',
 'Stativhögtalare – Debut 2.0 B6.2',
 'Balanserad stativhögtalare med imponerande bas för storleken. Lättplacerad.',
 'ELAC', 'EL-DEB-B62', 3490, 1, 'stativhogtalare-debut-b62');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/yamaha-as501.jpg',
 'Stereo-förstärkare – A-S501',
 'Klassisk stereo-förstärkare med hög strömkapacitet, DAC och sub-utgång.',
 'Yamaha', 'YA-AS501-SLV', 4990, 2, 'stereo-forstarkare-a-s501');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/denon-avr-x1700h.jpg',
 'Nätverksreceiver – AVR-X1700H',
 '7.2-kanals receiver med Dolby Atmos, HEOS streaming och HDMI 2.1 för gaming.',
 'Denon', 'DE-AVR-X1700H', 6990, 2, 'natverksreceiver-avr-x1700h');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/sony-wh-1000xm5.jpg',
 'Hörlurar – WH-1000XM5',
 'Trådlösa over-ear med klassledande brusreducering och lång batteritid.',
 'Sony', 'SO-WH1000XM5-B', 3990, 3, 'horlurar-wh-1000xm5');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/sennheiser-hd600.jpg',
 'Öppna hörlurar – HD 600',
 'Referensklassade öppna hörlurar med naturlig och detaljrik återgivning.',
 'Sennheiser', 'SE-HD600', 2990, 3, 'oppna-horlurar-hd-600');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/pro-ject-debut-carbon-evo.jpg',
 'Skivspelare – Debut Carbon EVO',
 'Stabil chassi-design, kolfiberarm och fabriksmonterad pickup. Spelklar direkt.',
 'Pro-Ject', 'PJ-DC-EVO-B', 5490, 4, 'skivspelare-debut-carbon-evo');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/ortofon-2m-red.jpg',
 'Pickup – 2M Red',
 'Populär MM-pickup med livlig karaktär och fin spårning. Lätt att montera.',
 'Ortofon', 'OR-2M-RED', 1290, 4, 'pickup-2m-red');

COMMIT;