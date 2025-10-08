const jwt=require('jsonwebtoken')


const Generatetokens=(id)=>{
    return jwt.sign({id},"JWT_PASSKEY",{expiresIn:"7d"})
}

module.exports=Generatetokens;