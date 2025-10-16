 const bcrypt=require('bcrypt')
 const jwt=require('jsonwebtoken')
 const Generatetokens=require("../utiles/generatetokens")

const {questionsdb,scoredb,aidb,Userdb} = require('../models/schema')



const userdbadding=async(req,res)=>{
    try{

        const userdata=req.body
        const useremail=userdata.email

        const userfind=await Userdb.findOne({email:useremail})
        if(userfind){
            return res.status(400).json({message:"user already exist"})
        }
        const addinguser=await Userdb.create(userdata)
        const token=Generatetokens(addinguser._id);
        res.status(200).json({ user:{
                _id:addinguser._id,
                name:addinguser.name,
                email:addinguser.email,
            },
            token})
    }
    catch{
        alert(err)
    }
}

const userauth=async(req,res)=>{
    try{
        const {email,password}=req.body

        const user=await Userdb.findOne({email})
        if(!user){
            return res.status(400).json({message:'no user found'})
        }

        const passismatch=await bcrypt.compare(password,user.password)

        if(!passismatch){
            return res.status(400).json({message:'invalid password'})
        }

        const token=Generatetokens(user._id);

        res.status(200).json({
            message:"login successfull",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },
            token
        })
    }

    catch(err){
        res.status(500).json({message:"server error",err})
    }
}


const Userdetails=async(req,res)=>{
    try{
       
    const {email}=req.params
    const userdata=await Userdb.findOne({email:email})
    

    if(userdata){
        res.status(200).json(userdata)
    }
   
}
    catch(err){
        res.status(401).json({err})
    }

}


const Proctedroute=async(req,res)=>{
    const auth=req.headers.authorization

    console.log("Authorization header:", req.headers.authorization);

    if(!auth || !auth.startsWith('Bearer ')){
        res.status(401).json({message: "No token provided" })
    }

    const token=auth.split(" ")[1]

     try {
    const decoded = jwt.verify(token, 'JWT_PASSKEY');
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

const quizquesopt=async(req,res)=>{
    try{
    const data = req.body
    const addques=await questionsdb.insertMany(data)
    res.status(200).json({addques})}
    catch(err){
        alert(err)
    }


}

const getquest=async(req,res)=>{
    try{
    const getques=await questionsdb.find({})
res.status(200).json(getques)}
    
    catch(err){
        console.log(err)
    }
}

const gettestname=async(req,res)=>{
    try{
        const getingtestname=await questionsdb.find({})
        const tesstname=await aidb.find({})

        const merged=[...getingtestname,...tesstname]

        res.status(200).json(merged)
    }
    catch(err){
        console.log(err)
    }
}

const usertestname=async(req,res)=>{
    try{
        const {testname}=req.params
        const getusertest=await questionsdb.find({testname})
        const getaitest=await aidb.find({testname})

        const merged=[...getusertest,...getaitest]

        res.status(200).json(merged)
    }catch(err){
        console.log(err)
    }
}

const addingscore=async(req,res)=>{
    try{
        const data=req.body
        const addscore=await scoredb.create(data)
        res.status(200).json(addscore)
    }
    catch(err){
        console.log(err)
    }
}

const addingai=async(req,res)=>{
    try{
        const payload=req.body
        const ai=await aidb.insertMany(payload)
        res.status(200).json({ai})
    }
    catch(err){
        console.log(err)
    }
}




module.exports={
    quizquesopt,getquest,gettestname,usertestname,addingscore,addingai,
    userdbadding,userauth,Proctedroute,Userdetails
}