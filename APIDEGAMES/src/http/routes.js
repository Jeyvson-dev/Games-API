const express = require("express");
const router = express.Router();
const allGamesController = require('./controllers/AllGamesController')

router.get('/games', (req, res) => allGamesController.getAllGames(req, res));

module.exports = router;