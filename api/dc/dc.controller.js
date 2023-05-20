import dcService from "./dc.service.js"
// [dc_challan_no, dc_date ,c_no ,delivered_by ,customer_receiver_name ,attached_scanned_document ,transport_amount ,no_of_laptops ,laptops]
class dcController{
    static create=async (req,res)=>{
        if(!(req.body.dc_challan_no && req.body.dc_date && req.body.c_no && req.body.delivered_by && req.body.customer_receiver_name && req.body.attached_scanned_document && req.body.transport_amount && req.body.no_of_laptops && req.body.laptops)){
            res.status(400).send({"status":"failed","message":"Necessary fields are required ....","Necessary fields":"dc_challan_no,dc_date,c_no,delivered_by,customer_receiver_name,attached_scanned_document,transport_amount,no_of_laptops,laptops"})
        }
        else if(await dcService.checkDCPresence(req.body.dc_challan_no)){
            res.status(400).send({"status":"failed","message":"delivery challan(dc_challan_no) already exists.."})
        }
        else if(req.body.c_no && !Number.isInteger(req.body.c_no)){
            res.status(400).send({"status":"Failed","message":"customer_no needs to be a integer...."})
        }
        else if(req.body.c_no && !await dcService.checkCustomerPresence(req.body.c_no)){
            res.status(400).send({"status":"failed","message":"customer(c_no) is not present.."})
        }
        else if(req.body.no_of_laptops!=(req.body.laptops).length){
            res.status(400).send({"status":"failed","message":"no_of_laptops is not equal to array size of laptops_serial_no  .."})
        }
        else if(req.body.no_of_laptops==0){
            res.status(400).send({"status":"failed","message":"zero laptops is present in delivery challan.."})
        }
        else if(!dcService.areAllElementsUnique(req.body.laptops)){
            res.status(400).send({"status":"failed","message":"Given laptop serial no. array contain atleast two equal laptops.."})
        }
        else{
            let found=false;
            for (let i = 0; i < req.body.no_of_laptops; i++) {
                if(!(req.body.laptops[i])){
                    res.status(400).send({"status":"failed","message":"laptop_serial_no fields is required...","laptop":i+1})
                    found=true;
                    break;
                }
                else if(!await dcService.checkLaptopPresence(req.body.laptops[i])){
                    res.status(400).send({"status":"failed","message":"laptop(laptop serial no. ) is not present in inventory...","laptop":i+1})
                    found=true;                    
                    break;
                }
                else if(!await dcService.checkLaptopAvalability(req.body.laptops[i])){
                    res.status(400).send({"status":"failed","message":"laptop is not available to give..","laptop":i+1})
                    found=true;                    
                    break;
                }
                else if((await dcService.checkLaptopStatus(req.body.laptops[i]))[0].laptop_status=="repair"){
                    res.status(400).send({"status":"failed","message":"laptop is in repairing process and not available to give..","laptop":i+1})
                    found=true;                    
                    break;
                }
            }
            if(!found){
                req.body.dc_date=new Date(req.body.dc_date)
                if(req.body.dc_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"dc_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                } 
                dcService.create(req.user.user_id,req.body,(err,results)=>{
                    if(err){
                        console.log(err)
                        return res.status(403).json({
                            success:0,
                            message:"Database connection error"
                        })
                    }
                    res.status(201).send({"status":"Success","message":"DC is created...."})
                })  
            }    
        }
    }
    static addLaptopSNo=async(req,res)=>{
        if(!(req.query.dc_challan_no &&req.query.laptop_serial_no)){
            res.status(200).send({"status":"Failed","message":"Delivery Challan no. and laptop serial no. needed...."})
        }
        else if(!await dcService.checkDCPresence(req.query.dc_challan_no)){
            res.status(400).send({"status":"failed","message":"Given delivery challan(dc_challan_no)  is not present.."})
        }
        else if(await dcService.checkLaptopInDC(req.query.dc_challan_no,req.query.laptop_serial_no)){
            res.status(400).send({"status":"failed","message":"Given Laptop is already present in delivery challan(dc_challan_no).."})
        }
        else if(!await dcService.checkLaptopAvalability(req.query.laptop_serial_no)){
            res.status(400).send({"status":"failed","message":"laptop is not available to give.."})
        }
        else if((await dcService.checkLaptopStatus(req.query.laptop_serial_no))[0].laptop_status=="repair"){
            res.status(400).send({"status":"failed","message":"laptop is in repairing process and not available to give.."})
        } 
        else{
            dcService.addLaptopSNo(req.query.dc_challan_no,req.query.laptop_serial_no,(err,results)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err.sqlMessage
                    })
                }
                res.status(200).send({"status":"Success","message":"In Delivery Challan,Given Laptop(laptop_serial_no) is added...."})
            })
        }       
    }
    static update=async (req,res)=>{
        try {
            if(!req.body.dc_challan_no){
            res.status(200).send({"status":"Failed","message":"delivery challan no. needs for identify which delivery challan need to be updated ...."})
        }
        else if(!await dcService.checkDCPresence(req.body.dc_challan_no)){
            res.status(400).send({"status":"failed","message":"delivery challan(dc_challan_no) is not present.."})
        }
        else if(req.body.c_no && !Number.isInteger(req.body.c_no)){
            res.status(400).send({"status":"Failed","message":"customer_no needs to be a integer...."})
        }
        else if(req.body.c_no && !await dcService.checkCustomerPresence(req.body.c_no)){
            res.status(400).send({"status":"failed","message":"customer(c_no) is not present.."})
        }
        else if(typeof(req.body.no_of_laptops)!="undefined"){
            res.status(400).send({"status":"failed","message":"no_of_laptops is not updatable value..."})
        }
        else if(typeof(req.body.user_id)!="undefined"){
            res.status(400).send({"status":"failed","message":"user_id is not updatable value..."})
        }
        else{
            if(req.body.dc_date){
                req.body.dc_date=new Date(req.body.dc_date)
                if(req.body.dc_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"dc_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD)...."})
                } 
            }
            const dc_challan_no=req.body.dc_challan_no
            delete req.body.dc_challan_no
            dcService.updateDC(dc_challan_no,req.body,(err,results)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error"
                    })
                }
                res.status(200).send({"status":"Success","message":"Delivery Challan updated...."})        
            })                
        }        
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to update customer profile...."})
        }        
    }        
    static delete=async (req,res)=>{ 
        if(!req.query.dc_challan_no){
            res.status(200).send({"status":"Failed","message":"Delivery Challan no. needs for identify which DC need to be delete ...."})
        }
        else if(!await dcService.checkDCPresence(req.query.dc_challan_no)){
            res.status(400).send({"status":"failed","message":"Given delivery challan(dc_challan_no)  is not present.."})
        } 
        else{
            dcService.deleteDC(req.query.dc_challan_no,(err,results)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err.sqlMessage
                    })
                }
                res.status(200).send({"status":"Success","message":"Delivery Challan deleted...."})
            })
        }             
    }
    static deleteLaptopSNo=async (req,res)=>{ 
        if(!(req.query.dc_challan_no &&req.query.laptop_serial_no)){
            res.status(200).send({"status":"Failed","message":"Delivery Challan no. and laptop serial no. needs for identify which DC laptop need to be delete ...."})
        }
        else if(!await dcService.checkDCPresence(req.query.dc_challan_no)){
            res.status(400).send({"status":"failed","message":"Given delivery challan(dc_challan_no)  is not present.."})
        }
        else if(!await dcService.checkLaptopInDC(req.query.dc_challan_no,req.query.laptop_serial_no)){
            res.status(400).send({"status":"failed","message":"Given Laptop is not present in delivery challan(dc_challan_no).."})
        } 
        else{
            dcService.deleteLaptopSNo(req.query.dc_challan_no,req.query.laptop_serial_no,(err,results)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err.sqlMessage
                    })
                }
                res.status(200).send({"status":"Success","message":"In Delivery Challan,Given Laptop(laptop_serial_no) is deleted...."})
            })
        }             
    }
    static getAllDC=async (req,res)=>{
        dcService.getAllDC((err,results)=>{
            if(err){
                return res.status(403).json({
                    success:0,
                    message:"Database connection error",
                    error:err
                })
            }
            res.status(200).send({"status":"Success","no. of results":results.length,"Delivery Challan":results})
        })       
    }
    static getDetailDC=async (req,res)=>{
        if(!req.query.dc_challan_no){
            res.status(200).send({"status":"Failed","message":"Delivery Challan no. needs for identify DC ...."})
        }
        else if(!await dcService.checkDCPresence(req.query.dc_challan_no)){
            res.status(400).send({"status":"failed","message":"Given delivery challan(dc_challan_no)  is not present.."})
        } 
        else{
            dcService.getDetailDC(req.query.dc_challan_no,(err,results)=>{
                if(err){
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err
                    })
                }
                if(results[0][0].no_of_laptops!=results[1].length){
                    res.status(400).send({"status":"failed","message":"no_of_laptops is not equal to array size of laptops_serial_no  .."})
                }
                results={
                    "dc_challan_no":results[0][0].dc_challan_no,
                    "dc_date":results[0][0].dc_date,
                    "c_no":results[0][0].c_no,
                    "delivered_by":results[0][0].delivered_by,
                    "customer_receiver_name":results[0][0].customer_receiver_name,
                    "attached_scanned_document":results[0][0].attached_scanned_document,
                    "transport_amount":results[0][0].transport_amount,
                    "note_remark":results[0][0].note_remark,
                    "user_id":results[0][0].user_id,
                    "no_of_laptops":results[0][0].no_of_laptops,
                    "laptops":results[1]
                }
                res.status(200).send({"status":"Success","Detail DC":results})
            })
        }           
    }
    static dynamicFilter=async (req,res)=>{
        for (const key in req.query) {
            if(req.query[key].length==0){
                return res.status(400).send({"status":"failed","message":`Given ${key} is undefined...`})
            }
          }
        dcService.dynamicFilter(req.query,(err,results)=>{
            if(err){
                return res.status(403).json({
                    success:0,
                    message:"Database connection error",
                    error:err
                })
            }
            res.status(200).send({"status":"Success","no. of results":results.length,"results":results})
        })        
    }
}

export default dcController;