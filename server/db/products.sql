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


/*Om ni behöver lägga in kategorier/produkter, så kan ni använda följande SQL: /AL */

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

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/beogram4000c.jpg',
'Skivspelare - Beogram 4000c',
'Den originella, ikoniska skivspelare som satt standarden för alla efterföljare - Omarbetad för modern användning.',
'Bang & Olufsen', 'BO-4000-C', 14000, 4, 'beogram-skivspelare');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/beosounda9.jpg', 'Golvhögtalare - Beosound A9 5TH GEN',
'Beosound A9 5th Gen är en kraftfull och välspelande trådlös högtalare som kan användas separap, eller ingå i ett trådlöst system i flera rum. En riktigt exklusiv streaming-högtalare med ikonisk design och ett övertygande ljud som gör den till en naturlig mittpunkt i ditt hem.',
'Bang & Olufsen', 'BO-BS-A9', 41990, 1, 'beosound-a9-hogtalare');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/hd505.jpg', 'ANC Hörlurar - HD 505 Copper', 'Vänta lite, kom det där ljudet från mitt rum, eller var det inspelningen? Bortom en viss nivå av ljudtrogenhet kan det vara svårt att avgöra. Nej, vi försöker inte göra dig förvirrad. Men det här är ett av sätten som HD 505 kommer att överraska dig på, särskilt om högkvalitativt ljud är nytt för dig. Allt känns mer verkligt, du befinner dig mitt i händelsernas centrum – utan att behöva investera i stor och dyr utrustning',
'Sennheiser', 'SE-HD505', 2990, 3, 'sennheiser-hd505-horlurar');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/medusa55.jpg', 
'Rörförstärkare - Medusa 55', 
'Medusa 55 förstärkaren kombinerar klassisk, "split load design" från den legendariska Mc Intosh and Quad förstärkarna.', 
'WB Manufacture', 'WB-MD-55', 25000, 2, 'wb-medusa55-forstarkare');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/audiotechnica.jpg', 
'Skivspelare - AT-LP120XUSB', 
'Manuell skivspelare med direktdrift som passar lika bra för DJ-båset som hemmabruk. S-formad tonarm med Audio Technica AT-VM95E pickup!',
 'Audio Technica', 'AT-LP120XUSB', 4489, 4, 'audio-technica-skivspelare');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/onkyo.jpg',
'9.2 kanals A/V receiver - TX-RZ50',
'THX certifierad 9.2 kanals A/V receiver, som är utbyggbar till 11.2, med gott om kraft, gamingoptimerad HDMI 2.1, avancerat kalibreringssystem och omfattande streamingstöd!',
'Onkyo', 'OK-TX-RZ50', 19480, 2, 'onkyo-tx-receiver');

INSERT INTO products (image, productName, productDescription, brand, sku, price, categoryId, slug) VALUES
('/images/products/elara.jpg',
'Aktiva högtalare - Elara LN-01A',
'De aktiva högtalarna i Elara Series ger både bra ljud och fler uppspelningsmöjligheter! Särskilt rekommenderade ljud/Bild April 2017.',
'TRIANGLE', 'TR-EL-LN01A', 5490, 1, 'triangle-elara-hogtalare');

COMMIT;