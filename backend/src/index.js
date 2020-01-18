const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const http=require('http')
const routes=require('./routes')
const {setupWebsocket}=require('./websocket')

require('dotenv').config()

const app=express()
const server=http.Server(app)

setupWebsocket(server)

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-onnlg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use(cors())
app.use(express.json())
app.use(routes)

const port=process.env.SERVER_PORT

server.listen(port,()=>{
    console.log(`Servidor online na porta ${port}`)
})