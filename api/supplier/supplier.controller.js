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
    static dynamicFilter=async (req,res)=>{
        try {
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