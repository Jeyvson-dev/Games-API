const User = require('../../models/User');
const jwt = require("jsonwebtoken");

const JWTSecret = "ASjdaJASDJasdJASDJASDJXCOASdOQWEJsdKASDJOQW2#$$a3$A#$ADCasdASDE@";

class UserController {

    async auth(req, res) {

        let email = req.body.email
        let password = req.body.password

        if (email == undefined) return res.status(400).json({ error: "Email Inválido" });

        try {

            const user = await User.findOne({
                where: { email: email }
            });

            if (!user) return res.status(404).json({ error: "Usuário não encontrado em nosso banco de dados" });

            if (password != user.password) return res.status(401).json({ error: "Senha incorreta" });

            jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'},(err, token) =>{
                if(err) return res.status(400).json({erro: 'Falha ao gerar token'});

                return res.status(200).json({token: token});
            });   

        } catch (error) {

            return res.status(500).json({ error: "Server error" })

        }

    }

}

module.exports = new UserController();