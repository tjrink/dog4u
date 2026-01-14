require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const quizRoutes = require('./routes/quizRoutes');
app.use('/api', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
