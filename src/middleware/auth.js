const auth = (req,res,next)=>{
const jwt = require("jsonwebtoken");
const SECREST_KEY = process.env.SECREST_KEY;
    try {
        let token = req.headers.authorization;
        if(token){

            token = token.split(" ")[1];
            let user =jwt.verify(token,SECREST_KEY);
            req.userId = user.id;



        }else{
           return res.status(401),json("Unauthorized user");

        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401),json("Unauthorized user");
    }
}
module.exports =auth;