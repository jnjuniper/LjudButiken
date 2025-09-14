// server/server.js
const express = require("express");
const Database = require("better-sqlite3");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const port = 8000;

const sqliteVerbose = process.env.SQL_DEBUG === "1" ? console.log : undefined;
const db = new Database("./db/db.db", { verbose: sqliteVerbose });
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

app.post("/api/upload", (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "Ingen fil mottagen." });
    }

    const file = req.files.file;

    if (!String(file.mimetype).startsWith("image/")) {
      return res.status(400).json({ error: "Endast bildfiler tillåtna." });
    }

    const uploadDir = path.join(__dirname, "../client/public/images/products");
    fs.mkdirSync(uploadDir, { recursive: true });

    const safeName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");
    const filename = `${Date.now()}-${safeName}`;
    const dest = path.join(uploadDir, filename);

    file.mv(dest, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Kunde inte spara filen." });
      }

      const url = `/images/products/${filename}`;
      return res.json({ url });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Uppladdningsfel." });
  }
});

// Upload category images to /public/images/categories
app.post("/api/upload/category", (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "Ingen fil mottagen." });
    }
    const file = req.files.file;
    if (!String(file.mimetype).startsWith("image/")) {
      return res.status(400).json({ error: "Endast bildfiler tillåtna." });
    }
    const uploadDir = path.join(
      __dirname,
      "../client/public/images/categories"
    );
    fs.mkdirSync(uploadDir, { recursive: true });
    const safeName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");
    const filename = `${Date.now()}-${safeName}`;
    const dest = path.join(uploadDir, filename);
    file.mv(dest, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Kunde inte spara filen." });
      }
      const url = `/images/categories/${filename}`;
      return res.json({ url });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Uppladdningsfel." });
  }
});

app.get("/api/products", (req, res) => {
  const searchTerm = req.query.search || "";
  const stmt = db.prepare(`
    SELECT id, image, productName, productDescription, brand, SKU, price, slug, categoryId
    FROM products
    WHERE productName LIKE ?
    ORDER BY id DESC
  `);
  res.json(stmt.all(`%${searchTerm}%`));
});

app.get("/api/products/:slug", (req, res) => {
  const { slug } = req.params;
  const stmt = db.prepare(`
    SELECT id, image, productName, productDescription, brand, SKU, price, slug, categoryId
    FROM products
    WHERE slug = ?
  `);
  const row = stmt.get(slug);
  if (!row) return res.status(404).json({ error: "Product not found" });
  res.json(row);
});

app.get("/api/similar-products/:slug", (req, res) => {
  try {
    const { slug } = req.params;
    const base = db
      .prepare(`SELECT categoryId FROM products WHERE slug = ?`)
      .get(slug);
    if (!base) return res.status(404).json({ error: "Product not found" });

    const stmt = db.prepare(`
      SELECT id, image, productName, productDescription, brand, sku as sku, price, slug
      FROM products
      WHERE categoryId = ? AND slug != ?
      ORDER BY id DESC
      LIMIT 3
    `);
    return res.json(stmt.all(base.categoryId, slug));
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load similar products" });
  }
});

app.post("/api/products", (req, res) => {
  try {
    const {
      image = "",
      productName,
      productDescription = "",
      brand = "",
      SKU, // OBS: versaler
      price,
      categoryId, // från dropdown
    } = req.body;

    if (!productName || productName.length > 25)
      return res
        .status(400)
        .json({ error: "Namn är obligatoriskt och max 25 tecken." });
    if (!SKU) return res.status(400).json({ error: "SKU är obligatoriskt." });
    if (price === undefined || price === null || isNaN(Number(price)))
      return res.status(400).json({ error: "Pris måste vara ett nummer." });
    if (!categoryId)
      return res.status(400).json({ error: "Kategori är obligatorisk." });

    const slug = slugify(productName);

    const stmt = db.prepare(`
      INSERT INTO products (
        image, productName, productDescription, brand, SKU, price, categoryId, slug
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(
      image,
      productName,
      productDescription,
      brand,
      SKU,
      Number(price),
      Number(categoryId),
      slug
    );

    return res.status(201).json({ id: info.lastInsertRowid, slug });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Kunde inte spara produkten" });
  }
});

// Delete a product by ID
app.delete("/api/products/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }
    const stmt = db.prepare(`DELETE FROM products WHERE id = ?`);
    const info = stmt.run(id);
    return res.json({ deleted: info.changes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Kunde inte ta bort produkten" });
  }
});

// Delete a product by slug
app.delete("/api/products/by-slug/:slug", (req, res) => {
  try {
    const slug = String(req.params.slug || "");
    if (!slug) return res.status(400).json({ error: "Invalid slug" });
    const stmt = db.prepare(`DELETE FROM products WHERE slug = ?`);
    const info = stmt.run(slug);
    return res.json({ deleted: info.changes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Kunde inte ta bort produkten" });
  }
});

app.get("/api/heroImages", (_req, res) => {
  const stmt = db.prepare(
    "SELECT id, image, altText, imageDescription FROM heroImages"
  );
  res.json(stmt.all());
});

app.get("/api/spots", (_req, res) => {
  const stmt = db.prepare("SELECT id, image, altText, title FROM spots");
  res.json(stmt.all());
});

app.get("/api/categories", (_req, res) => {
  try {
    const rows = db
      .prepare(`SELECT categoryId, name, image FROM Category ORDER BY name`)
      .all();
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.json([]);
  }
});

// Create a new category
app.post("/api/categories", (req, res) => {
  try {
    const { name, image = "", categoryDescription = "" } = req.body || {};
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Namn är obligatoriskt." });
    }
    const trimmed = name.trim();
    if (trimmed.length > 25) {
      return res.status(400).json({ error: "Namn får vara max 25 tecken." });
    }
    const stmt = db.prepare(
      `INSERT INTO Category (name, categoryDescription, image) VALUES (?, ?, ?)`
    );
    const info = stmt.run(trimmed, categoryDescription, image);
    return res.status(201).json({ categoryId: info.lastInsertRowid });
  } catch (e) {
    console.error(e);
    let msg = "Kunde inte skapa kategori";
    if (String(e.message).toLowerCase().includes("unique")) {
      msg = "Kategorinamn måste vara unikt.";
    }
    return res.status(500).json({ error: msg });
  }
});

// Delete category by id (only if unused by any products)
app.delete("/api/categories/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "Ogiltigt kategori-id" });
    }
    // Check usage in products
    const used = db
      .prepare(`SELECT COUNT(1) as cnt FROM products WHERE categoryId = ?`)
      .get(id);
    if (used && used.cnt > 0) {
      return res.status(409).json({
        error: "Kategorin används av produkter och kan inte tas bort.",
      });
    }

    const info = db
      .prepare(`DELETE FROM Category WHERE categoryId = ?`)
      .run(id);
    return res.json({ deleted: info.changes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Kunde inte ta bort kategorin" });
  }
});

// Get products for a given category slug
app.get("/api/categories/:slug/products", (req, res) => {
  try {
    const { slug } = req.params;
    // find category by slugified name
    const categories = db
      .prepare(`SELECT categoryId, name FROM Category`)
      .all();
    const cat = categories.find((c) => slugify(c.name) === slug);
    if (!cat) {
      return res
        .status(404)
        .json({ error: "Category not found", products: [] });
    }

    const products = db
      .prepare(
        `SELECT id, image, productName, productDescription, brand, sku as sku, price, slug, categoryId
         FROM products WHERE categoryId = ? ORDER BY id DESC`
      )
      .all(cat.categoryId);

    return res.json({ category: cat, products });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "Failed to load category products", products: [] });
  }
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
