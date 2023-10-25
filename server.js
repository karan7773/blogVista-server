const express= require('express')
const mongoose=require('mongoose')
const router=require('./router/router')
const cookieParser=require('cookie-parser')
const bodyParser = require('body-parser');

const dotenv=require('dotenv')
dotenv.config()

const port=process.env.PORT
const db=process.env.MONGO_URL

const app=express();

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
app.use('/',router)
//connect to database
mongoose.connect(db).then(()=>{
    app.listen(port,()=>{
        console.log('connected');
    })
})