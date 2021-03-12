const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors = require('cors')
const router=require("./Routes/Routing")

mongoose.connect("mongodb+srv://subrao:9960261374@cluster0.vrsny.mongodb.net/Login?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true}, ()=>console.log("connected to database"))

app.use(express.json())
app.use(cors())
app.use("/app/api",router)

app.listen(9000,()=>console.log("server is up and running"))
