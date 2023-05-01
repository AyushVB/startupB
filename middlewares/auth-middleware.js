import jwt from 'jsonwebtoken'
import userService from "../api/user/user.service.js"

const checkUserAuth= async(req,res,next)=>{
    try {
        const { authorization }=req.headers
        if(!(authorization && authorization.startsWith('Bearer'))){
            res.status(401).send({"status":"failed","message":"Unauthorized user"})
        }
        else {
            const token=await authorization.split(' ')[1]
             
            // verify token
            jwt.verify(token,process.env.JWT_SECRET_KEY,async (err,user)=>{
                if (err) {
                    return res.status(403).send({"status":"failed","message":"Authentication refused"})
                }
                userService.findById(user.userID,(err,results)=>{
                    if(err){
                        console.log(err);
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error"
                        })
                    }
                    if(results.length==0){
                        return res.send({"status":"failed","message":"Failed to authenticate  ...."}) 
                    }
                    delete results[0].password
                    req.user=results[0];
                    next();
                })
            })
        }         
    } catch (error) {
        console.log(error)
        res.send({"status":"failed","message":"Failed to authenticate  ...."}) 
    }
      
}

export default checkUserAuth
