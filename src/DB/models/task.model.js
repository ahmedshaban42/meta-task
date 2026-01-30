import { DataTypes, Model } from "sequelize";
import { sequelizeconfig } from '../conection.js';
import userModel from './user.models.js'; 
import {taskStatus}from '../../constants/constants.js'

class taskModel extends Model {}

taskModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Task title is required' }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM(...Object.values(taskStatus)),
        allowNull: false,
        defaultValue: taskStatus.PENDING
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue:null,
        validate: {
            isDate: { msg: 'Due date must be a valid date' },
            isAfterToday(value) {
                if (value && new Date(value) < new Date()) {
                    throw new Error('Due date must be in the future');
                }
            }
        }
    },
}, {
    sequelize: sequelizeconfig,
    tableName: 'tbl_tasks', 
    timestamps: true,
    freezeTableName: true
});

userModel.hasMany(taskModel,{
    foreignKey:'user_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
    as:'taskData'
})
taskModel.belongsTo(userModel,{
    foreignKey:'user_id',
    as:'userData'
})



export default taskModel;
