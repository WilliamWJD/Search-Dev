const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray=require('../utils/parseStringAsArray')

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
        }
        res.json(dev)
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
    
}