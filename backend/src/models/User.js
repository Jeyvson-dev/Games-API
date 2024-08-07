const Sequelize = require("sequelize");
const connection = require("../../database/connection/connection");

const User = connection.define('users', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force: false}).then(() =>{

    console.log("Tabela User criada com sucesso");
});

module.exports = User;