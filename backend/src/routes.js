const {Router}=require('express')
const DevController=require('./controller/DevController')
const SeachController=require('./controller/SeachController')

const routes=Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.put('/devs/:dev_id', DevController.update)
routes.delete('/devs/:dev_id', DevController.destroy)

routes.get('/search', SeachController.index)

module.exports=routes