import { DataTypes,Model } from "sequelize";
import {sequelizeconfig} from '../conection.js'
import { roles,gender } from "../../constants/constants.js";

class userModel extends Model{}
userModel.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:'idx_email_username_unique',
        allowNull:false,
        validate:{
            isEmail:{
                msg: 'Invalid email format'
            },
            notEmpty: {
                msg: 'Email is required'
            }
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            checkPasswordLength(value){
                if(value.length<8){
                    throw new Error('Password must be longer than or equel 8 characters')
                }
            }
        }
    },
    role: {
        type: DataTypes.ENUM(...Object.values(roles)),
        allowNull: false,
        defaultValue: roles.USER
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DOB: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM(...Object.values(gender)), 
        allowNull: false
    },
    confirmotp:{
        type:DataTypes.STRING,
        allowNull:true
    },
    otpExpiresAt:{
        type:DataTypes.DATE,
        allowNull:true
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
},{
    sequelize:sequelizeconfig,
    modelName:'tbl_users',
    timestamps:true,
    freezeTableName:true,
})

export default userModel