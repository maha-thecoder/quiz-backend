const express=require('express')
const app=express()
const cors = require('cors');
const {mongodb}=require('./dbconnect/mongodb')
const port=4000

const controller=require('./controller/control')




app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173','https://quiz-indol-six.vercel.app/'], // your React app’s URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/',(req,res)=>{
    res.send('welcome dude')
})

app.use('/api/v1/quizopt',controller)

const start=async()=>{
    try{
        await mongodb()
        app.listen(4000,'0.0.0.0',()=>{
            console.log('port is running on 4000')

        })
    }
    catch{
        console.log('something went wrong please try again')
    }
}

start()