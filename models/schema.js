const mongoose=require('mongoose')
const bcrypt=require('bcrypt')











const Userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmPassword:String,
    termsAccepted:Boolean,
    noquizattempted:Number,
    attemptedquiz:[String],
    createdAt:{type:Date,
    default:Date.now
    }
    
});



Userschema.pre("save",async function (next){
    if(!this.isModified("password")) return next(); 

    this.password=await bcrypt.hash(this.password,10);
    this.confirmPassword=await bcrypt.hash(this.confirmPassword,10)
    next()


})

const Userdb=mongoose.model('Userdb',Userschema)


const userbio=new mongoose.Schema({
    userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Userdb",
    required: true 
  },
    
    userbioattempt:[
        {
    attemptedquiz:String,
    isquizattempt:Boolean,
    marksobtain:Number,
    maxmarks:Number,
    noofattempt:Number,
    attemptedate:{type:Date,
        default:Date.now
    }
    }

    ]




})

const userattemptbiodb=mongoose.model('userattemptbiodb',userbio)





const questionschema=new mongoose.Schema({
    time:Number,
    testname:String,
    subject:[String],
    maxmarks:Number,
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
    maxmarks:Number,
    subject:[String],
    time:Number,
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
module.exports={questionsdb,scoredb,aidb,Userdb,userattemptbiodb}