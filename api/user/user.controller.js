import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import transporter from "../../config/emailConfig.js"
import dotenv from 'dotenv'
import userService from './user.service.js';

dotenv.config()

class userController{
    static userRegistration=async (req,res)=>{
        try {
            const {name,email,password}=req.body 
            userService.findOne(email,async (err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message:"Database connection error"
                    })
                } 
                else if(results.length!=0){
                    res.send({"status":"failed","message":"Email already exists"})
                }
                else if(!(name && email && password )){
                    res.send({"status":"failed","message":"All fields are required"})
                }
                else{
                        const salt=await bcrypt.genSalt(12)
                        const hashPassword=await bcrypt.hash(password,salt)
                        req.body.password=hashPassword;
                        userService.insert(req.body,(err,results)=>{
                            if(err){
                                console.log(err);
                                return res.status(500).json({
                                    success:0,
                                    message:"Database connection error"
                                })
                            }
                            // JWT create
                            userService.findOne(email,(err,results)=>{
                                if(err){
                                    console.log(err);
                                    return res.status(500).json({
                                        success:0,
                                        message:"Database connection error"
                                    })
                                }
                                const token=jwt.sign({userID:results[0].user_id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                                res.status(201).send({"status":"Success","message":"registeration sucessfully....","token":token})
                            })
                        })
                }      
            })
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to register...."})    
        }         
    } 
    static userLogin=async (req,res)=>{
        try {
            const{email,password}=req.body
            userService.findOne(email,async(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message:"Database connection error"
                    })
                }
                else if(results.length==0){
                    res.status(400).send({"status":"failed","message":"You are not register user.."})
                }
                else if(!(email && password)){
                    res.send({"status":"failed","message":"All fields are required"})   
                }
                else{
                    const ismatch=await bcrypt.compare(password,results[0].password)
                    if(!ismatch){ 
                        res.status(400).send({"status":"failed","message":"Email or Password is invalid"})       
                    }
                    else{
                        // JWT create
                        const token=jwt.sign({userID:results[0].user_id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                        res.send({"status":"success","message":"login successfully...","token":token})     
                    }     
                } 
            })
        }
        catch (error) {
            console.log(error)
            res.status(400).send({"status":"failed","message":"Unable to login..."})
        }
    }    
    static changeUserPassword= async (req,res)=>{
        try {
            const {password} =req.body
            if(!(password )){
                res.send({"status":"failed","message":"password field are required"})  
            }
            else{
                const salt=await bcrypt.genSalt(10)
                const hashPassword=await bcrypt.hash(password,salt)
                userService.findByIdAndUpdate(req.user.user_id,hashPassword,(err,results)=>{
                    if(err){
                        console.log(err);
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success:1,
                        message:"password changed successfully"
                    })
                })      
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({"status":"failed","message":"Unable to change user password..."})    
        }    
    }
    static loggedUser=async (req,res)=>{
        try {
            res.send({"user":req.user})        
        } catch (error) {
            console.log(error)
            res.status(400).send({"status":"failed","message":"Unable to get logged user data..."})        
        }
        
    }
    static sendUserPasswordResetEmail=async (req,res)=>{
        try {
            const{email}=req.body
            if(!email){
                return res.send({"status":"failed","message":"email field is required..."})
            }
            userService.findOne(email,(err,results)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({
                        success:0,
                        message:"Database connection error"
                    })
                }
                else if(results.length==0){
                    res.send({"status":"failed","message":"email doesnt exists"})        
                }
                else{
                    const secret=results[0].user_id+process.env.JWT_SECRET_KEY
                    const token=jwt.sign({userID:results[0].user_id},secret,{expiresIn:'15m'})
                    const link=`http://localhost:3000/api/user/reset/${results[0].user_id}/${token}`
                    // sent email 
                    const info=transporter.sendMail({
                        from:process.env.EMAIL_FROM,
                        to:results[0].email,
                        subject:"API-Password Reset Link",
                        html:`<a href=${link}>click here</a>to reset your password`
                    })
                    res.send({"status":"success","message":"password reset email is sent....please check email.. ","info":info})
                }  
            })        
        } catch (error) {
            console.log(error)
            res.status(400).send({"status":"failed","message":"Unable to send user password reset email..."})   
        }     
    } 
    static userpasswordReset=async (req,res)=>{
        try {
            const{password}=req.body
            const{id,token}=req.params
            userService.findById(id,async(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message:"Database connection error"
                    })
                }
                else{
                    const secret=results[0].user_id+process.env.JWT_SECRET_KEY
                    try {
                        jwt.verify(token,secret)
                        if(!(password )){
                             res.send({"status":"failed","message":"All fields are required"})
                        }
                        else{
                            const salt=await bcrypt.genSalt(10)
                            const hashPassword=await bcrypt.hash(password,salt)
                            userService.findByIdAndUpdate(results[0].user_id,hashPassword,(err,results)=>{
                                if(err){
                                    console.log(err);
                                    return res.status(500).json({
                                        success:0,
                                        message:"Database connection error"
                                    })
                                }
                                res.send({"status":"success","message":"password reset successfully..."})
                            })
                        }
                    } catch (error) {
                        console.log(error)
                        return res.send({"status":"failed","message":"Invalid token"}) 
                    }
                } 
            })     
        } catch (error) {
            console.log(error)
            return res.send({"status":"failed","message":"Unable to reset userpassword "}) 
        }    
    }
}

export default userController;