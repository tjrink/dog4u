// Quiz-related controller functions
const pool = require('../db');

// Get breed scores based on slider values
async function getSliderQuizResults(req, res) {
  try {
    
    //Deconstructs the request body into component variables to be sent in database request
    const {
      Playfulness,
      Energy,
      Affection,
      ['Good With Strangers']: goodWithStrangers, // Match the key from your frontend
      ['Good With Children']: goodWithChildren,
      Drooling,
      Shedding,
      Trainability,
    } = req.body;

    //Sends the request to the database
    //The algorithm multiplies the slider value by the breed's score in each category
    //Results are summed, except for the "bad" categories are subtracted 
    const result = await pool.query(
      `SELECT breed_id, name, breed_image, 
      (affection_level * $1 + 
       playfulness_level * $2 - 
       drooling_level * $3 + 
       energy_level * $4 + 
       good_with_strangers_level * $5 + 
       good_with_children_level * $6 - 
       shedding_level * $7 + 
       trainability_level * $8) AS breed_score 
      FROM breeds 
      ORDER BY breed_score DESC 
      LIMIT 3`,
      [
        Affection || 0,         // $1
        Playfulness || 0,       // $2
        Drooling || 0,          // $3
        Energy || 0,            // $4
        goodWithStrangers || 0, // $5
        goodWithChildren || 0,  // $6
        Shedding || 0,          // $7
        Trainability || 0       // $8
      ]
    );

    res.json({
      message: 'Data received successfully!',
      received: result.rows,
    });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Gets all breeds from the database
//Not in use. Here as an easy test of the database connection
async function getAllBreeds(req, res) {
  try {
    const result = await pool.query('SELECT breed_id, name FROM breeds');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Could not fetch breeds' });
  }
}

// Get breed nickname
// Not in use
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
