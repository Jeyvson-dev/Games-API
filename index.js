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
    }).then(games => {

        res.statusCode = 200;
        res.json(games);

    });
});

app.get('/games/:id', (req, res) => {

    gameId = req.params.id;

    if (isNaN(gameId)) {
        res.status(400).json({ error: "Id enviado de forma incorreta" });
    } else {
        gameId = parseInt(gameId);
        try {
            Game.findOne({
                where: { id: gameId }
            }).then(game => {
                if (game) {
                    res.status(200).json(game);
                } else {
                    res.status(404).json({ error: "Jogo não encontrado em nosso banco de dados" });
                }
            });
        } catch (error) {
            res.status(500).json({ error: "erro no servidor" });
        }
    }

})

app.put('/games', async (req, res) => {

    const atualDate = new Date();
    const atualYear = atualDate.getFullYear();
    const {id, title, price, year} = req.body;

    //price = price.replace(/,/g, '.');

    if(title == undefined || price == undefined || year == undefined) return res.status(400).json({error: "Campos Titulo, Preço e Ano de lançamento precisam ser preenchidos"});

    if (atualYear < year || isNaN(year)) return res.status(400).json({ error: "Ano de lançamento inválido" });

    if (title.length > 255) return res.status(400).json({ error: "Título do jogo supera quantidade de caracteres" });

    if (isNaN(price)) return res.status(400).json({ error: "Preço inválido" });

    try {
        const game = await Game.findByPk(id);

        game.title = title;
        game.price = price;
        game.year = year;

        await game.save();
        res.status(200).json({message: "Jogo editado com sucesso"});

    console.log(game);
    } catch (error) {
        res.status(500).json({error: "Erro no servidor, por favor contatar o suporte"});
    }
    

})

app.delete('/games/:id', async (req, res) =>{

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
    
})

app.post('/games', (req, res) => {

    const atualDate = new Date();
    const atualYear = atualDate.getFullYear();

    var { title, price, year } = req.body;

    price = price.replace(/,/g, '.');

    if(title == undefined || price == undefined || year == undefined) return res.status(400).json({error: "Campos Titulo, Preço e Ano de lançamento precisam ser preenchidos"});

    if (atualYear < year || isNaN(year)) return res.status(400).json({ error: "Ano de lançamento inválido" });

    if (title.length > 255) return res.status(400).json({ error: "Título do jogo supera quantidade de caracteres" });

    if (isNaN(price)) return res.status(400).json({ error: "Preço inválido" })

    try {
        Game.create({
            title: title,
            price: price,
            year: year
        }).then(game => {

            if (game){
                return res.status(201).json(game);

            }else{
                return res.status(404).json({error: "Erro ao cadastrar jogo, por favor, contate o administrador"});
            }

        });
    } catch (error) {
        return res.status(500).json({ error: "Erro no servidor" });
    }

})

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});