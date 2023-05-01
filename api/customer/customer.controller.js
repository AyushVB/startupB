import customerService from './customer.service.js'

class customerController{
    static create=async (req,res)=>{
        try {
            if(req.body.pin_code && !Number.isInteger(req.body.pin_code)){
                res.status(200).send({"status":"Failed","message":"pincode needs to be a integer...."})
            }
            else if(req.body.mnc && (!Number.isInteger(req.body.mnc)|| !(req.body.mnc==0 || req.body.mnc==1))){
                res.status(200).send({"status":"Failed","message":"mnc value needs to be a boolean(1 OR 0)...."})
            }
            else{
                customerService.insert(req.user.user_id,req.body,(err,results)=>{
                    if(err){
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error"
                        })
                    }
                    res.status(201).send({"status":"Success","message":"profile created...."})
                })
            }         
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to create customer profile...."})            
        }
    }
    static update=async (req,res)=>{
        try {
            if(!req.body.customer_no){
                res.status(200).send({"status":"Failed","message":"customer no. needs for identify which customer to be updated ...."})
            }
            else if( !Number.isInteger(req.body.customer_no)){
                res.status(200).send({"status":"Failed","message":"customer no. needs to be a integer...."})
            }
            else{
                customerService.dynamicFilter({customer_no:req.body.customer_no.toString()},(err,results)=>{
                    if(err){
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error"
                        })
                    }
                    else if(!results.length){
                        res.status(200).send({"status":"Failed","message":"customer_no is incorrect...."})
                    } 
                    else if(req.body.pin_code && !Number.isInteger(req.body.pin_code)){
                        res.status(200).send({"status":"Failed","message":"pincode needs to be a integer...."})
                    }
                    else if(req.body.mnc && (!Number.isInteger(req.body.mnc)|| !(req.body.mnc==0 || req.body.mnc==1))){
                        res.status(200).send({"status":"Failed","message":"mnc value needs to be a boolean(1 OR 0)...."})
                    }
                    else{
                        const customer_no=req.body.customer_no
                        delete req.body.customer_no
                        customerService.updateByCNo(customer_no,req.body,(err,results)=>{
                            if(err){
                                return res.status(500).json({
                                    success:0,
                                    message:"Database connection error",
                                    error:err
                                })
                            }
                            res.status(200).send({"status":"Success","message":"profile updated...."})
                        })
                    }
                })
            }    
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to update customer profile...."})            
        }    
    }
    static delete=async (req,res)=>{
        try {
            if(!req.query.customer_no){
                res.status(200).send({"status":"Failed","message":"customer no. needs for identify which customer to be updated ...."})
            } 
            else{
                customerService.dynamicFilter({customer_no:req.query.customer_no.toString()},(err,results)=>{
                    if(err){
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error"
                        })
                    }
                    else if(!results.length){
                        res.status(200).send({"status":"Failed","message":"customer_no is incorrect...."})
                    }
                    else{
                        customerService.deleteCustomer(req.query.customer_no,(err,results)=>{
                            if(err){
                                return res.status(500).json({
                                    success:0,
                                    message:"Database connection error",
                                    error:err
                                })
                            }
                            res.status(200).send({"status":"Success","message":"profile deleted...."})
                        })
                    } 
                })      
            }      
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to delete customer profile...."})            
        }     
    }
    static getAllProfile=async (req,res)=>{
        try {
            customerService.getAllProfiles((err,results)=>{
                if(err){
                    return res.status(500).json({
                        success:0,
                        message:"Database connection error",
                        error:err
                    })
                }
                res.status(200).send({"status":"Success","no of results":results.length,"results":results})
            })    
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to get all customer profiles...."})
        }   
    }
    static dynamicFilter=async (req,res)=>{    
        try {
            for (const key in req.query) {
                if(req.query[key].length==0){
                    res.status(400).send({"status":"failed","message":`Given ${key} is undefined...`})
                }
            }
            customerService.dynamicFilter(req.query,(err,results)=>{
                if(err){
                    return res.status(500).json({
                        success:0,
                        message:"Database connection error",
                        error:err
                    })
                }
                res.status(200).send({"status":"Success","no of results":results.length,"results":results})
            })            
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to dynamic filter customer profiles...."})
        }
        
    }    
}

export default customerController;