const Game = require('../../models/Game');

class GameController{

    getAllGames(req, res){

        Game.findAll({
            order: [['id', 'desc']]
        }).then(games => {
            
            res.status(200).json(games);
    
        }).catch(error =>{

            res.status(500).json({error: "Erro ao se conectar com o servidor, por favor entrar em contato com suporte"});
        })
    
    }

    saveGame(req, res){
        let gameTitle = req.body.title;
        let gameYear = req.body.year;
        let gamePrice = (req.body.price).replace(/,/g, '.');

        if(gameTitle.length > 255) res.status(422).json({error: "Quantidade de caracteres inválida"})

        console.log(gamePrice);
    }

}

module.exports = new GameController();