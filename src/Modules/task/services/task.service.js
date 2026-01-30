
import { logActions } from "../../../constants/constants.js"
import logModel from "../../../DB/models/logs.model.js"
import taskModel from "../../../DB/models/task.model.js"
import userModel from "../../../DB/models/user.models.js"
import { Op } from "sequelize"



export const createTask=async(req,res)=>{
    const {id:user_id}=req.loggedinuser
    const {title,description,dueDate}=req.body
    const user=await userModel.findByPk(user_id)
    if(!user){
        return res.status(404).json({message:'user not found'})
    }


    const newTask=new taskModel({
        title,
        description,
        dueDate,
        user_id
    })
    await newTask.save()

    const newlog=new logModel({
        action:logActions.CREATE_TASK,
        targetType:'task',
        description:`craete task: ${newTask.title}`,
        targetId:newTask.id,
        user_id,
        task_id:newTask.id
    })
    await newlog.save()
    return res.status(201).json({
        message: 'Task created successfully',
        task: {
            id: newTask.id,
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
            dueDate: newTask.dueDate
        }
    });
}





export const getAllTasks = async (req, res) => {
    const { id: user_id } = req.loggedinuser;

    const { status, dueDate } = req.query;

    const query = {
        where: { user_id },
        order: [['createdAt', 'DESC']]
    };


    if (status) {
        query.where.status = status.toUpperCase();
    }
    if (dueDate) {
        query.where.dueDate = {
            [Op.lte]: new Date(dueDate)
        };
    }
    console.log(query)
    const tasks = await taskModel.findAll({
        ...query,
        attributes:{exclude:['user_id','createdAt','updatedAt']}
    });
    return res.status(200).json({
        message: 'Tasks fetched successfully',
        tasks
    });
};




export const getSingleTask = async (req, res) => {

    const { id: user_id } = req.loggedinuser;


    const { id: taskId } = req.params;
    const task = await taskModel.findOne({
        where: { id: taskId, user_id },
        attributes: { exclude: ['user_id','createdAt','updatedAt'] } 
    });

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({
        message: 'Task fetched successfully',
        task
    });

};



export const updateTask = async (req, res) => {
    const { id: user_id } = req.loggedinuser;
    const { id: taskId } = req.params;
    const { title, description, status, dueDate } = req.body;


    const task = await taskModel.findOne({
        where: { id: taskId, user_id }
    });

    if (!task) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    await logModel.create({
        action: logActions.UPDATE_TASK,
        description: `Updated task: ${task.title}`,
        targetType: 'Task',
        targetId: task.id,
        user_id,
        task_id:taskId
    });

    return res.status(200).json({
        message: 'Task updated successfully',
        task
    });

};

export const deleteTask = async (req, res) => {
        const { id: user_id } = req.loggedinuser;
        const { id: taskId } = req.params;

        const task = await taskModel.findOne({
            where: { id: taskId, user_id }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        

        await logModel.create({
            action: logActions.DELETE_TASK,
            description: `Deleted task: ${task.title}`,
            targetType: 'Task',
            targetId: task.id,
            user_id,
            task_id:task.id
        });
        await task.destroy();
        return res.status(200).json({ message: 'Task deleted successfully' });
};

