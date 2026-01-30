import { DataTypes, Model } from "sequelize";
import { sequelizeconfig } from '../conection.js';
import userModel from './user.models.js'
import taskModel from "./task.model.js";
import { logActions } from "../../constants/constants.js";
class logModel extends Model {}
logModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    action: {
        type: DataTypes.ENUM(...Object.values(logActions)),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    targetType: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    targetId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
},{
    sequelize: sequelizeconfig,
    tableName: 'tbl_logs',
    timestamps: true,
    freezeTableName: true
})


//user
logModel.belongsTo(userModel,{
    foreignKey:'user_id',
    as:'userData'
})
userModel.hasMany(logModel,{
    foreignKey:'user_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
    as:'logData'
})

//task
logModel.belongsTo(taskModel,{
    foreignKey:'task_id',
    as:'taskData'
})








export default logModel