const Game = require('../../models/Game');

class GameController{

    async getAllGames(req, res){

        try {

            const games = await Game.findAll({
                order: [['id', 'desc']]
            })

            if(!games) return res.status(200).json({msg: "Sem jogos registrados em nossa base"});

            return res.status(200).json({user: req.loggedUser, games});

        } catch (error) {

            return res.status(500).json({error: "Erro ao se conectar com o servidor, por favor entrar em contato com suporte"});

        }
    
    }

    async saveGame(req, res){
        
        const atualDate = new Date();
        const atualYear = atualDate.getFullYear();

        var {title, year, price} = req.body;
        price = price.replace(/,/g, '.');

        if(title == undefined || price == undefined || year == undefined) return res.status(422).json({error: "Campos Titulo, Preço e Ano de lançamento precisam ser preenchidos"});

        if (atualYear < year || isNaN(year)) return res.status(422).json({ error: "Ano de lançamento inválido" });

        if(title.length > 255) return res.status(422).json({error: "Quantidade de caracteres inválida"})

        if (isNaN(price)) return res.status(422).json({ error: "Preço inválido" })   

        try {
            const game = await Game.create({
                title: title,
                price: price,
                year: year
                
            });

            return res.status(201).json({title: title, price: price, year: year})

        } catch (error) {
            return res.status(500).json({error: "Erro ao se conectar com o servidor, por favor entrar em contato com suporte"})
        }

    }

    async deleteGame(req, res){

        const gameId = req.params.id;

        if(isNaN(gameId)) return res.status(400).json({error: "id de jogo inválido"});
    
        try {
    
            const game = await Game.findOne({
                where: {
                  id: gameId
                }
              });
    
    
              if (!game) return res.status(404).json({ msg: 'Jogo não encontrado' });
    
              await game.destroy();
              return res.status(204).json({ msg: "Jogo deletado com sucesso" });
    
        } catch (error) {
    
            return res.status(500).json({error: "Erro em nosso servidor"});
        }
    }

    async updateGame(req, res){
        
        const atualDate = new Date();
        const atualYear = atualDate.getFullYear();

        var {id, title, price, year} = req.body;
        price = price.replace(/,/g, '.');

        if(id == undefined || title == undefined || price == undefined || year == undefined) return res.status(400).json({error: "Campos Titulo, Preço e Ano de lançamento precisam ser preenchidos"});
    
        if (atualYear < year || isNaN(year)) return res.status(422).json({ error: "Ano de lançamento inválido" });

        if(title.length > 255) return res.status(422).json({error: "Quantidade de caracteres inválida"})

        if (isNaN(price)) return res.status(422).json({ error: "Preço inválido" }) 
    
        try {
            const game = await Game.findByPk(id);
    
            game.title = title;
            game.price = price;
            game.year = year;
    
            await game.save();
            return res.status(200).json({message: "Jogo editado com sucesso"});
    
        console.log(game);
        } catch (error) {
            return res.status(500).json({error: "Erro no servidor, por favor contatar o suporte"});
        }
    }

}

module.exports = new GameController();