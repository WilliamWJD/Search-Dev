const express=require('express')
const mongoose=require('mongoose')

require('dotenv').config()

const server=express()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-onnlg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const port=process.env.SERVER_PORT

server.listen(port,()=>{
    console.log(`Servidor online na porta ${port}`)
})