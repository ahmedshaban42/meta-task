import express from 'express'
import { connection } from './DB/conection.js'
//import cors from "cors"
import path from 'path'
import { config } from 'dotenv'
config({path:path.resolve(`src/config/.${process.env.NODE_ENV}.env`)})
console.log(path.resolve(`src/config/.${process.env.NODE_ENV}.env`))
import routerhandellar from './utils/router-handrller.utils.js'


import userModel from './DB/models/user.models.js'
import taskModel from './DB/models/task.model.js'
import logModel from './DB/models/logs.model.js'


const bootstrab=()=>{
    const app=express()
    const port=process.env.PORT

    connection()
    userModel
    taskModel
    logModel


    app.use(express.json())

    routerhandellar(app)



    app.listen(process.env.PORT,()=>{
        console.log(`server work in port ${port} successfuly` )
    })
}
export default bootstrab