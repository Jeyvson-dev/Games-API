const express = require("express");
const router = express.Router();
const gameController = require('./controllers/GameController');
const userCtronoller = require('./controllers/UserController');
const jwt = require("jsonwebtoken");
const JWTSecret = "ASjdaJASDJasdJASDJASDJXCOASdOQWEJsdKASDJOQW2#$$a3$A#$ADCasdASDE@";

function auth(req, res, next){

    const authToken = req.headers['authorization'];

    if(authToken == undefined) return res.status(401).json({error: 'Token inválido'});

    const bearer = authToken.split(' ');
    var token = bearer[1]

    jwt.verify(token, JWTSecret, (err, data) =>{

        if(err) return res.status(401).json({erro: "token inválido"});

        req.token = token;
        req.loggedUser = {id: data.id, email: data.email};
        next();
    });
  
};

router.get('/games', auth, (req, res) => gameController.getAllGames(req, res));

router.post('/games', auth, (req, res) =>  gameController.saveGame(req, res));

router.delete('/games/:id', auth, (req, res) => gameController.deleteGame(req, res))

router.put('/games', auth, (req, res) => gameController.updateGame(req, res))

router.post('/auth', (req, res) => userCtronoller.auth(req, res));

module.exports = router;