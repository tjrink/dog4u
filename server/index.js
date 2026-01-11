require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Test Route
app.get('/test', async (req, res) => {
  try {
    console.log("Attempting to connect to:", process.env.DATABASE_URL ? "URL found" : "URL NOT FOUND");const result = await pool.query('SELECT NOW()');
    res.json({ message: "Server is running", db_time: result.rows[0].now });
  } catch (err) {
    console.error("Database error:", err.message); 
    res.status(500).send("Server Error");
  }
});

//Get All Breeds
app.get('/api/breeds', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM breeds');
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Could not fetch breeds" });
  }
});

//Get Nickname 
app.get('/api/get_breed_nickname/:name', async (req, res) => {
  try {
    const result = await pool.query('SELECT breed_nickname FROM breeds WHERE breed_name = $1', [req.params.name]);
    res.json(result.rows);
  } catch (err) {
    console.error("Database error: ", err.message);
    res.status(500).json({error: "Could not fetch breed nickname"});
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});