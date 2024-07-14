const express = require("express");
const router = express.Router();
const gameController = require('./controllers/GameController');

router.get('/games', (req, res) => gameController.getAllGames(req, res));

router.post('/games', (req, res) =>  gameController.saveGame(req, res));

module.exports = router;