import supplierService from './supplier.service.js'

class supplierController{
    static create=async (req,res)=>{
        try {
            if(req.body.pin_code && !Number.isInteger(req.body.pin_code)){
                res.status(200).send({"status":"Failed","message":"pincode needs to be a integer...."})
            }
            else if(req.body.mnc &&( !Number.isInteger(req.body.mnc)|| !(req.body.mnc==0 || req.body.mnc==1))){
                res.status(200).send({"status":"Failed","message":"mnc value needs to be a boolean(1 OR 0)...."})
            }
            else{
                supplierService.insert(req.user.user_id,req.body,(err,results)=>{
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
            res.send({"status":"failed","message":"Unable to create supplier profile...."})
        }
        
    }
    static update=async (req,res)=>{
        try {
            if(!req.body.supplier_no){
                res.status(200).send({"status":"Failed","message":"supplier no. needs for identify which supplier to be updated ...."})
            }
            else if( !Number.isInteger(req.body.supplier_no)){
                res.status(200).send({"status":"Failed","message":"supplier no. needs to be a integer...."})
            }
            else{
                supplierService.dynamicFilter({supplier_no:req.body.supplier_no.toString()},(err,results)=>{
                    if(err){
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error"
                        })
                    }
                    else if(!results.length){
                        res.status(200).send({"status":"Failed","message":"supplier_no is incorrect...."})
                    } 
                    else if(req.body.pin_code && !Number.isInteger(req.body.pin_code)){
                        res.status(200).send({"status":"Failed","message":"pincode needs to be a integer...."})
                    }
                    else if((req.body.mnc && !Number.isInteger(req.body.mnc))||(req.body.mnc&&!(req.body.mnc==0 || req.body.mnc==1))){
                        res.status(200).send({"status":"Failed","message":"mnc value needs to be a boolean(1 OR 0)...."})
                    }
                    else{
                        const supplier_no=req.body.supplier_no
                        delete req.body.supplier_no
                        supplierService.updateBySNo(supplier_no,req.body,(err,results)=>{
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
            res.send({"status":"failed","message":"Unable to update supplier profile...."})
        }           
    }
    static delete=async (req,res)=>{
        try {
            if(!req.query.supplier_no){
                res.status(200).send({"status":"Failed","message":"supplier no. needs for identify which supplier to be updated ...."})
            } 
            else{
                supplierService.dynamicFilter({supplier_no:req.query.supplier_no.toString()},(err,results)=>{
                    if(err){
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error"
                        })
                    }
                    else if(!results.length){
                        res.status(200).send({"status":"Failed","message":"supplier_no is incorrect...."})
                    }
                    else{
                        supplierService.deleteSupplier(req.query.supplier_no,(err,results)=>{
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
            res.status(400).send({"status":"failed","message":"Unable to delete supplier..."})
        }            
    }
    static getAllProfile=async (req,res)=>{
        try {
            supplierService.getAllProfiles((err,results)=>{
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
            res.send({"status":"failed","message":"Unable to get all supplier profiles...."})            
        }        
    }
    static getDetailProfile=async (req,res)=>{
        if(!req.query.supplier_no){
            res.status(200).send({"status":"Failed","message":"supplier no. needs for identify for getting detail profile...."})
        }
        
        else{
            supplierService.dynamicFilter({supplier_no:req.query.supplier_no},(err,results)=>{
                if(err){
                    return res.status(500).json({
                        success:0,
                        message:"Database connection error"
                    })
                }
                else if(!results.length){
                    res.status(200).send({"status":"Failed","message":"supplier_no is incorrect...."})
                }
                else{
                    supplierService.getDetailProfile(req.query.supplier_no,(err,results)=>{
                        if(err){
                            return res.status(403).json({
                                success:0,
                                message:"Database connection error",
                                error:err
                            })
                        }
                        results={
                            "supplier_no":results[0][0].supplier_no,
                            "supplier_name":results[0][0].supplier_name,
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
                            "bank_account_name":results[0][0].bank_account_name,
                            "bank_name":results[0][0].bank_name,
                            "bank_account_no":results[0][0].bank_account_no,
                            "bank_ifsc":results[0][0].bank_ifsc,
                            "bank_address":results[0][0].bank_address,
                            "user_id":results[0][0].user_id,
                            "supplier purchase order":results[1]
                        }
                        res.status(200).send({"status":"Success","Detail Supplier Profile":results})
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
            supplierService.dynamicFilter(req.query,(err,results)=>{
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
            res.send({"status":"failed","message":"Unable to dynamic filter supplier profiles...."})
        }            
    }
}

export default supplierController;