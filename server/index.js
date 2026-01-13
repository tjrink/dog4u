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
    res.json({ message: "Test test Server is running", db_time: result.rows[0].now });
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
app.post('/api/get_breed_nickname', async (req, res) => {
  try {
    const {requested_breed} = req.body;
    const result = await pool.query('SELECT breed_nickname FROM breeds WHERE breed_name = $1', [requested_breed]);
    res.json(result.rows);
  } catch (err) {
    console.error("Database error: ", err.message);
    res.status(500).json({error: "Could not fetch breed nickname"});
  }
});

//Get Breed scores based on allValues from sliders
app.post('/api/get_slider_quiz_results', async (req, res) =>{
  try {
    //reception of slider values
    const quizData = req.body;

    //Breaks down the slider value object into component categories
    const {
      Playfulness,
      Energy,
      Affection,
      ["Good With Strangers"]: goodWithStrangers, //Categories with spaces must be edited
      ["Good With Children"]: goodWithChildren,
      Drooling,
      Shedding,
      Trainability
    } = req.body;

    //Sends query to database
    //Algorithm multiples the breed's score in a category by the user's priority level
    //These results are summed to get the breed score
    //Top 3 resulting breed scores are returned
    //For "bad" categories, like drooling and shedding, the values are subtracted rather than added
    const result = await pool.query('SELECT name, (affection_level * $1 + playfulness_level * $2 - drooling_level * $3 + energy_level * $4 + good_with_strangers_level * $5 + good_with_children_level * $6 - shedding_level * $7 + trainability_level * $8) AS breed_score FROM breeds ORDER BY breed_score DESC LIMIT 3', [Affection, Playfulness, Drooling, Energy, goodWithStrangers, goodWithChildren, Shedding, Trainability]);

    //Sends results back to the React components
    res.json({ 
        message: "Data received successfully!", 
        received: result.rows
    });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});