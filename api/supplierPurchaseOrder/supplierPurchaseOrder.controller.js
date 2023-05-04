import supplierPurchaseOrderService from './supplierPurchaseOrder.service.js'

class supplierPurchaseOrderController{
    static create=async (req,res)=>{
        if(!(req.body.supplier_po_no && req.body.supplier_no && req.body.po_date && req.body.purchase_invoice_no && req.body.purchase_invoice_date && req.body.date_of_received && req.body.attached_scanned_document && req.body.inventory &&req.body.inventory.no_of_laptops)){
            res.status(400).send({"status":"failed","message":"Necessary fields are required ....","Necessary fields":"supplier_po_no ,supplier_no ,po_date ,purchase_invoice_no ,purchase_invoice_date,date_of_received ,attached_scanned_document , inventory  ,no_of_laptops"})
        }
        else if(await supplierPurchaseOrderService.checkPurchaseOrderPresence(req.body.supplier_po_no)){
            res.status(400).send({"status":"failed","message":"Supplier Purchase Order already exists.."})
        }
        else if(!Number.isInteger(req.body.supplier_no)){
            res.status(400).send({"status":"Failed","message":"supplier_no needs to be a integer...."})
        }
        else if(!await supplierPurchaseOrderService.checkSupplierPresence(req.body.supplier_no)){
            res.status(400).send({"status":"failed","message":"supplier(supplier_no) is not present...."})
        }
        else if(req.body.inventory.no_of_laptops!=(req.body.inventory.laptops).length){
            res.status(400).send({"status":"failed","message":"no_of_laptops is not equal to array size of laptops.. "})
        }
        else if(req.body.inventory.no_of_laptops==0){
            res.status(400).send({"status":"failed","message":"zero laptops is present in supply order.."})
        }
        else if(!Number.isInteger(req.body.inventory.no_of_laptops)){
            res.status(400).send({"status":"Failed","message":"no_of_laptops needs to be a integer...."})
        }
        else{
            let found=false;
            for (let i = 0; i < req.body.inventory.no_of_laptops; i++) {
                if(!(req.body.inventory.laptops[i].laptop_serial_no && req.body.inventory.laptops[i].laptop_brand)){
                    res.status(400).send({"status":"failed","message":"Necessary fields are required...","inventory":i+1,"Necessary fields":"laptop_serial_no ,laptop_brand"})
                    found=true;
                    break;
                }
                else if(await supplierPurchaseOrderService.checkLaptopPresence(req.body.inventory.laptops[i].laptop_serial_no)){
                    res.status(400).send({"status":"failed","message":"laptop(laptop serial no ) already exists...","inventory":i+1})
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].optical_disk_drive &&( !Number.isInteger(req.body.inventory.laptops[i].optical_disk_drive)|| !(req.body.inventory.laptops[i].optical_disk_drive==0 || req.body.inventory.laptops[i].optical_disk_drive==1))){
                    res.status(400).send({"status":"failed","message":"optical_disk_drive need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].touch_screen && (!Number.isInteger(req.body.inventory.laptops[i].touch_screen)|| !(req.body.inventory.laptops[i].touch_screen==0 || req.body.inventory.laptops[i].touch_screen==1))){
                    res.status(400).send({"status":"failed","message":"touch_screen need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].dedicated_graphic_processor && (!Number.isInteger(req.body.inventory.laptops[i].dedicated_graphic_processor)|| !(req.body.inventory.laptops[i].dedicated_graphic_processor==0 || req.body.inventory.laptops[i].dedicated_graphic_processor==1))){
                    res.status(400).send({"status":"failed","message":"dedicated_graphic_processor need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].internal_mic && (!Number.isInteger(req.body.inventory.laptops[i].internal_mic)|| !(req.body.inventory.laptops[i].internal_mic==0 || req.body.inventory.laptops[i].internal_mic==1))){
                    res.status(400).send({"status":"failed","message":"internal_mic need to be boolean(0 or 1)","inventory":i+1})
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].speakers && (!Number.isInteger(req.body.inventory.laptops[i].speakers)|| !(req.body.inventory.laptops[i].speakers==0 || req.body.inventory.laptops[i].speakers==1))){
                    res.status(400).send({"status":"failed","message":"speakers need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].web_camera && (!Number.isInteger(req.body.inventory.laptops[i].web_camera)|| !(req.body.inventory.laptops[i].web_camera==0 || req.body.inventory.laptops[i].web_camera==1))){
                    res.status(400).send({"status":"failed","message":"web_camera need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].touchpad && (!Number.isInteger(req.body.inventory.laptops[i].touchpad)|| !(req.body.inventory.laptops[i].touchpad==0 || req.body.inventory.laptops[i].touchpad==1))){
                    res.status(400).send({"status":"failed","message":"touchpad need to be boolean(0 or 1)","inventory":i+1})
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].keyboard && (!Number.isInteger(req.body.inventory.laptops[i].keyboard)|| !(req.body.inventory.laptops[i].keyboard==0 || req.body.inventory.laptops[i].keyboard==1))){
                    res.status(400).send({"status":"failed","message":"keyboard need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].numeric_keyboard && (!Number.isInteger(req.body.inventory.laptops[i].numeric_keyboard)|| !(req.body.inventory.laptops[i].numeric_keyboard==0 || req.body.inventory.laptops[i].numeric_keyboard==1))){
                    res.status(400).send({"status":"failed","message":"numeric_keyboard need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].ethernet && (!Number.isInteger(req.body.inventory.laptops[i].ethernet)|| !(req.body.inventory.laptops[i].ethernet==0 || req.body.inventory.laptops[i].ethernet==1))){
                    res.status(400).send({"status":"failed","message":"ethernet need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].wireless_lan && (!Number.isInteger(req.body.inventory.laptops[i].wireless_lan)|| !(req.body.inventory.laptops[i].wireless_lan==0 || req.body.inventory.laptops[i].wireless_lan==1))){
                    res.status(400).send({"status":"failed","message":"wireless_lan need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].bluetooth && (!Number.isInteger(req.body.inventory.laptops[i].bluetooth)|| !(req.body.inventory.laptops[i].bluetooth==0 || req.body.inventory.laptops[i].bluetooth==1))){
                    res.status(400).send({"status":"failed","message":"bluetooth need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].hdmi_port && (!Number.isInteger(req.body.inventory.laptops[i].hdmi_port)|| !(req.body.inventory.laptops[i].hdmi_port==0 || req.body.inventory.laptops[i].hdmi_port==1))){
                    res.status(400).send({"status":"failed","message":"hdmi_port need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else if(req.body.inventory.laptops[i].vga_15_pin_port && (!Number.isInteger(req.body.inventory.laptops[i].vga_15_pin_port)|| !(req.body.inventory.laptops[i].vga_15_pin_port==0 || req.body.inventory.laptops[i].vga_15_pin_port==1))){
                    res.status(400).send({"status":"failed","message":"vga_15_pin_port need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].dvi_port && (!Number.isInteger(req.body.inventory.laptops[i].dvi_port)|| !(req.body.inventory.laptops[i].dvi_port==0 || req.body.inventory.laptops[i].dvi_port==1))){
                    res.status(400).send({"status":"failed","message":"dvi_port need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].multi_card_slot && (!Number.isInteger(req.body.inventory.laptops[i].multi_card_slot)|| !(req.body.inventory.laptops[i].multi_card_slot==0 || req.body.inventory.laptops[i].multi_card_slot==1))){
                    res.status(400).send({"status":"failed","message":"multi_card_slot need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].smart_card_slot && (!Number.isInteger(req.body.inventory.laptops[i].smart_card_slot)|| !(req.body.inventory.laptops[i].smart_card_slot==0 || req.body.inventory.laptops[i].smart_card_slot==1))){
                    res.status(400).send({"status":"failed","message":"smart_card_slot need to be boolean(0 or 1)","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                
                else if(req.body.inventory.laptops[i].system_memory_GB && !Number.isInteger(req.body.inventory.laptops[i].system_memory_GB)){
                    res.status(400).send({"status":"Failed","message":"system_memory_GB needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].expandable_memory_upto_GB && !Number.isInteger(req.body.inventory.laptops[i].expandable_memory_upto_GB)){
                    res.status(400).send({"status":"Failed","message":"expandable_memory_upto_GB needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else if(req.body.inventory.laptops[i].no_of_memory_slots && !Number.isInteger(req.body.inventory.laptops[i].no_of_memory_slots)){
                    res.status(400).send({"status":"Failed","message":"no_of_memory_slots needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].hdd_capacity_GB && !Number.isInteger(req.body.inventory.laptops[i].hdd_capacity_GB)){
                    res.status(400).send({"status":"Failed","message":"hdd_capacity_GB needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else if(req.body.inventory.laptops[i].graphic_processor_memory_capacity_GB && !Number.isInteger(req.body.inventory.laptops[i].graphic_processor_memory_capacity_GB)){
                    res.status(400).send({"status":"Failed","message":"graphic_processor_memory_capacity_GB needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].no_usb_2 && !Number.isInteger(req.body.inventory.laptops[i].no_usb_2)){
                    res.status(400).send({"status":"Failed","message":"no_usb_2 needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else if(req.body.inventory.laptops[i].no_usb_3 && !Number.isInteger(req.body.inventory.laptops[i].no_usb_3)){
                    res.status(400).send({"status":"Failed","message":"no_usb_3 needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                
                else if(req.body.inventory.laptops[i].power_adapter_watt && !Number.isFinite(req.body.inventory.laptops[i].power_adapter_watt)){
                    res.status(400).send({"status":"Failed","message":"power_adapter_watt needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].power_adapter_rating_volt && !Number.isFinite(req.body.inventory.laptops[i].power_adapter_rating_volt)){
                    res.status(400).send({"status":"Failed","message":"power_adapter_rating_volt needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else if(req.body.inventory.laptops[i].power_adapter_rating_amp && !Number.isFinite(req.body.inventory.laptops[i].power_adapter_rating_amp)){
                    res.status(400).send({"status":"Failed","message":"power_adapter_rating_amp needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].battery_backup_hour && !Number.isFinite(req.body.inventory.laptops[i].battery_backup_hour)){
                    res.status(400).send({"status":"Failed","message":"battery_backup_hour needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].processor_clock_speed_GHz && !Number.isFinite(req.body.inventory.laptops[i].processor_clock_speed_GHz)){
                    res.status(400).send({"status":"Failed","message":"processor_clock_speed_GHz needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else if(req.body.inventory.laptops[i].screen_size_inch && !Number.isFinite(req.body.inventory.laptops[i].screen_size_inch)){
                    res.status(400).send({"status":"Failed","message":"screen_size_inch needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].weight_KG && !Number.isFinite(req.body.inventory.laptops[i].weight_KG)){
                    res.status(400).send({"status":"Failed","message":"weight_KG needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else if(req.body.inventory.laptops[i].warranty_summary_year && !Number.isFinite(req.body.inventory.laptops[i].warranty_summary_year)){
                    res.status(400).send({"status":"Failed","message":"warranty_summary_year needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;
                }
                else if(req.body.inventory.laptops[i].unit_price_inc_tax && !Number.isFinite(req.body.inventory.laptops[i].unit_price_inc_tax)){
                    res.status(400).send({"status":"Failed","message":"unit_price_inc_tax needs to be a integer....","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else if(req.body.inventory.laptops[i].laptop_condition && !(req.body.inventory.laptops[i].laptop_condition=='new' || req.body.inventory.laptops[i].laptop_condition=='used' || req.body.inventory.laptops[i].laptop_condition=='refurbished')){
                    res.status(400).send({"status":"Failed","message":"laptop_condition needs to be in given set of value....","set of value":"{'new', 'used','refurbished'}","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else if(typeof(req.body.laptop_status)!="undefined" ){
                    res.status(400).send({"status":"Failed","message":"laptop_status needs not to be given(because ,firstly when we add laptop ,it must be in ready state...)","inventory":i+1})                    
                    found=true;                    
                    break;                    
                }
                else{ 
                    if(req.body.inventory.laptops[i].warranty_start_date){
                        req.body.inventory.laptops[i].warranty_start_date=new Date(req.body.inventory.laptops[i].warranty_start_date)
                        if(req.body.inventory.laptops[i].warranty_start_date=="Invalid Date"){
                            res.status(400).send({"status":"Failed","message":"warranty_start_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )....","inventory":i+1})
                            found=true;                    
                            break;
                        }
                    }
                    if(req.body.inventory.laptops[i].warranty_till_date){
                        req.body.inventory.laptops[i].warranty_till_date=new Date(req.body.inventory.laptops[i].warranty_till_date)
                        if(req.body.inventory.laptops[i].warranty_till_date=="Invalid Date"){
                            res.status(400).send({"status":"Failed","message":"warranty_till_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )....","inventory":i+1})
                            found=true;                    
                            break;
                        }
                    }
                    
                }
            }
            if(!found){
                req.body.po_date=new Date(req.body.po_date)
                if(req.body.po_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"po_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                } 
                req.body.purchase_invoice_date=new Date(req.body.purchase_invoice_date)
                if(req.body.purchase_invoice_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"purchase_invoice_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                }
                req.body.date_of_received=new Date(req.body.date_of_received)
                if(req.body.date_of_received=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"date_of_received is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                }
                supplierPurchaseOrderService.create(req.user.user_id,req.body,(err,results)=>{
                    if(err){
                        console.log(err)
                        return res.status(403).json({
                            success:0,
                            message:"Database connection error",
                            error:err.sqlMessage
                        })
                    }
                    res.status(201).send({"status":"Success","message":"profile created...."})
                })  
            }
            
            
        }
    }
    static update=async (req,res)=>{
        if(!req.body.supplier_po_no){
            res.status(200).send({"status":"Failed","message":"supplier purchase order no. needs for identify which supplier purchase order need to be update ...."})
        }
        else if(typeof(req.body.user_id)!="undefined"){
            res.status(200).send({"status":"Failed","message":"user_id is not updatable value..."})
        }
        else if(typeof(req.body.no_of_laptops)!="undefined"){
            res.status(200).send({"status":"Failed","message":"no_of_laptops is not updatable value..."})
        }
        else if(!await supplierPurchaseOrderService.checkPurchaseOrderPresence(req.body.supplier_po_no)){
            res.status(400).send({"status":"failed","message":"Given Supplier Purchase Order no. is not present.."})
        }
        else if(req.body.supplier_no && !Number.isInteger(req.body.supplier_no)){
            res.status(200).send({"status":"Failed","message":"supplier no. needs to be a integer...."})
        }
        else if(req.body.supplier_no && !await supplierPurchaseOrderService.checkSupplierPresence(req.body.supplier_no)){
            res.status(400).send({"status":"failed","message":"Supplier_no of supplier not exists.."})
        }
        else{
            if(req.body.po_date){
                req.body.po_date=new Date(req.body.po_date)
                if(req.body.po_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"po_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                } 
            }
            if(req.body.purchase_invoice_date){    
                req.body.purchase_invoice_date=new Date(req.body.purchase_invoice_date)
                if(req.body.purchase_invoice_date=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"purchase_invoice_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                }
            }
            if(req.body.date_of_received){    
                req.body.date_of_received=new Date(req.body.date_of_received)
                if(req.body.date_of_received=="Invalid Date"){
                    return res.status(400).send({"status":"Failed","message":"date_of_received is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})
                }
            }
            const supplier_po_no=req.body.supplier_po_no
            delete req.body.supplier_po_no
            supplierPurchaseOrderService.updateBySpoNo(supplier_po_no,req.body,(err,results)=>{
                if(err){
                    console.log(err)
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err.sqlMessage
                    })
                }
                res.status(200).send({"status":"Success","message":"purchase order updated...."})        
            })                
        }        
    }        
    static delete=async (req,res)=>{
        if(!req.query.supplier_po_no){
            res.status(200).send({"status":"Failed","message":"supplier purchase order no. needs for identify which supplier purchase order need to be delete ...."})
        }
        else if(!await supplierPurchaseOrderService.checkPurchaseOrderPresence(req.query.supplier_po_no)){
            res.status(400).send({"status":"failed","message":"Given Supplier Purchase Order no. is not present.."})
        } 
        else{
            supplierPurchaseOrderService.deleteSupplierPO(req.query.supplier_po_no,(err,results)=>{
                if(err){
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err.sqlMessage
                    })
                }
                res.status(200).send({"status":"Success","message":"purchase order deleted...."})
            })
        }             
    }
    static getAllPO=async (req,res)=>{
        supplierPurchaseOrderService.getAllPO((err,results)=>{
            if(err){
                return res.status(403).json({
                    success:0,
                    message:"Database connection error",
                    error:err.sqlMessage
                })
            }
            res.status(200).send({"status":"Success","no of results":results.length,"Purchase Orders":results})
        })       
    }
    static getDetailPO=async (req,res)=>{
        if(!req.query.supplier_po_no){
            res.status(200).send({"status":"Failed","message":"supplier purchase order no. needs for identify which supplier purchase order need to be updated ...."})
        }
        else if(!await supplierPurchaseOrderService.checkPurchaseOrderPresence(req.query.supplier_po_no)){
            res.status(400).send({"status":"failed","message":"Given Supplier Purchase Order no. is not present.."})
        } 
        else{
            supplierPurchaseOrderService.getDetailPO(req.query.supplier_po_no,(err,results)=>{
                if(err){
                    return res.status(403).json({
                        success:0,
                        message:"Database connection error",
                        error:err.sqlMessage
                    })
                }
                results={
                    "supplier_po_no":results[0][0].supplier_po_no,
                    "supplier_no":results[0][0].supplier_no,
                    "po_date":results[0][0].po_date,
                    "purchase_invoice_no":results[0][0].purchase_invoice_no,
                    "purchase_invoice_date":results[0][0].purchase_invoice_date,
                    "date_of_received":results[0][0].date_of_received,
                    "attached_scanned_document":results[0][0].attached_scanned_document,
                    "user_id":results[0][0].user_id,
                    "no_of_laptops":results[0][0].no_of_laptops,
                    "laptops":results[1]
                }
                res.status(200).send({"status":"Success","no of results":results.length,"Purchase Orders":results})
            })
        }
               
    }
    static dynamicFilter=async (req,res)=>{
        for (const key in req.query) {
            if(req.query[key].length==0){
                res.status(400).send({"status":"failed","message":`Given ${key} is undefined...`})
            }    
        }
        supplierPurchaseOrderService.dynamicFilter(req.query,(err,results)=>{
            if(err){
                return res.status(403).json({
                    success:0,
                    message:"Database connection error",
                    error:err.sqlMessage
                })
            }
            res.status(200).send({"status":"Success","no of results":results.length,"results":results})
        })        
    }
}

export default supplierPurchaseOrderController;