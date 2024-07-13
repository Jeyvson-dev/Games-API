const Game = require('../../models/Game');

class AllGamesController{

    getAllGames(req, res){

        Game.findAll({
            order: [['id', 'desc']]
        }).then(games => {
            
            res.status(200).json(games);
    
        }).catch(error =>{

            res.status(500).json({error: "Erro ao se conectar com o servidor, por favor entrar em contato com suporte"});
        })
    
    }

}

module.exports = new AllGamesController();