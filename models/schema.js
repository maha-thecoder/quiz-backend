const mongoose=require('mongoose')


const questionschema=new mongoose.Schema({
    time:Number,
    testname:String,
    subject:[String],
    questions:[{
    question:String,
    opt:[String],
    ans:String}
    ]

})

const questionsdb=mongoose.model('questionsdb',questionschema)

const scoreschema=new mongoose.Schema({
    score:Number
})

const scoredb=mongoose.model("scoredb",scoreschema)


const aischema=new mongoose.Schema({
    testname:String,
     questions :
     [
        {
            
            question:String,
            id:Number,
            opt:[String],
            ans:String
        }
    ]
})

const aidb =mongoose.model('aidb',aischema)
module.exports={questionsdb,scoredb,aidb}