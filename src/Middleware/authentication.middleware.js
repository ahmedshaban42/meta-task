import jwt from 'jsonwebtoken'
import blacklistmodel from '../DB/models/blacklist.model.js'
import userModel from '../DB/models/user.models.js';





export const authenticationMiddleware=()=>{
    return async(req,res,next)=>{

        const authHeader = req.headers.authorization;
        const accesstoken = authHeader && authHeader.split(' ')[1];
        //console.log(req)

            if(!accesstoken){
                return res.status(400).json({message:'plasse enter access token'})
            }
            const decodeddata=jwt.verify(accesstoken,process.env.JWT_ACCESS_TOKEN_SECRETKEY_LOGIN)

            const isblacklistedtoken=await blacklistmodel.findOne({where:{tokenid:decodeddata.jti}})

            if(isblacklistedtoken){
                return res.status(400).json({message:'plasse login frist'})
            }

            let user;
            if (decodeddata.role === "user") {
                user = await userModel.findByPk(decodeddata.id);
            }else {
                return res.status(401).json({ message: "invalid role in token" });
            }

            req.loggedinuser=user
            //req.loggedinuser.token={tokenid:decodeddata.jti,expirydata:decodeddata.exp}
            req.userToken={tokenid:decodeddata.jti,expirydata:decodeddata.exp}
            next()
        
    }
}

export const authorizationMiddleware = (allowRoles) => {
    return async (req, res, next) => {
        const { role } = req.loggedinuser;
        console.log(role)

        if (!allowRoles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized' });
        }

        next();
    }
};

