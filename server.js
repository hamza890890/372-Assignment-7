"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const PORT = process.env.PORT || 3000;

// ========== ROUTES BELOW ==========

// GET /jokebook/categories
app.get("/jokebook/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT name AS category FROM categories ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /jokebook/category/:category?limit=#
app.get("/jokebook/category/:category", async (req, res) => {
  let category = req.params.category;
  let limit = req.query.limit;

  try {
    let queryText = `
      SELECT j.setup, j.delivery, c.name AS category
      FROM jokes j
      JOIN categories c ON j.category_id = c.id
      WHERE c.name = $1
    `;
    let values = [category];

    if (limit) {
      queryText += " LIMIT $2";
      values.push(limit);
    }

    const result = await pool.query(queryText, values);
    if (result.rows.length === 0) {
      res.status(400).send("Invalid category or no jokes found!");
      return;
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /jokebook/random
app.get("/jokebook/random", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT j.setup, j.delivery, c.name AS category
      FROM jokes j
      JOIN categories c ON j.category_id = c.id
      ORDER BY RANDOM()
      LIMIT 1
    `);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST /jokebook/add
app.post("/jokebook/add", async (req, res) => {
  let category = req.body.category;
  let setup = req.body.setup;
  let delivery = req.body.delivery;

  if (category && setup && delivery) {
    try {
      // ensure category exists
      let catResult = await pool.query("SELECT id FROM categories WHERE name=$1", [category]);
      let catId;
      if (catResult.rows.length === 0) {
        const newCat = await pool.query(
          "INSERT INTO categories (name) VALUES ($1) RETURNING id",
          [category]
        );
        catId = newCat.rows[0].id;
      } else {
        catId = catResult.rows[0].id;
      }

      // add joke
      await pool.query(
        "INSERT INTO jokes (category_id, setup, delivery) VALUES ($1, $2, $3)",
        [catId, setup, delivery]
      );

      // return updated jokes (with category name)
      const jokes = await pool.query(`
        SELECT j.setup, j.delivery, c.name AS category
        FROM jokes j
        JOIN categories c ON j.category_id = c.id
        WHERE c.id = $1
      `, [catId]);

      res.json(jokes.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(400).send("Missing required parameters: category, setup, or delivery");
  }
});


app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT + "!");
});
