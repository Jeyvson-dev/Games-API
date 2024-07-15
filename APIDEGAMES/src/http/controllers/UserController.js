const User = require('../../models/User');

class UserController{

   async auth(req, res){

    let email = req.body.email
    let password = req.body.password


    if(email == undefined) return res.status(400).json({error: "Email Inválido"});

    try {

        const user = await User.findOne({ 
            where: { email: email }
        });

        if(!user) return res.status(404).json({error: "Usuário não encontrado em nosso banco de dados"});
        
        if(password != user.password) return res.status(401).json({error: "Senha incorreta"});

        return res.status(200).json(user)

    }catch(error){

        return res.status(500).json({error: "Server error"})

    }
   

   }

}

module.exports = new UserController();