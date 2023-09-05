const express = require('express')
require('dotenv').config()
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')

//express app
const app = express()

//middleware for logging info
app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})
//can get access to the req body (middleware)
app.use(express.json())

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{     //get port from .env file
    console.log('Connectd to DB & listening on port',process.env.PORT)
    })
  })
  .catch((err)=>{
    console.log(err)
  })

//-----routes------
app.get('/',(req,res)=>{
  res.json({mssg: 'Welcome to the app'})
})

app.use('/api/workouts',workoutRoutes)
//-----routes------


