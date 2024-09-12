//import mongoose
const mongoose=require('mongoose')

//add connection from dotenv file
const DB=process.env.DATABASE

//connect code 
mongoose.connect(DB).then(()=>{
    console.log('Database connection established'); 
}).catch((err)=>{
    console.log('Error in connecting mongoDB',err)
})