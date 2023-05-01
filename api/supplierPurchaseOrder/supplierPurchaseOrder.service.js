import pool from '../../config/database.js';
import util from 'util';
const query = util.promisify(pool.query).bind(pool);

// insert updateByCNo deleteByID GetAllDetails DynamicFilter
export default{
    create:(user_id,data,callBack)=>{
        try {
            let val=[];
    
            let sql = `insert into supplier_PO (supplier_po_no,supplier_no,po_date,purchase_invoice_no,purchase_invoice_date,date_of_received,attached_scanned_document ,user_id,no_of_laptops) values (?,?,?,?,?,?,?,?,?); `;

            val.push(data.supplier_po_no,data.supplier_no,data.po_date,data.purchase_invoice_no,data.purchase_invoice_date,data.date_of_received,data.attached_scanned_document,user_id,data.inventory.no_of_laptops)
            
            for (let i = 0; i < data.inventory.no_of_laptops; i++) {
                sql +=`insert into inventory(laptop_serial_no,laptop_brand,series,model_name ,model_id,part_no,processor,processor_generation,processor_clock_speed_GHz,processor_cache,system_memory_GB,expandable_memory_upto_GB,ram_technology,no_of_memory_slots,memory_slots,hdd_capacity_GB,hdd_type,hdd_rpm,optical_disk_drive ,odd_type,screen_size_inch,screen_resolution, screen_quality,touch_screen ,dedicated_graphic_processor ,graphic_processor_memory_capacity_GB,graphic_processor_make,graphic_memory_type,internal_mic ,speakers ,web_camera ,touchpad ,keyboard ,numeric_keyboard ,ethernet ,wireless_lan ,bluetooth ,no_usb_2,no_usb_3,hdmi_port ,vga_15_pin_port ,dvi_port ,multi_card_slot ,smart_card_slot ,power_adapter_serial_no,power_adapter_watt,power_adapter_rating_volt,power_adapter_rating_amp,battery_serial_no,battery_backup_hour,color,weight_KG,dimension,os,os_lic_coa_no,warranty_summary_year,warranty_start_date ,warranty_till_date ,po_no,laptop_condition,unit_price_inc_tax,laptop_status, available) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); `

                val.push(data.inventory.laptops[i].laptop_serial_no,data.inventory.laptops[i].laptop_brand,data.inventory.laptops[i].series,data.inventory.laptops[i].model_name ,data.inventory.laptops[i].model_id,data.inventory.laptops[i].part_no,data.inventory.laptops[i].processor,data.inventory.laptops[i].processor_generation,data.inventory.laptops[i].processor_clock_speed_GHz,data.inventory.laptops[i].processor_cache,data.inventory.laptops[i].system_memory_GB,data.inventory.laptops[i].expandable_memory_upto_GB,data.inventory.laptops[i].ram_technology,data.inventory.laptops[i].no_of_memory_slots,data.inventory.laptops[i].memory_slots,data.inventory.laptops[i].hdd_capacity_GB,data.inventory.laptops[i].hdd_type,data.inventory.laptops[i].hdd_rpm,data.inventory.laptops[i].optical_disk_drive ,data.inventory.laptops[i].odd_type,data.inventory.laptops[i].screen_size_inch,data.inventory.laptops[i].screen_resolution, data.inventory.laptops[i].screen_quality,data.inventory.laptops[i].touch_screen ,data.inventory.laptops[i].dedicated_graphic_processor ,data.inventory.laptops[i].graphic_processor_memory_capacity_GB,data.inventory.laptops[i].graphic_processor_make,data.inventory.laptops[i].graphic_memory_type,data.inventory.laptops[i].internal_mic ,data.inventory.laptops[i].speakers ,data.inventory.laptops[i].web_camera ,data.inventory.laptops[i].touchpad ,data.inventory.laptops[i].keyboard ,data.inventory.laptops[i].numeric_keyboard ,data.inventory.laptops[i].ethernet ,data.inventory.laptops[i].wireless_lan ,data.inventory.laptops[i].bluetooth ,data.inventory.laptops[i].no_usb_2,data.inventory.laptops[i].no_usb_3,data.inventory.laptops[i].hdmi_port ,data.inventory.laptops[i].vga_15_pin_port ,data.inventory.laptops[i].dvi_port ,data.inventory.laptops[i].multi_card_slot ,data.inventory.laptops[i].smart_card_slot ,data.inventory.laptops[i].power_adapter_serial_no,data.inventory.laptops[i].power_adapter_watt,data.inventory.laptops[i].power_adapter_rating_volt,data.inventory.laptops[i].power_adapter_rating_amp,data.inventory.laptops[i].battery_serial_no,data.inventory.laptops[i].battery_backup_hour,data.inventory.laptops[i].color,data.inventory.laptops[i].weight_KG,data.inventory.laptops[i].dimension,data.inventory.laptops[i].os,data.inventory.laptops[i].os_lic_coa_no,data.inventory.laptops[i].warranty_summary_year,data.inventory.laptops[i].warranty_start_date ,data.inventory.laptops[i].warranty_till_date ,data.supplier_po_no,data.inventory.laptops[i].laptop_condition ,data.inventory.laptops[i].unit_price_inc_tax,"ready",true)

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
            console.log(error)
            res.send({"status":"failed","message":"Failed to create supplier purchase order  ...."})                
        }
        
    },
    updateBySpoNo:(no,newValues,callBack)=>{
        const updateQuery = 'UPDATE supplier_PO SET ? WHERE supplier_po_no = ?';
        pool.query(updateQuery, [newValues, no], (error, results) => {
            if(error){
                return callBack(error);
            }
            return callBack(null,results)
        });             
    },
    deleteSupplierPO :(no,callBack)=>{
        pool.query(
            `delete from supplier_PO where supplier_po_no=?`,
            [no],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getAllPO:callBack=>{
        pool.query(
            `select * from supplier_PO `,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getDetailPO :(no,callBack)=>{
        pool.query(
            `select * from supplier_PO where supplier_po_no=?;SELECT * FROM inventory WHERE po_no = ?;`,
            [no,no],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },    
    dynamicFilter:(data,callBack)=>{
        try {
            let sql = `select * from supplier_PO `;
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
    checkSupplierPresence:async (supplier_no)=>{  
        const value=await query(`select * from supplier where supplier_no=?`,[supplier_no])
        return (value.length>0);
    }
}