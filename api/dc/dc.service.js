import pool from '../../config/database.js';
import util from 'util';
const query = util.promisify(pool.query).bind(pool);

// insert updateByCNo deleteByID GetAllDetails DynamicFilter
export default{
    create:(user_id,data,callBack)=>{
        try {
            let val=[];
    
            let sql = `insert into DC (dc_challan_no,dc_date,c_no,delivered_by,customer_receiver_name,attached_scanned_document,transport_amount,note_remark,user_id,no_of_laptops) values (?,?,?,?,?,?,?,?,?,?); `;

            val.push(data.dc_challan_no,data.dc_date,data.c_no,data.delivered_by,data.customer_receiver_name,data.attached_scanned_document,data.transport_amount,data.note_remark,user_id,data.no_of_laptops)
            
            for (let i = 0; i < data.no_of_laptops; i++) {
                sql +=`insert into DC_device_required(dc_challan_no,laptop_serial_no) values (?,?); `
                val.push(data.dc_challan_no,data.laptops[i])
                sql +=`UPDATE inventory SET ? WHERE laptop_serial_no = ?; `
                val.push({available:false},data.laptops[i])
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
            res.send({"status":"failed","message":"Failed to create DC...."})                
        }    
    },
    addLaptopSNo:(no,laptop_serial_no,callBack)=>{
        try {
            let val=[];
            let sql =`insert into DC_device_required(dc_challan_no,laptop_serial_no) values (?,?); `
            val.push(no,laptop_serial_no)
            sql +=`UPDATE inventory SET ? WHERE laptop_serial_no = ?; `
            val.push({available:false},laptop_serial_no)
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
            res.send({"status":"failed","message":"Failed to add laptop in DC...."})
        }
    },
    updateDC:(no,newValues,callBack)=>{
        const updateQuery = 'UPDATE DC SET ? WHERE dc_challan_no = ?';
        pool.query(updateQuery, [newValues,no], (error, results) => {
            if(error){
                return callBack(error);
            }
            return callBack(null,results)
        });             
    },
    deleteDC :(no,callBack)=>{    
        pool.query(
            `UPDATE inventory SET ? WHERE laptop_serial_no in(select laptop_serial_no from DC_device_required where dc_challan_no=?);delete from DC_device_required where dc_challan_no=?;delete from DC where dc_challan_no=?;`,
            [{available:true},no,no,no],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    deleteLaptopSNo :(no,laptop_serial_no,callBack)=>{    
        pool.query(
            `UPDATE inventory SET ? WHERE laptop_serial_no=?;delete from DC_device_required where dc_challan_no=? and laptop_serial_no=?`,
            [{available:true},laptop_serial_no,no,laptop_serial_no],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getAllDC:callBack=>{
        pool.query(
            `SELECT * FROM DC`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getDetailDC :(no,callBack)=>{
        pool.query(
            `select * from DC where dc_challan_no=?;SELECT * FROM DC_device_required WHERE dc_challan_no=?;`,
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
            let sql = `select * from DC `;
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
    checkDCPresence:async(no)=>{
        const value=await query(`select * from DC where dc_challan_no=?`,[no])
        return (value.length>0);
    },
    checkLaptopPresence: async(laptop_serial_no)=>{
        const value=await query( `select * from inventory where laptop_serial_no=?`,[laptop_serial_no])
        return (value.length>0);   
    },
    checkCustomerPresence:async (customer_no)=>{  
        const value=await query(`select * from customer where customer_no=?`,[customer_no])
        return (value.length>0);
    },
    checkLaptopAvalability: async(laptop_serial_no)=>{
        const value=await query( `select available from inventory where laptop_serial_no=?`,[laptop_serial_no])
        return (value[0].available);   
    },
    checkLaptopStatus: async(laptop_serial_no)=>{
        const value=await query( `select laptop_status from inventory where laptop_serial_no=?`,[laptop_serial_no])
        return (value);   
    },
    checkLaptopInDC:async(no,laptop_serial_no)=>{
        const value=await query( `select laptop_status from DC_device_required where dc_challan_no=? and laptop_serial_no=? `,[no,laptop_serial_no])
        return (value.length>0);   
    },
    areAllElementsUnique:async(arr)=> {
        const uniqueSet = new Set(arr);
        return uniqueSet.size === arr.length;
      }
}