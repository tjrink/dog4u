// Quiz-related controller functions
const pool = require('../db');

// Get breed scores based on slider values
async function getSliderQuizResults(req, res) {
  try {
    // Reception of slider values
    const quizData = req.body;

    // Breaks down the slider value object into component categories
    const {
      Playfulness,
      Energy,
      Affection,
      ['Good With Strangers']: goodWithStrangers,
      ['Good With Children']: goodWithChildren,
      Drooling,
      Shedding,
      Trainability,
    } = req.body;

    // Sends query to database
    // Algorithm multiplies the breed's score in a category by the user's priority level
    // These results are summed to get the breed score
    // Top 3 resulting breed scores are returned
    // For "bad" categories, like drooling and shedding, the values are subtracted rather than added
    const result = await pool.query(
      'SELECT name, (affection_level * $1 + playfulness_level * $2 - drooling_level * $3 + energy_level * $4 + good_with_strangers_level * $5 + good_with_children_level * $6 - shedding_level * $7 + trainability_level * $8) AS breed_score FROM breeds ORDER BY breed_score DESC LIMIT 3',
      [
        Affection,
        Playfulness,
        Drooling,
        Energy,
        goodWithStrangers,
        goodWithChildren,
        Shedding,
        Trainability,
      ]
    );

    // Sends results back to the React components
    res.json({
      message: 'Data received successfully!',
      received: result.rows,
    });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get all breeds
async function getAllBreeds(req, res) {
  try {
    const result = await pool.query('SELECT * FROM breeds');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Could not fetch breeds' });
  }
}

// Get breed nickname
async function getBreedNickname(req, res) {
  try {
    const { requested_breed } = req.body;
    const result = await pool.query(
      'SELECT breed_nickname FROM breeds WHERE breed_name = $1',
      [requested_breed]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Database error: ', err.message);
    res.status(500).json({ error: 'Could not fetch breed nickname' });
  }
}

// Test route
async function testRoute(req, res) {
  try {
    console.log(
      'Attempting to connect to:',
      process.env.DATABASE_URL ? 'URL found' : 'URL NOT FOUND'
    );
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Test test Server is running',
      db_time: result.rows[0].now,
    });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getSliderQuizResults,
  getAllBreeds,
  getBreedNickname,
  testRoute,
};
