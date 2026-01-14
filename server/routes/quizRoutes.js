const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Test Route
router.get('/test', quizController.testRoute);

// Get All Breeds
router.get('/breeds', quizController.getAllBreeds);

// Get Nickname
router.post('/get_breed_nickname', quizController.getBreedNickname);

// Get Breed scores based on allValues from sliders
router.post('/get_slider_quiz_results', quizController.getSliderQuizResults);

module.exports = router;
