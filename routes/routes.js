const {questionsdb,scoredb,aidb} = require('../models/schema')
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
    quizquesopt,getquest,gettestname,usertestname,addingscore,addingai
}