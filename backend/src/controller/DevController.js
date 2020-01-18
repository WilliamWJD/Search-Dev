const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray=require('../utils/parseStringAsArray')

const {findConnections ,sendMessage}=require('../websocket')

module.exports = {
    async index(req,res){
        let devs=await Dev.find()
        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = response.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username, name, avatar_url, bio, techs: techsArray, location
            })

            //FILTRAR AS CONEXÕES QUE ESTÃO A NO MÁXIMO 10KM DE DISTÂNCIA
            //E QUE O NOVO DEV TENHA PELO MENOS UMA DAS TECNOLOGIAS FILTRADAS
            const sendSocketMessageTo=findConnections(
                {latitude,longitude}, 
                techsArray
            )
            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }
        return res.json(dev)
    },

    async update(req,res){
        const {techs, latitude, longitude}=req.body
        const {dev_id}=req.params

        let dev=await Dev.findOne({_id:dev_id})

        if(!dev){
            return res.status(401).json({error:'Dev not found'})
        }

        const techsArray=parseStringAsArray(techs)

        const location={
            type:'Point',
            coordinates:[longitude, latitude]
        }

        await dev.update({
            techs:techsArray, location
        })

        return res.json(dev)
    },

    async destroy(req,res){
        const {dev_id}=req.params

        const dev=await Dev.findById({_id:dev_id})

        if(!dev){
            return res.status(401).json({error:'Dev not found'})
        }

        await dev.delete()

        return res.json({message:'Dev exclused succefull'})
    }
    
}