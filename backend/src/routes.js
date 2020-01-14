const {Router}=require('express')
const DevController=require('./controller/DevController')
const SeachController=require('./controller/SeachController')

const routes=Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

routes.get('/search', SeachController.index)

module.exports=routes