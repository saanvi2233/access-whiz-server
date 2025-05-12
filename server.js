const express=require('express')
const cors=require('cors')
const app=express()

const analyzeRouter=require('./routes/analyze') //importing the analyze route
require('dotenv').config()  //to load the environmnet varibale


app.use(cors()) //to allow cross-origin requests
app.use(express.json()) //to parse json data
app.use('/analyze',analyzeRouter) //to use the analyze route

app.get('/',(req,res)=>{
    res.send('Hello from server!!')
})

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})