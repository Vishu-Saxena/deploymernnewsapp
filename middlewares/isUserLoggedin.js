const JWT = require('jsonwebtoken');

const isuserloggedin = (req , res , next)=>{
    try { 
        const decode =  JWT.verify(req.headers.authorization , process.env.SECRETKEY); // decode: {"_id": "65171beed6561ad5c94780d0","iat": 1696088544,"exp": 1696693344} decode consist this sort of object
        req.user = decode; // we will run the isadmin middleware just after this and there we will use this req.user object to get the user id
        next();
        
    } catch (error) {
        res.send({
            message : "error in isSignrequired middleware",
            error
        })
    }
   
}

const isAdminLoggedin = (req ,res , next)=>{
    
}

module.exports = isuserloggedin;