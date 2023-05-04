import inventoryService from "./inventory.service.js"

class inventoryController{
    static add=async (req,res)=>{
        try {
            if(!(req.body.supplier_po_no && req.body.laptop_serial_no && req.body.laptop_brand)){
                res.status(400).send({"status":"failed","message":"Necessary fields are required..." ,"Necessary fields":"supplier_po_no,laptop_serial_no ,laptop_brand"})   
            }
            else if(!await inventoryService.checkPurchaseOrderPresence(req.body.supplier_po_no)){
                res.status(400).send({"status":"failed","message":"Supplier Purchase Order is not present.."})
            }
            else if(await inventoryService.checkLaptopPresence(req.body.laptop_serial_no)){
                res.status(400).send({"status":"failed","message":"laptop(laptop serial no ) already exists..."})   
            }
            else if(req.body.optical_disk_drive &&( !Number.isInteger(req.body.optical_disk_drive)|| !(req.body.optical_disk_drive==0 || req.body.optical_disk_drive==1))){
                res.status(400).send({"status":"failed","message":"optical_disk_drive need to be boolean(0 or 1)" })   
            }
            else if(req.body.touch_screen && (!Number.isInteger(req.body.touch_screen)|| !(req.body.touch_screen==0 || req.body.touch_screen==1))){
                res.status(400).send({"status":"failed","message":"touch_screen need to be boolean(0 or 1)" })   
            }
            else if(req.body.dedicated_graphic_processor && (!Number.isInteger(req.body.dedicated_graphic_processor)|| !(req.body.dedicated_graphic_processor==0 || req.body.dedicated_graphic_processor==1))){
                res.status(400).send({"status":"failed","message":"dedicated_graphic_processor need to be boolean(0 or 1)" })   
            }
            else if(req.body.internal_mic && (!Number.isInteger(req.body.internal_mic)|| !(req.body.internal_mic==0 || req.body.internal_mic==1))){
                res.status(400).send({"status":"failed","message":"internal_mic need to be boolean(0 or 1)" })   
            }
            else if(req.body.speakers && (!Number.isInteger(req.body.speakers)|| !(req.body.speakers==0 || req.body.speakers==1))){
                res.status(400).send({"status":"failed","message":"speakers need to be boolean(0 or 1)" })   
            }
            else if(req.body.web_camera && (!Number.isInteger(req.body.web_camera)|| !(req.body.web_camera==0 || req.body.web_camera==1))){
                res.status(400).send({"status":"failed","message":"web_camera need to be boolean(0 or 1)" })   
            }
            else if(req.body.touchpad && (!Number.isInteger(req.body.touchpad)|| !(req.body.touchpad==0 || req.body.touchpad==1))){
                res.status(400).send({"status":"failed","message":"touchpad need to be boolean(0 or 1)" })   
            }
            else if(req.body.keyboard && (!Number.isInteger(req.body.keyboard)|| !(req.body.keyboard==0 || req.body.keyboard==1))){
                res.status(400).send({"status":"failed","message":"keyboard need to be boolean(0 or 1)" })   
            }
            else if(req.body.numeric_keyboard && (!Number.isInteger(req.body.numeric_keyboard)|| !(req.body.numeric_keyboard==0 || req.body.numeric_keyboard==1))){
                res.status(400).send({"status":"failed","message":"numeric_keyboard need to be boolean(0 or 1)" })   
            }
            else if(req.body.ethernet && (!Number.isInteger(req.body.ethernet)|| !(req.body.ethernet==0 || req.body.ethernet==1))){
                res.status(400).send({"status":"failed","message":"ethernet need to be boolean(0 or 1)" })   
            }
            else if(req.body.wireless_lan && (!Number.isInteger(req.body.wireless_lan)|| !(req.body.wireless_lan==0 || req.body.wireless_lan==1))){
                res.status(400).send({"status":"failed","message":"wireless_lan need to be boolean(0 or 1)" })   
            }
            else if(req.body.bluetooth && (!Number.isInteger(req.body.bluetooth)|| !(req.body.bluetooth==0 || req.body.bluetooth==1))){
                res.status(400).send({"status":"failed","message":"bluetooth need to be boolean(0 or 1)" })   
            }
            else if(req.body.hdmi_port && (!Number.isInteger(req.body.hdmi_port)|| !(req.body.hdmi_port==0 || req.body.hdmi_port==1))){
                res.status(400).send({"status":"failed","message":"hdmi_port need to be boolean(0 or 1)" })                      
            }
            else if(req.body.vga_15_pin_port && (!Number.isInteger(req.body.vga_15_pin_port)|| !(req.body.vga_15_pin_port==0 || req.body.vga_15_pin_port==1))){
                res.status(400).send({"status":"failed","message":"vga_15_pin_port need to be boolean(0 or 1)" })   
            }
            else if(req.body.dvi_port && (!Number.isInteger(req.body.dvi_port)|| !(req.body.dvi_port==0 || req.body.dvi_port==1))){
                res.status(400).send({"status":"failed","message":"dvi_port need to be boolean(0 or 1)" })   
            }
            else if(req.body.multi_card_slot && (!Number.isInteger(req.body.multi_card_slot)|| !(req.body.multi_card_slot==0 || req.body.multi_card_slot==1))){
                res.status(400).send({"status":"failed","message":"multi_card_slot need to be boolean(0 or 1)" })   
            }
            else if(req.body.smart_card_slot && (!Number.isInteger(req.body.smart_card_slot)|| !(req.body.smart_card_slot==0 || req.body.smart_card_slot==1))){
                res.status(400).send({"status":"failed","message":"smart_card_slot need to be boolean(0 or 1)" })                      
            }
            
            else if(req.body.system_memory_GB && !Number.isInteger(req.body.system_memory_GB)){
                res.status(400).send({"status":"Failed","message":"system_memory_GB needs to be a integer...." })   
            }
            else if(req.body.expandable_memory_upto_GB && !Number.isInteger(req.body.expandable_memory_upto_GB)){
                res.status(400).send({"status":"Failed","message":"expandable_memory_upto_GB needs to be a integer...." })                      
            }
            else if(req.body.no_of_memory_slots && !Number.isInteger(req.body.no_of_memory_slots)){
                res.status(400).send({"status":"Failed","message":"no_of_memory_slots needs to be a integer...." })   
            }
            else if(req.body.hdd_capacity_GB && !Number.isInteger(req.body.hdd_capacity_GB)){
                res.status(400).send({"status":"Failed","message":"hdd_capacity_GB needs to be a integer...." })                      
            }
            else if(req.body.graphic_processor_memory_capacity_GB && !Number.isInteger(req.body.graphic_processor_memory_capacity_GB)){
                res.status(400).send({"status":"Failed","message":"graphic_processor_memory_capacity_GB needs to be a integer...." })   
            }
            else if(req.body.no_usb_2 && !Number.isInteger(req.body.no_usb_2)){
                res.status(400).send({"status":"Failed","message":"no_usb_2 needs to be a integer...." })                      
            }
            else if(req.body.no_usb_3 && !Number.isInteger(req.body.no_usb_3)){
                res.status(400).send({"status":"Failed","message":"no_usb_3 needs to be a integer...." })   
            }
            
            else if(req.body.power_adapter_watt && !Number.isFinite(req.body.power_adapter_watt)){
                res.status(400).send({"status":"Failed","message":"power_adapter_watt needs to be a  number...." })   
            }
            else if(req.body.power_adapter_rating_volt && !Number.isFinite(req.body.power_adapter_rating_volt)){
                res.status(400).send({"status":"Failed","message":"power_adapter_rating_volt needs to be a  number...." })                      
            }
            else if(req.body.power_adapter_rating_amp && !Number.isFinite(req.body.power_adapter_rating_amp)){
                res.status(400).send({"status":"Failed","message":"power_adapter_rating_amp needs to be a  number...." })   
            }
            else if(req.body.battery_backup_hour && !Number.isFinite(req.body.battery_backup_hour)){
                res.status(400).send({"status":"Failed","message":"battery_backup_hour needs to be a  number...." })   
            }
            else if(req.body.processor_clock_speed_GHz && !Number.isFinite(req.body.processor_clock_speed_GHz)){
                res.status(400).send({"status":"Failed","message":"processor_clock_speed_GHz needs to be a  number...." })                      
            }
            else if(req.body.screen_size_inch && !Number.isFinite(req.body.screen_size_inch)){
                res.status(400).send({"status":"Failed","message":"screen_size_inch needs to be a  number...." })   
            }
            else if(req.body.weight_KG && !Number.isFinite(req.body.weight_KG)){
                res.status(400).send({"status":"Failed","message":"weight_KG needs to be a  number...." })                      
            }
            else if(req.body.warranty_summary_year && !Number.isFinite(req.body.warranty_summary_year)){
                res.status(400).send({"status":"Failed","message":"warranty_summary_year needs to be a  number...." })   
            }
            else if(req.body.unit_price_inc_tax && !Number.isFinite(req.body.unit_price_inc_tax)){
                res.status(400).send({"status":"Failed","message":"unit_price_inc_tax needs to be a  number...." })                      
            }
            else if(req.body.laptop_condition && !(req.body.laptop_condition=='new' || req.body.laptop_condition=='used' || req.body.laptop_condition=='refurbished')){
                res.status(400).send({"status":"Failed","message":"laptop_condition needs to be in given set of value....","set of value":"{'new', 'used','refurbished'}" })                      
            }
            else if(typeof(req.body.laptop_status)!="undefined" ){
                res.status(400).send({"status":"Failed","message":"laptop_status needs not to be given(because ,firstly when we add laptop ,it must be in ready state...)" })                      
            }
            else{ 
                if(req.body.warranty_start_date){
                    req.body.warranty_start_date=new Date(req.body.warranty_start_date)
                    if(req.body.warranty_start_date=="Invalid Date"){
                        res.status(400).send({"status":"Failed","message":"warranty_start_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...." })   
                    }
                }
                if(req.body.warranty_till_date){
                    req.body.warranty_till_date=new Date(req.body.warranty_till_date)
                    if(req.body.warranty_till_date=="Invalid Date"){
                        res.status(400).send({"status":"Failed","message":"warranty_till_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...." })   
                    }
                }
                let no_of_laptops=await inventoryService.giveNoOfLaptops(req.body.supplier_po_no) 
                no_of_laptops++
                inventoryService.add(no_of_laptops,req.body,(err,results)=>{
                    if(err){
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error",
                            error:err
                        })
                    }
                    res.status(200).send({"status":"Success","message":"laptop added in purchase order...."})
                })      
            }        
        } catch (error) {
            console.log(error)
            res.status(400).send({"status":"failed","message":"Unable to add laptop in purchase order..."})
        }
    }    
    static update=async (req,res)=>{
        try {
            if(!( req.body.laptop_serial_no )){
                res.status(400).send({"status":"failed","message":"laptop_serial_no  is required..." })   
            }
            else if(await inventoryService.checkLaptopPresence(req.body.laptop_serial_no)){
                res.status(400).send({"status":"failed","message":"laptop(laptop serial no ) already exists..."})   
            }
            else if(req.body.supplier_po_no && !await inventoryService.checkPurchaseOrderPresence(req.body.supplier_po_no)){
                res.status(400).send({"status":"failed","message":"Supplier Purchase Order is not present.."})
            }
            else if(req.body.optical_disk_drive &&( !Number.isInteger(req.body.optical_disk_drive)|| !(req.body.optical_disk_drive==0 || req.body.optical_disk_drive==1))){
                res.status(400).send({"status":"failed","message":"optical_disk_drive need to be boolean(0 or 1)" })   
            }
            else if(req.body.touch_screen && (!Number.isInteger(req.body.touch_screen)|| !(req.body.touch_screen==0 || req.body.touch_screen==1))){
                res.status(400).send({"status":"failed","message":"touch_screen need to be boolean(0 or 1)" })   
            }
            else if(req.body.dedicated_graphic_processor && (!Number.isInteger(req.body.dedicated_graphic_processor)|| !(req.body.dedicated_graphic_processor==0 || req.body.dedicated_graphic_processor==1))){
                res.status(400).send({"status":"failed","message":"dedicated_graphic_processor need to be boolean(0 or 1)" })   
            }
            else if(req.body.internal_mic && (!Number.isInteger(req.body.internal_mic)|| !(req.body.internal_mic==0 || req.body.internal_mic==1))){
                res.status(400).send({"status":"failed","message":"internal_mic need to be boolean(0 or 1)" })   
            }
            else if(req.body.speakers && (!Number.isInteger(req.body.speakers)|| !(req.body.speakers==0 || req.body.speakers==1))){
                res.status(400).send({"status":"failed","message":"speakers need to be boolean(0 or 1)" })   
            }
            else if(req.body.web_camera && (!Number.isInteger(req.body.web_camera)|| !(req.body.web_camera==0 || req.body.web_camera==1))){
                res.status(400).send({"status":"failed","message":"web_camera need to be boolean(0 or 1)" })   
            }
            else if(req.body.touchpad && (!Number.isInteger(req.body.touchpad)|| !(req.body.touchpad==0 || req.body.touchpad==1))){
                res.status(400).send({"status":"failed","message":"touchpad need to be boolean(0 or 1)" })   
            }
            else if(req.body.keyboard && (!Number.isInteger(req.body.keyboard)|| !(req.body.keyboard==0 || req.body.keyboard==1))){
                res.status(400).send({"status":"failed","message":"keyboard need to be boolean(0 or 1)" })   
            }
            else if(req.body.numeric_keyboard && (!Number.isInteger(req.body.numeric_keyboard)|| !(req.body.numeric_keyboard==0 || req.body.numeric_keyboard==1))){
                res.status(400).send({"status":"failed","message":"numeric_keyboard need to be boolean(0 or 1)" })   
            }
            else if(req.body.ethernet && (!Number.isInteger(req.body.ethernet)|| !(req.body.ethernet==0 || req.body.ethernet==1))){
                res.status(400).send({"status":"failed","message":"ethernet need to be boolean(0 or 1)" })   
            }
            else if(req.body.wireless_lan && (!Number.isInteger(req.body.wireless_lan)|| !(req.body.wireless_lan==0 || req.body.wireless_lan==1))){
                res.status(400).send({"status":"failed","message":"wireless_lan need to be boolean(0 or 1)" })   
            }
            else if(req.body.bluetooth && (!Number.isInteger(req.body.bluetooth)|| !(req.body.bluetooth==0 || req.body.bluetooth==1))){
                res.status(400).send({"status":"failed","message":"bluetooth need to be boolean(0 or 1)" })   
            }
            else if(req.body.hdmi_port && (!Number.isInteger(req.body.hdmi_port)|| !(req.body.hdmi_port==0 || req.body.hdmi_port==1))){
                res.status(400).send({"status":"failed","message":"hdmi_port need to be boolean(0 or 1)" })                      
            }
            else if(req.body.vga_15_pin_port && (!Number.isInteger(req.body.vga_15_pin_port)|| !(req.body.vga_15_pin_port==0 || req.body.vga_15_pin_port==1))){
                res.status(400).send({"status":"failed","message":"vga_15_pin_port need to be boolean(0 or 1)" })   
            }
            else if(req.body.dvi_port && (!Number.isInteger(req.body.dvi_port)|| !(req.body.dvi_port==0 || req.body.dvi_port==1))){
                res.status(400).send({"status":"failed","message":"dvi_port need to be boolean(0 or 1)" })   
            }
            else if(req.body.multi_card_slot && (!Number.isInteger(req.body.multi_card_slot)|| !(req.body.multi_card_slot==0 || req.body.multi_card_slot==1))){
                res.status(400).send({"status":"failed","message":"multi_card_slot need to be boolean(0 or 1)" })   
            }
            else if(req.body.smart_card_slot && (!Number.isInteger(req.body.smart_card_slot)|| !(req.body.smart_card_slot==0 || req.body.smart_card_slot==1))){
                res.status(400).send({"status":"failed","message":"smart_card_slot need to be boolean(0 or 1)" })                      
            }
            
            else if(req.body.system_memory_GB && !Number.isInteger(req.body.system_memory_GB)){
                res.status(400).send({"status":"Failed","message":"system_memory_GB needs to be a integer...." })   
            }
            else if(req.body.expandable_memory_upto_GB && !Number.isInteger(req.body.expandable_memory_upto_GB)){
                res.status(400).send({"status":"Failed","message":"expandable_memory_upto_GB needs to be a integer...." })                      
            }
            else if(req.body.no_of_memory_slots && !Number.isInteger(req.body.no_of_memory_slots)){
                res.status(400).send({"status":"Failed","message":"no_of_memory_slots needs to be a integer...." })   
            }
            else if(req.body.hdd_capacity_GB && !Number.isInteger(req.body.hdd_capacity_GB)){
                res.status(400).send({"status":"Failed","message":"hdd_capacity_GB needs to be a integer...." })                      
            }
            else if(req.body.graphic_processor_memory_capacity_GB && !Number.isInteger(req.body.graphic_processor_memory_capacity_GB)){
                res.status(400).send({"status":"Failed","message":"graphic_processor_memory_capacity_GB needs to be a integer...." })   
            }
            else if(req.body.no_usb_2 && !Number.isInteger(req.body.no_usb_2)){
                res.status(400).send({"status":"Failed","message":"no_usb_2 needs to be a integer...." })                      
            }
            else if(req.body.no_usb_3 && !Number.isInteger(req.body.no_usb_3)){
                res.status(400).send({"status":"Failed","message":"no_usb_3 needs to be a integer...." })   
            }
            
            else if(req.body.power_adapter_watt && !Number.isFinite(req.body.power_adapter_watt)){
                res.status(400).send({"status":"Failed","message":"power_adapter_watt needs to be a  number...." })   
            }
            else if(req.body.power_adapter_rating_volt && !Number.isFinite(req.body.power_adapter_rating_volt)){
                res.status(400).send({"status":"Failed","message":"power_adapter_rating_volt needs to be a  number...." })                      
            }
            else if(req.body.power_adapter_rating_amp && !Number.isFinite(req.body.power_adapter_rating_amp)){
                res.status(400).send({"status":"Failed","message":"power_adapter_rating_amp needs to be a  number...." })   
            }
            else if(req.body.battery_backup_hour && !Number.isFinite(req.body.battery_backup_hour)){
                res.status(400).send({"status":"Failed","message":"battery_backup_hour needs to be a  number...." })   
            }
            else if(req.body.processor_clock_speed_GHz && !Number.isFinite(req.body.processor_clock_speed_GHz)){
                res.status(400).send({"status":"Failed","message":"processor_clock_speed_GHz needs to be a  number...." })                      
            }
            else if(req.body.screen_size_inch && !Number.isFinite(req.body.screen_size_inch)){
                res.status(400).send({"status":"Failed","message":"screen_size_inch needs to be a  number...." })   
            }
            else if(req.body.weight_KG && !Number.isFinite(req.body.weight_KG)){
                res.status(400).send({"status":"Failed","message":"weight_KG needs to be a  number...." })                      
            }
            else if(req.body.warranty_summary_year && !Number.isFinite(req.body.warranty_summary_year)){
                res.status(400).send({"status":"Failed","message":"warranty_summary_year needs to be a  number...." })   
            }
            else if(req.body.unit_price_inc_tax && !Number.isFinite(req.body.unit_price_inc_tax)){
                res.status(400).send({"status":"Failed","message":"unit_price_inc_tax needs to be a  number...." })                      
            }
            else if(req.body.laptop_condition && !(req.body.laptop_condition=='new' || req.body.laptop_condition=='used' || req.body.laptop_condition=='refurbished')){
                res.status(400).send({"status":"Failed","message":"laptop_condition needs to be in given set of value....","set of value":"{'new', 'used','refurbished'}" })                      
            }
            else if(req.body.laptop_status && !(req.body.laptop_status=='ready' || req.body.laptop_status=='repair' )){
                res.status(400).send({"status":"Failed","message":"laptop_status needs to be in given set of value....","set of value":"{'ready', 'repair'}" })                      
            }
            else{ 
                if(req.body.warranty_start_date){
                    req.body.warranty_start_date=new Date(req.body.warranty_start_date)
                    if(req.body.warranty_start_date=="Invalid Date"){
                        return res.status(400).send({"status":"Failed","message":"warranty_start_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})   
                    }
                }
                if(req.body.warranty_till_date){
                    req.body.warranty_till_date=new Date(req.body.warranty_till_date)
                    if(req.body.warranty_till_date=="Invalid Date"){
                        return res.status(400).send({"status":"Failed","message":"warranty_till_date is either not a correct date or is not in the correct format(fomat => YYYY-MM-DD )...."})    
                    }
                }
                const laptop_serial_no=req.body.laptop_serial_no
                delete req.body.laptop_serial_no
                inventoryService.updateByLSNo(laptop_serial_no,req.body,(err,results)=>{
                    if(err){
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error",
                            error:err
                        })
                    }
                    res.status(200).send({"status":"Success","message":"laptop configuration updated...."})
                })     
            }                                       
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to update laptop configuration...."})
        }           
    }
    static delete=async (req,res)=>{
        try {
            if(!(req.query.laptop_serial_no )){
                res.status(400).send({"status":"failed","message":"Necessary fields are required...","Necessary fields":"laptop_serial_no "})   
            }
            else if(!await inventoryService.checkLaptopPresence(req.query.laptop_serial_no)){
                res.status(400).send({"status":"failed","message":"laptop(laptop serial no) is not present..."})    
            } 
            else{
                const supplier_po_no=await inventoryService.giveSupplierPurchaseOrderNo(req.query.laptop_serial_no) 
                let no_of_laptops=await inventoryService.giveNoOfLaptops(supplier_po_no) 
                no_of_laptops--
                inventoryService.deleteLaptop(req.query.laptop_serial_no,supplier_po_no,no_of_laptops,(err,results)=>{
                    if(err){
                        return res.status(500).json({
                            success:0,
                            message:"Database connection error",
                            error:err
                        })
                    }
                    res.status(200).send({"status":"Success","message":"laptop deleted...."})
                })      
            }    
        } catch (error) {
            console.log(error)
            res.status(400).send({"status":"failed","message":"Unable to delete laptop..."})
        }            
    }
    static getAllLaptops=async (req,res)=>{
        try {
            inventoryService.getAllLaptops((err,results)=>{
                if(err){
                    return res.status(500).json({
                        success:0,
                        message:"Database connection error",
                        error:err
                    })
                }
                res.status(200).send({"status":"Success","no of results":results.length,"inventory":results})
            })        
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Unable to get all laptop configuration...."})            
        }        
    }
    static dynamicFilter=async (req,res)=>{
        try {
            for (const key in req.query) {
                if(req.query[key].length==0){
                    res.status(400).send({"status":"failed","message":`Given ${key} is undefined...`})
                }   
            }
            inventoryService.dynamicFilter(req.query,(err,results)=>{
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

export default inventoryController;