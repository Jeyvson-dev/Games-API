const Sequelize = require("sequelize");
const connection = require("../database/connection/connection");

const Game = connection.define('games', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

Game.sync({force: false}).then(() =>{

    console.log("Tabela criada com sucesso");
});

module.exports = Game;