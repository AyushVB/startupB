import pool from '../../config/database.js'
import util from 'util';
const query = util.promisify(pool.query).bind(pool);

// insert updateByCNo deleteByID GetAllDetails DynamicFilter
export default{
    add:(no_of_laptops,data,callBack)=>{
        try {
            let val=[];
            let sql =`insert into inventory(laptop_serial_no,laptop_brand,series,model_name ,model_id,part_no,processor,processor_generation,processor_clock_speed_GHz,processor_cache,system_memory_GB,expandable_memory_upto_GB,ram_technology,no_of_memory_slots,memory_slots,hdd_capacity_GB,hdd_type,hdd_rpm,optical_disk_drive ,odd_type,screen_size_inch,screen_resolution, screen_quality,touch_screen ,dedicated_graphic_processor ,graphic_processor_memory_capacity_GB,graphic_processor_make,graphic_memory_type,internal_mic ,speakers ,web_camera ,touchpad ,keyboard ,numeric_keyboard ,ethernet ,wireless_lan ,bluetooth ,no_usb_2,no_usb_3,hdmi_port ,vga_15_pin_port ,dvi_port ,multi_card_slot ,smart_card_slot ,power_adapter_serial_no,power_adapter_watt,power_adapter_rating_volt,power_adapter_rating_amp,battery_serial_no,battery_backup_hour,color,weight_KG,dimension,os,os_lic_coa_no,warranty_summary_year,warranty_start_date ,warranty_till_date ,po_no,laptop_condition,unit_price_inc_tax,laptop_status, available) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);UPDATE supplier_PO SET ? WHERE supplier_po_no = ?; `
            
            val.push(data.laptop_serial_no,data.laptop_brand,data.series,data.model_name ,data.model_id,data.part_no,data.processor,data.processor_generation,data.processor_clock_speed_GHz,data.processor_cache,data.system_memory_GB,data.expandable_memory_upto_GB,data.ram_technology,data.no_of_memory_slots,data.memory_slots,data.hdd_capacity_GB,data.hdd_type,data.hdd_rpm,data.optical_disk_drive ,data.odd_type,data.screen_size_inch,data.screen_resolution, data.screen_quality,data.touch_screen ,data.dedicated_graphic_processor ,data.graphic_processor_memory_capacity_GB,data.graphic_processor_make,data.graphic_memory_type,data.internal_mic ,data.speakers ,data.web_camera ,data.touchpad ,data.keyboard ,data.numeric_keyboard ,data.ethernet ,data.wireless_lan ,data.bluetooth ,data.no_usb_2,data.no_usb_3,data.hdmi_port ,data.vga_15_pin_port ,data.dvi_port ,data.multi_card_slot ,data.smart_card_slot ,data.power_adapter_serial_no,data.power_adapter_watt,data.power_adapter_rating_volt,data.power_adapter_rating_amp,data.battery_serial_no,data.battery_backup_hour,data.color,data.weight_KG,data.dimension,data.os,data.os_lic_coa_no,data.warranty_summary_year,data.warranty_start_date ,data.warranty_till_date ,data.supplier_po_no,data.laptop_condition ,data.unit_price_inc_tax,"ready",true,{no_of_laptops:no_of_laptops},data.supplier_po_no)
            
            
            pool.query(
                sql,
                val,
                (error,results,fields)=>{
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null,results)
                }
            ) 
                             
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"Failed to create supplier purchase order  ...."})                
        }
    },
    updateByLSNo:(no,newValues,callBack)=>{
        const updateQuery = 'UPDATE inventory SET ? WHERE laptop_serial_no = ?';
        pool.query(updateQuery, [newValues, no], (error, results) => {
            if(error){
                return callBack(error);
            }
            return callBack(null,results)
        });
    },
    deleteLaptop :(no,supplier_po_no,no_of_laptops,callBack)=>{
        pool.query(
            `delete from inventory where laptop_serial_no=?;UPDATE supplier_PO SET ? WHERE supplier_po_no = ?; `,
            [no,{no_of_laptops:no_of_laptops},supplier_po_no],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getAllLaptops:callBack=>{
        pool.query(
            `select * from inventory `,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    dynamicFilter:async(data,callBack)=>{
        try {
            let sql = `select * from inventory `;
            let count=Object.keys(data).length;
            let val=[];
            if(count){
                sql+=`where `
            }
            for (const key in data) {  
                if (data[key].includes(',')) {
                    const values = data[key].split(',');  
                    sql+=`${key} between ? and ? `
                    val.push(values[0])
                    val.push(values[1])
                } else if (data[key]) {   
                    sql+=`${key} = ? ` ;
                    val.push(data[key])
                }
                count--;
                if(count>0){
                    sql+=`and `
                }
            }
            pool.query(
                sql,
                val,
                (error,results,fields)=>{
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null,results)
                }
            )      
        } catch (error) {
            res.send({"status":"failed","message":"Failed to filter orders ...."})
        }
    },
    checkPurchaseOrderPresence:async(po_no)=>{
        const value=await query(`select * from supplier_PO where supplier_po_no=?`,[po_no])
        return (value.length>0);
    },
    checkLaptopPresence: async(laptop_serial_no)=>{
        const value=await query( `select * from inventory where laptop_serial_no=?`,[laptop_serial_no])
        return (value.length>0);   
    },
    giveNoOfLaptops: async(po_no)=>{
        const value=await query( `select * from supplier_PO where supplier_po_no=?`,[po_no])
        return (value[0].no_of_laptops);   
    },
    giveSupplierPurchaseOrderNo: async(no)=>{
        const value=await query( `select * from inventory where laptop_serial_no=?`,[no])
        return (value[0].po_no);   
    }
}