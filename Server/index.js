//import dotenv
require('dotenv').config()

// import express
const express=require('express')

//Import cors
const cors=require('cors')
const router = require('./Routes/router')

// create server
const server=express()

// require conncetion.js file
require('./connection')

// import router
require('./Routes/router')

// declare port
const PORT=5000;

// use cors
server.use(cors())
server.use(express.json())
server.use(router)

// Run server
server.listen(PORT,()=>{
   console.log(`Server listing on Port ${PORT}`);  
})

// define routes
server.get('/',(req,res)=>{
    res.status(200).json('Ecommerce Started working')
})