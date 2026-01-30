import { Router } from "express";

const taskRouter=Router()
import { validationMW } from "../../Middleware/validation.middleware.js";
import {authenticationMiddleware,authorizationMiddleware}from '../../Middleware/authentication.middleware.js'
import { errorHandler } from "../../Middleware/error-handeller.middleware.js";
import { createTask,getAllTasks,getSingleTask,updateTask,deleteTask } from "./services/task.service.js";
import { createTaskSchema,getAllTasksSchema,getSingleTaskSchema,updateTaskSchema,deleteTaskSchema } from "../../validation/task.schema.js";

taskRouter.post('/create-task',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware('user')),
    errorHandler(validationMW(createTaskSchema)),
    errorHandler(createTask)
)



taskRouter.get('/tasks',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware('user')),
    errorHandler(validationMW(getAllTasksSchema)),
    errorHandler(getAllTasks)
)


taskRouter.get('/SingleTask/:id',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware('user')),
    errorHandler(validationMW(getSingleTaskSchema)),
    errorHandler(getSingleTask)
)

taskRouter.patch('/update-task/:id',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware('user')),
    errorHandler(validationMW(updateTaskSchema)),
    errorHandler(updateTask)
)

taskRouter.delete('/delete-task/:id',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware('user')),
    errorHandler(validationMW(deleteTaskSchema)),
    errorHandler(deleteTask)
)

export default taskRouter