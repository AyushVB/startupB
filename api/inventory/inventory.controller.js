import inventoryService from "./inventory.service.js"

class inventoryController{
    static update=async (req,res)=>{
        try {
            if(!(req.body.laptop_serial_no )){
                res.status(400).send({"status":"failed","message":"Necessary fields are required...","Necessary fields":"laptop_serial_no "})   
            }
            else if(!await inventoryService.checkLaptopPresence(req.body.laptop_serial_no)){
                res.status(400).send({"status":"failed","message":"laptop(laptop serial no) is not present..."})    
            }
            else if(!(typeof(req.body.laptop_brand)=="undefined" || req.body.laptop_brand)){
                res.send({"status":"failed","message":"laptop_brand field not to be null ...."})      
            }
            else if(req.body.optical_disk_drive &&( !Number.isInteger(req.body.optical_disk_drive)|| !(req.body.optical_disk_drive==0 || req.body.optical_disk_drive==1))){
                res.status(400).send({"status":"failed","message":"optical_disk_drive need to be boolean(0 or 1)"})
            }
            else if(req.body.touch_screen && (!Number.isInteger(req.body.touch_screen)|| !(req.body.touch_screen==0 || req.body.touch_screen==1))){
                res.status(400).send({"status":"failed","message":"touch_screen need to be boolean(0 or 1)"})        
            }
            else if(req.body.dedicated_graphic_processor && (!Number.isInteger(req.body.dedicated_graphic_processor)|| !(req.body.dedicated_graphic_processor==0 || req.body.dedicated_graphic_processor==1))){
                res.status(400).send({"status":"failed","message":"dedicated_graphic_processor need to be boolean(0 or 1)"})        
            }
            else if(req.body.internal_mic && (!Number.isInteger(req.body.internal_mic)|| !(req.body.internal_mic==0 || req.body.internal_mic==1))){
                res.status(400).send({"status":"failed","message":"internal_mic need to be boolean(0 or 1)"})   
            }
            else if(req.body.speakers && (!Number.isInteger(req.body.speakers)|| !(req.body.speakers==0 || req.body.speakers==1))){
                res.status(400).send({"status":"failed","message":"speakers need to be boolean(0 or 1)"})        
            }
            else if(req.body.web_camera && (!Number.isInteger(req.body.web_camera)|| !(req.body.web_camera==0 || req.body.web_camera==1))){
                res.status(400).send({"status":"failed","message":"web_camera need to be boolean(0 or 1)"})        
            }
            else if(req.body.touchpad && (!Number.isInteger(req.body.touchpad)|| !(req.body.touchpad==0 || req.body.touchpad==1))){
                res.status(400).send({"status":"failed","message":"touchpad need to be boolean(0 or 1)"})    
            }
            else if(req.body.keyboard && (!Number.isInteger(req.body.keyboard)|| !(req.body.keyboard==0 || req.body.keyboard==1))){
                res.status(400).send({"status":"failed","message":"keyboard need to be boolean(0 or 1)"})        
            }
            else if(req.body.numeric_keyboard && (!Number.isInteger(req.body.numeric_keyboard)|| !(req.body.numeric_keyboard==0 || req.body.numeric_keyboard==1))){
                res.status(400).send({"status":"failed","message":"numeric_keyboard need to be boolean(0 or 1)"})        
            }
            else if(req.body.ethernet && (!Number.isInteger(req.body.ethernet)|| !(req.body.ethernet==0 || req.body.ethernet==1))){
                res.status(400).send({"status":"failed","message":"ethernet need to be boolean(0 or 1)"})        
            }
            else if(req.body.wireless_lan && (!Number.isInteger(req.body.wireless_lan)|| !(req.body.wireless_lan==0 || req.body.wireless_lan==1))){
                res.status(400).send({"status":"failed","message":"wireless_lan need to be boolean(0 or 1)"})        
            }
            else if(req.body.bluetooth && (!Number.isInteger(req.body.bluetooth)|| !(req.body.bluetooth==0 || req.body.bluetooth==1))){
                res.status(400).send({"status":"failed","message":"bluetooth need to be boolean(0 or 1)"})        
            }
            else if(req.body.hdmi_port && (!Number.isInteger(req.body.hdmi_port)|| !(req.body.hdmi_port==0 || req.body.hdmi_port==1))){
                res.status(400).send({"status":"failed","message":"hdmi_port need to be boolean(0 or 1)"})                            
            }
            else if(req.body.vga_15_pin_port && (!Number.isInteger(req.body.vga_15_pin_port)|| !(req.body.vga_15_pin_port==0 || req.body.vga_15_pin_port==1))){
                res.status(400).send({"status":"failed","message":"vga_15_pin_port need to be boolean(0 or 1)"})        
            }
            else if(req.body.dvi_port && (!Number.isInteger(req.body.dvi_port)|| !(req.body.dvi_port==0 || req.body.dvi_port==1))){
                res.status(400).send({"status":"failed","message":"dvi_port need to be boolean(0 or 1)"})        
            }
            else if(req.body.multi_card_slot && (!Number.isInteger(req.body.multi_card_slot)|| !(req.body.multi_card_slot==0 || req.body.multi_card_slot==1))){
                res.status(400).send({"status":"failed","message":"multi_card_slot need to be boolean(0 or 1)"})        
            }
            else if(req.body.smart_card_slot && (!Number.isInteger(req.body.smart_card_slot)|| !(req.body.smart_card_slot==0 || req.body.smart_card_slot==1))){
                res.status(400).send({"status":"failed","message":"smart_card_slot need to be boolean(0 or 1)"})                            
            }
            else if(req.body.processor_cache && !Number.isInteger(req.body.processor_cache)){
                res.status(400).send({"status":"Failed","message":"processor_cache needs to be a integer...."})        
            }
            else if(req.body.system_memory && !Number.isInteger(req.body.system_memory)){
                res.status(400).send({"status":"Failed","message":"system_memory needs to be a integer...."})        
            }
            else if(req.body.expandable_memory_upto && !Number.isInteger(req.body.expandable_memory_upto)){
                res.status(400).send({"status":"Failed","message":"expandable_memory_upto needs to be a integer...."})                            
            }
            else if(req.body.no_of_memory_slots && !Number.isInteger(req.body.no_of_memory_slots)){
                res.status(400).send({"status":"Failed","message":"no_of_memory_slots needs to be a integer...."})        
            }
            else if(req.body.hdd_capacity && !Number.isInteger(req.body.hdd_capacity)){
                res.status(400).send({"status":"Failed","message":"hdd_capacity needs to be a integer...."})                            
            }
            else if(req.body.graphic_processor_memory_capacity && !Number.isInteger(req.body.graphic_processor_memory_capacity)){
                res.status(400).send({"status":"Failed","message":"graphic_processor_memory_capacity needs to be a integer...."})        
            }
            else if(req.body.no_usb_2 && !Number.isInteger(req.body.no_usb_2)){
                res.status(400).send({"status":"Failed","message":"no_usb_2 needs to be a integer...."})                            
            }
            else if(req.body.no_usb_3 && !Number.isInteger(req.body.no_usb_3)){
                res.status(400).send({"status":"Failed","message":"no_usb_3 needs to be a integer...."})        
            }
            else if(req.body.power_adapter_serial_no && !Number.isInteger(req.body.power_adapter_serial_no)){
                res.status(400).send({"status":"Failed","message":"power_adapter_serial_no needs to be a integer...."})                            
            }
            else if(req.body.power_adapter_watt && !Number.isInteger(req.body.power_adapter_watt)){
                res.status(400).send({"status":"Failed","message":"power_adapter_watt needs to be a integer...."})        
            }
            else if(req.body.power_adapter_rating_volt && !Number.isInteger(req.body.power_adapter_rating_volt)){
                res.status(400).send({"status":"Failed","message":"power_adapter_rating_volt needs to be a integer...."})                            
            }
            else if(req.body.power_adapter_rating_amp && !Number.isInteger(req.body.power_adapter_rating_amp)){
                res.status(400).send({"status":"Failed","message":"power_adapter_rating_amp needs to be a integer...."})        
            }
            else if(req.body.battery_serial_no && !Number.isInteger(req.body.battery_serial_no)){
                res.status(400).send({"status":"Failed","message":"battery_serial_no needs to be a integer...."})                            
            }
            else if(req.body.battery_backup && !Number.isInteger(req.body.battery_backup)){
                res.status(400).send({"status":"Failed","message":"battery_backup needs to be a integer...."})        
            }
            else if(req.body.processor_clock_speed && !Number.isFinite(req.body.processor_clock_speed)){
                res.status(400).send({"status":"Failed","message":"processor_clock_speed needs to be a integer...."})                            
            }
            else if(req.body.screen_size && !Number.isFinite(req.body.screen_size)){
                res.status(400).send({"status":"Failed","message":"screen_size needs to be a integer...."})        
            }
            else if(req.body.weight && !Number.isFinite(req.body.weight)){
                res.status(400).send({"status":"Failed","message":"weight needs to be a integer...."})                            
            }
            else if(req.body.warranty_summary && !Number.isInteger(req.body.warranty_summary)){
                res.status(400).send({"status":"Failed","message":"warranty_summary needs to be a integer...."})        
            }
            else if(req.body.unit_price_inc_tax && !Number.isInteger(req.body.unit_price_inc_tax)){
                res.status(400).send({"status":"Failed","message":"unit_price_inc_tax needs to be a integer...."})                            
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
                inventoryService.deleteLaptop(req.query.laptop_serial_no,(err,results)=>{
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