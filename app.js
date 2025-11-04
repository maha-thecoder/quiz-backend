const express=require('express')
const app=express()
const cors = require('cors');
const {mongodb}=require('./dbconnect/mongodb')
const port=process.env.PORT||4000


const controller=require('./controller/control')





const allowedOrigins = [
  'http://localhost:5173',
  'https://quiz-indol-six.vercel.app'  // ✅ no trailing slash!
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);  // 👈 log unallowed origins
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE',"PATCH"],
  credentials: true
}));

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('welcome dude')
})

app.use('/api/v1/quizopt',controller)

const start=async()=>{
    try{
        await mongodb()
        app.listen(port,'0.0.0.0',()=>{
            console.log('port is running on 4000')

        })
    }
    catch{
        console.log('something went wrong please try again')
    }
}

start()