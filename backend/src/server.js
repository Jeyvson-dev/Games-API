const PORT = 8080;
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const gamesRoutes = require('./http/routes');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());


app.use('', gamesRoutes);


app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});