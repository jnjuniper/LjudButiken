const express = require("express");
const Database = require("better-sqlite3");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 8000;

const db = new Database("./db/db.db", {
  verbose: console.log,
});

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// Helper to create URL-safe slugs from Swedish names like "Högtalare"
function slugify(s = "") {
  return s
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/&/g, "-och-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

app.get("/api/category", (req, res) => {
  try {
    const select = db.prepare("SELECT categoryId, name FROM Category");
    const categories = select.all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Products by category slug, e.g. /api/categories/hogtalare/products
app.get("/api/categories/:slug/products", (req, res) => {
  try {
    const { slug } = req.params;
    const selectCategories = db.prepare(
      "SELECT categoryId, name FROM Category"
    );
    const categories = selectCategories.all();
    const match = categories.find((c) => slugify(c.name) === slug);
    if (!match) {
      return res.status(404).json({ error: "Category not found" });
    }

    const selectProducts = db.prepare(`
      SELECT id, image, productName, productDescription, brand, SKU, price, slug
      FROM products
      WHERE categoryId = ?
    `);
    const products = selectProducts.all(match.categoryId);

    res.json({ category: match, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products", (req, res) => {
  const searchTerm = req.query.search || "";

  const select = db.prepare(`
        SELECT id, image, productName, productDescription, brand, SKU, price, slug 
        FROM products
        WHERE productName LIKE ?
    `);

  const products = select.all(`%${searchTerm}%`);

  res.json(products);
});
app.get("/api/products/:slug", (req, res) => {
  const { slug } = req.params;
  const select = db.prepare(`
        SELECT id, image, productName, productDescription, brand, SKU, price, slug
        FROM products 
        WHERE slug = ?
    `);
  const product = select.get(slug);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.get("/api/similar-products/:slug", (req, res) => {
  const { slug } = req.params;
  const product = db
    .prepare("SELECT categoryId FROM products WHERE slug = ?")
    .get(slug);
  if (product) {
    const selectSimilar = db.prepare(`
            SELECT id, image, productName, productDescription, brand, SKU, price, slug
            FROM products 
            WHERE categoryId = ? AND slug != ? 
            LIMIT 3
        `);
    const similarProducts = selectSimilar.all(product.categoryId, slug);
    res.json(similarProducts);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});
app.get("/api/heroImages", (req, res) => {
  const select = db.prepare(
    "SELECT id, image, altText, imageDescription FROM heroImages"
  );

  const heroImages = select.all();

  res.json(heroImages);
});

app.get("/api/spots", (req, res) => {
  const select = db.prepare("SELECT id, image, altText, title FROM spots");
  const spots = select.all();
  res.json(spots);
});

app.post("/api/products", (req, res) => {
  const { image, productName, productDescription, brand, sku, price } =
    req.body;
  const product = { image, productName, productDescription, brand, sku, price };

  const insert = db.prepare(`
        INSERT INTO products (
        image,
        productName,
        productDescription,
        brand,
        sku,
        price
        ) VALUES (
            @image,
            @productName,
            @productDescription,
            @brand,
            @sku,
            @price 
        )`);

  insert.run(product);

  res.status(201).send();
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
