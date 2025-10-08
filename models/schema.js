const mongoose=require('mongoose')
const bcrypt=require('bcrypt')











const Userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmPassword:String,
    termsAccepted:Boolean,
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
module.exports={questionsdb,scoredb,aidb,Userdb}