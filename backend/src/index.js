const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const routes=require('./routes')

require('dotenv').config()

const server=express()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-onnlg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

server.use(cors())
server.use(express.json())
server.use(routes)

const port=process.env.SERVER_PORT

server.listen(port,()=>{
    console.log(`Servidor online na porta ${port}`)
})