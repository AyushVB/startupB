import customerService from './customer.service.js'

class customerController{
    static create=async (req,res)=>{
        try {
            const jsonData = JSON.parse(req.body);
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
            else if(typeof(req.body.user_id)!="undefined"){
                res.status(400).send({"status":"failed","message":"user_id is not updatable value..."})
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
    static getDetailProfile=async (req,res)=>{
        if(!req.query.customer_no){
            res.status(200).send({"status":"Failed","message":"customer no. needs for identify for getting detail profile...."})
        }
        
        else{
            customerService.dynamicFilter({customer_no:req.query.customer_no},(err,results)=>{
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
                    customerService.getDetailProfile(req.query.customer_no,(err,results)=>{
                        if(err){
                            return res.status(403).json({
                                success:0,
                                message:"Database connection error",
                                error:err
                            })
                        }
                        results={
                            "customer_no":results[0][0].customer_no,
                            "customer_name":results[0][0].customer_name,
                            "address_line_1":results[0][0].address_line_1,
                            "address_line_2":results[0][0].address_line_2,
                            "city":results[0][0].city,
                            "state":results[0][0].state,
                            "pin_code":results[0][0].pin_code,
                            "office_landline_1":results[0][0].office_landline_1,
                            "office_landline_2":results[0][0].office_landline_2,
                            "fax":results[0][0].fax,
                            "mobile":results[0][0].mobile,
                            "email_id":results[0][0].email_id,
                            "website":results[0][0].website,
                            "contact_person_1_name":results[0][0].contact_person_1_name,
                            "contact_person_1_designation":results[0][0].contact_person_1_designation,
                            "contact_person_1_email":results[0][0].contact_person_1_email,
                            "contact_person_2_name":results[0][0].contact_person_2_name,
                            "contact_person_2_designation":results[0][0].contact_person_2_designation,
                            "contact_person_2_email":results[0][0].contact_person_2_email,
                            "mnc":results[0][0].mnc,
                            "sector":results[0][0].sector,
                            "tax_GST_no":results[0][0].tax_GST_no,
                            "tax_PAN_no":results[0][0].tax_PAN_no,
                            "tax_CIN":results[0][0].tax_CIN,
                            "user_id":results[0][0].user_id,
                            "DC":results[1],
                            "GNR":results[2]
                        }
                        res.status(200).send({"status":"Success","Detail Customer Profile":results})
                    })
                }     
            })
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