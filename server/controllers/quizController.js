// Quiz-related controller functions
const pool = require('../db');

// Get breed scores based on slider values
async function getSliderQuizResults(req, res) {
  console.log("Console logging req: ", req);
  
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
      shortCoat,
      mediumCoat,
      longCoat,
      minWeight,
      maxWeight,
      curlyCoat, 
      denseCoat,
      flatCoat, 
      roughCoat,
      silkyCoat,
      smoothCoat,
      straightCoat,
      wavyCoat,
      wiryCoat
    } = req.body;
    //Sends the request to the database
    //The algorithm multiplies the slider value by the breed's score in each category
    //Results are summed, except for the "bad" categories are subtracted 
    const result = await pool.query(
      `WITH weight_filter AS (
        SELECT * FROM breeds WHERE min_weight_female >= $12 AND max_weight_female <= $13
      ),
      coat_filter AS (
        SELECT * FROM weight_filter WHERE (
          (short_coat = true AND $9 = true) OR 
          (medium_coat = true AND $10 = true) OR 
          (long_coat = true AND $11 = true)
        )
      ),
      coat_type_filter AS (
        SELECT * FROM coat_filter WHERE (
          (curly_coat = true AND $14 = true) OR 
          (dense_coat = true AND $15 = true) OR 
          (flat_coat = true AND $16 = true) OR 
          (rough_coat = true AND $17 = true) OR 
          (silky_coat = true AND $18 = true) OR 
          (smooth_coat = true AND $19 = true) OR 
          (straight_coat = true AND $20 = true) OR 
          (wavy_coat = true AND $21 = true) OR 
          (wiry_coat = true AND $22 = true)
    )
    )
      SELECT breed_id, breed_name, breed_image, 
      (affection_level * $1 + 
       playfulness_level * $2 - 
       drooling_level * $3 + 
       energy_level * $4 + 
       good_with_strangers_level * $5 + 
       good_with_children_level * $6 - 
       shedding_level * $7 + 
       trainability_level * $8) AS breed_score 
      FROM coat_type_filter 
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
        Trainability || 0,       // $8
        shortCoat || 0,         // $9
        mediumCoat || 0,        // $10
        longCoat || 0,          // $11
        minWeight || 0,         // $12
        maxWeight || 0,         // $13
        curlyCoat,              // $14
        denseCoat,              // $15  
        flatCoat,               // $16
        roughCoat,              // $17
        silkyCoat,              // $18
        smoothCoat,             // $19
        straightCoat,           // $20
        wavyCoat,               // $21
        wiryCoat                // $22

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
