import gnrService from "./gnr.service.js"
// [gnr_challan_no, gnr_date ,c_no ,collection_request_date,collection_type,collected_by ,collected_date,attached_scanned_document ,transport_amount ,note_remark,no_of_laptops ,laptops]
class gnrController{
    static create=async (req,res)=>{
        if(!( req.body.gnr_challan_no && req.body.gnr_date && req.body.c_no && req.body.collection_request_date && req.body.collection_type && req.body.collected_by && req.body.collected_date && req.body.attached_scanned_document && req.body.transport_amount && req.body.no_of_laptops && req.body.laptops)){
            res.status(400).send({"status":"failed","message":"Necessary fields are required ....","Necessary fields":"gnr_challan_no ,gnr_date ,c_no ,collection_request_date ,collection_type ,collected_by ,collected_date ,attached_scanned_document ,transport_amount ,no_of_laptops ,laptops"})
        }
        else if(await gnrService.checkGNRPresence(req.body.gnr_challan_no)){
            res.status(400).send({"status":"failed","message":"good  note receipt challan(gnr_challan_no) already exists.."})
        }
        else if(req.body.c_no && !Number.isInteger(req.body.c_no)){
            res.status(400).send({"status":"Failed","message":"customer_no needs to be a integer...."})
        }
        else if(req.body.c_no && !await gnrService.checkCustomerPresence(req.body.c_no)){
            res.status(400).send({"status":"failed","message":"customer(c_no) is not present.."})
        }
        else if(req.body.no_of_laptops!=(req.body.laptops).length){
            res.status(400).send({"status":"failed","message":"no_of_laptops is not equal to array size of laptops_serial_no  .."})
        }
        else if(req.body.no_of_laptops==0){
            res.status(400).send({"status":"failed","message":"zero laptops is present in good  note receipt challan.."})
        }
        else if(!gnrService.areAllElementsUnique(req.body.laptops)){
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
                else if(!await gnrService.checkLaptopPresence(req.body.laptops[i])){
                    res.status(400).send({"status":"failed","message":"laptop(laptop serial no. ) is not present in inventory...","laptop":i+1})
                    found=true;                    
                    break;
                }
                else if(await gnrService.checkLaptopAvalability(req.body.laptops[i])){
                    res.status(400).send({"status":"failed","message":"laptop is already return or available to give..","laptop":i+1})
                    found=true;                    
                    break;
                }
                else if((await gnrService.checkLaptopStatus(req.body.laptops[i].laptop_serial_no))[0].laptop_status=="repair"){
                    res.status(400).send({"status":"failed","message":"laptop is in repairing process .."})
                }
            }
            if(!found){
                req.body.gnr_date=new Date(req.body.gnr_date)
                if(req.body.gnr_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"gnr_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                } 
                req.body.collection_request_date=new Date(req.body.collection_request_date)
                if(req.body.collection_request_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"collection_request_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                }
                req.body.collected_date=new Date(req.body.collected_date)
                if(req.body.collected_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"collected_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                }
                
                gnrService.create(req.user.user_id,req.body,(err,results)=>{
                    if(err){
                        console.log(err)
                        return res.status(403).json({
                            success:0,
                            message:"Database connection error"
                        })
                    }
                    res.status(201).send({"status":"Success","message":"GNR is created...."})
                })  
            }    
        }
    }
    static addLaptopSNo=async(req,res)=>{
        if(!(req.query.gnr_challan_no &&req.query.laptop_serial_no)){
            res.status(200).send({"status":"Failed","message":"Good  Note Receipt Challan no. and laptop serial no. needed...."})
        }
        else if(!await gnrService.checkGNRPresence(req.query.gnr_challan_no)){
            res.status(400).send({"status":"failed","message":"Given good  note receipt challan(gnr_challan_no)  is not present.."})
        }
        else if(await gnrService.checkLaptopInGNR(req.query.gnr_challan_no,req.query.laptop_serial_no)){
            res.status(400).send({"status":"failed","message":"Given Laptop is already present in good  note receipt challan(gnr_challan_no).."})
        }
        else if(await gnrService.checkLaptopAvalability(req.query.laptop_serial_no)){
            res.status(400).send({"status":"failed","message":"laptop is already return or available to give.."})
        }
        else if((await gnrService.checkLaptopStatus(req.query.laptop_serial_no))[0].laptop_status=="repair"){
            res.status(400).send({"status":"failed","message":"laptop is in repairing process .."})
        } 
        else{
            gnrService.addLaptopSNo(req.query.gnr_challan_no,req.query.laptop_serial_no,(err,results)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err.sqlMessage
                    })
                }
                res.status(200).send({"status":"Success","message":"In Good  Note Receipt Challan,Given Laptop(laptop_serial_no) is added...."})
            })
        }       
    }
    static update=async (req,res)=>{
        try {
            if(!req.body.gnr_challan_no){
            res.status(200).send({"status":"Failed","message":"good  note receipt challan no. needs for identify which good  note receipt challan need to be update ...."})
        }
        else if(!await gnrService.checkGNRPresence(req.body.gnr_challan_no)){
            res.status(400).send({"status":"failed","message":"good  note receipt challan(gnr_challan_no) is not present.."})
        }
        else if(req.body.c_no && !Number.isInteger(req.body.c_no)){
            res.status(400).send({"status":"Failed","message":"customer_no needs to be a integer...."})
        }
        else if(req.body.c_no && !await gnrService.checkCustomerPresence(req.body.c_no)){
            res.status(400).send({"status":"failed","message":"customer(c_no) is not present.."})
        }
        else if(typeof(req.body.no_of_laptops)!="undefined"){
            res.status(400).send({"status":"failed","message":"no_of_laptops is not updatable value..."})
        }
        else if(typeof(req.body.user_id)!="undefined"){
            res.status(400).send({"status":"failed","message":"user_id is not updatable value..."})
        }
        else{
            if(req.body.gnr_date){
                req.body.gnr_date=new Date(req.body.gnr_date)
                if(req.body.gnr_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"gnr_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD)...."})
                } 
            }
            if(req.body.collection_request_date){
                req.body.collection_request_date=new Date(req.body.collection_request_date)
                if(req.body.collection_request_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"collection_request_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD)...."})
                } 
            }
            if(req.body.collected_date){
                req.body.collected_date=new Date(req.body.collected_date)
                if(req.body.collected_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"collected_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD)...."})
                } 
            }
            const gnr_challan_no=req.body.gnr_challan_no
            delete req.body.gnr_challan_no
            gnrService.updateGNR(gnr_challan_no,req.body,(err,results)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error"
                    })
                }
                res.status(200).send({"status":"Success","message":"Good  Note Receipt Challan updated...."})        
            })                
        }        
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to update customer profile...."})
        }        
    }        
    static delete=async (req,res)=>{ 
        if(!req.query.gnr_challan_no){
            res.status(200).send({"status":"Failed","message":"Good  Note Receipt Challan no. needs for identify which GNR need to be delete ...."})
        }
        else if(!await gnrService.checkGNRPresence(req.query.gnr_challan_no)){
            res.status(400).send({"status":"failed","message":"Given good  note receipt challan(gnr_challan_no)  is not present.."})
        } 
        else{
            gnrService.deleteGNR(req.query.gnr_challan_no,(err,results)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err.sqlMessage
                    })
                }
                res.status(200).send({"status":"Success","message":"Good  Note Receipt Challan deleted...."})
            })
        }             
    }
    static deleteLaptopSNo=async (req,res)=>{ 
        if(!(req.query.gnr_challan_no &&req.query.laptop_serial_no)){
            res.status(200).send({"status":"Failed","message":"Good  Note Receipt Challan no. and laptop serial no. needs for identify which GNR laptop need to be delete ...."})
        }
        else if(!await gnrService.checkGNRPresence(req.query.gnr_challan_no)){
            res.status(400).send({"status":"failed","message":"Given good  note receipt challan(gnr_challan_no)  is not present.."})
        }
        else if(!await gnrService.checkLaptopInGNR(req.query.gnr_challan_no,req.query.laptop_serial_no)){
            res.status(400).send({"status":"failed","message":"Given Laptop is not present in good  note receipt challan(gnr_challan_no).."})
        } 
        else{
            gnrService.deleteLaptopSNo(req.query.gnr_challan_no,req.query.laptop_serial_no,(err,results)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err.sqlMessage
                    })
                }
                res.status(200).send({"status":"Success","message":"In Good  Note Receipt Challan,Given Laptop(laptop_serial_no) is deleted...."})
            })
        }             
    }
    static getAllGNR=async (req,res)=>{
        gnrService.getAllGNR((err,results)=>{
            if(err){
                return res.status(403).json({
                    success:0,
                    message:"Database connection error",
                    error:err
                })
            }
            res.status(200).send({"status":"Success","no. of results":results.length,"Good  Note Receipt Challan":results})
        })       
    }
    static getDetailGNR=async (req,res)=>{
        if(!req.query.gnr_challan_no){
            res.status(200).send({"status":"Failed","message":"Good  Note Receipt Challan no. needs for identify GNR ...."})
        }
        else if(!await gnrService.checkGNRPresence(req.query.gnr_challan_no)){
            res.status(400).send({"status":"failed","message":"Given good  note receipt challan(gnr_challan_no)  is not present.."})
        } 
        else{
            gnrService.getDetailGNR(req.query.gnr_challan_no,(err,results)=>{
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
                    "gnr_challan_no":results[0][0].gnr_challan_no,
                    "gnr_date":results[0][0].gnr_date,
                    "c_no":results[0][0].c_no,
                    "collection_request_date":results[0][0].collection_request_date,
                    "collection_type":results[0][0].collection_type,
                    "collected_by":results[0][0].collected_by,
                    "collected_date":results[0][0].collected_date,
                    "attached_scanned_document":results[0][0].attached_scanned_document,
                    "transport_amount":results[0][0].transport_amount,
                    "note_remark":results[0][0].note_remark,
                    "user_id":results[0][0].user_id,
                    "no_of_laptops":results[0][0].no_of_laptops,
                    "laptops":results[1]
                }
                res.status(200).send({"status":"Success","Detail GNR":results})
            })
        }           
    }
    static dynamicFilter=async (req,res)=>{
        for (const key in req.query) {
            if(req.query[key].length==0){
                return res.status(400).send({"status":"failed","message":`Given ${key} is undefined...`})
            }
          }
        gnrService.dynamicFilter(req.query,(err,results)=>{
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

export default gnrController;