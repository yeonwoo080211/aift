const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

// Render 환경변수 DATABASE_URL 사용
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT name FROM test LIMIT 1");
    
    if (result.rows.length === 0) {
      return res.send("데이터 없음");
    }

    const name = result.rows[0].name;

    res.send(`<h1>HELLO ${name}</h1>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB ERROR");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
