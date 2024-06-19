const PORT = 8080;
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const connection = require('./database/connection/connection');
const Game = require('./models/Game');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.get('/games', (req, res) => {

    Game.findAll({
        order: [['id', 'desc']]
    }).then(games =>{

        res.statusCode = 200;
        res.json(games);

    });
});

app.get('/games/:id', (req, res) => {

    gameId = req.params.id;

    if(isNaN(gameId)){
        res.status(400).json({error: "Id enviado de forma incorreta"});
    }else{
        gameId = parseInt(gameId);
        try{
            Game.findOne({ 
                where: { id: gameId } 
            }).then(game =>{
                if(game){
                    res.status(200).json(game);
                }else{
                    res.status(404).json({error: "Jogo não encontrado em nosso banco de dados"});
                }
            });  
        }catch(error){
            res.status(500).json({error: "erro no servidor"});
        }
    }

    
 
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});