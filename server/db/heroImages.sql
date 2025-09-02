-- database: db.db
CREATE TABLE heroImages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    altText TEXT NOT NULL
);

INSERT INTO heroImages (image, altText) 
VALUES 
('https://i.redd.it/i-made-a-vintage-record-store-for-work-v0-0b9kfy9zm9hc1.jpg?width=5472&format=pjpg&auto=webp&s=0360e55e39cb8eb5ae336608491dac3f8c056a72','Vinyl Store'),
('https://images.theabsolutesound.com/wp-content/uploads/2020/11/1_Extreme_MBL.jpg','Loudspeakers');
