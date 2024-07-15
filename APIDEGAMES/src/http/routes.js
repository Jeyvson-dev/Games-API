const express = require("express");
const router = express.Router();
const gameController = require('./controllers/GameController');
const userCtronoller = require('./controllers/UserController');

router.get('/games', (req, res) => gameController.getAllGames(req, res));

router.post('/games', (req, res) =>  gameController.saveGame(req, res));

router.post('/auth', (req, res) => userCtronoller.auth(req, res));

module.exports = router;