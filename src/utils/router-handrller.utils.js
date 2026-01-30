
import {globalhandelrMW} from '../Middleware/error-handeller.middleware.js'


import {rateLimit}from 'express-rate-limit'

import authRoterUserController from '../Modules/Auth/auth-user/auth-user.controller.js'
import taskRouterController from '../Modules/task/task.controller.js'
const limit=rateLimit({
    windowMs:1*60*1000,
    limit:5,
    message:'to many request,, please try again later',
    legacyHeaders:false
})

const routerhandellar=(app)=>{
    app.use(limit)
    app.use('/auth-user',authRoterUserController)
    app.use('/task',taskRouterController)

    app.get('/',async(req,res)=>{res.status(200).json({message:"app work done"})})






    app.use(globalhandelrMW)
}


export default routerhandellar