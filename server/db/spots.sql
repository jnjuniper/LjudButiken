-- database: db.db
CREATE TABLE spots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    altText TEXT NOT NULL,
    title TEXT
);

INSERT INTO spots (image, altText, title)
VALUES
('https://cdn.mos.cms.futurecdn.net/v2/t:0,l:420,cw:1080,ch:1080,q:80,w:1080/nBkxNFcuAKk2kcE3n7CTK.jpg','Vinylspelare-woody','Vinylspelare'),
('https://primary.jwwb.nl/public/o/m/l/temp-hjsjpuswvkqqfipuveeo/chordenmoyabanner-high-gdensg.jpg?enable-io=true&enable=upscale&fit=bounds&width=1200','loudspeakers','Surroundljud'),
('https://www.bowerswilkins.com/dw/image/v2/BGJH_PRD/on/demandware.static/-/Library-Sites-bowers_northamerica_shared/default/dwf153c397/key-pages/david-beckham/main-banner-5-mobile-min.jpg?sw=768','Hörlurar','Hörlurar');