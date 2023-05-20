import pool from '../../config/database.js';
import util from 'util';
const query = util.promisify(pool.query).bind(pool);

export default{
    create:(user_id,data,callBack)=>{
        try {
            let val=[];
    
            let sql = `insert into GNR (gnr_challan_no,gnr_date,c_no,collection_request_date,collection_type,collected_by,collected_date,attached_scanned_document,transport_amount,note_remark,user_id,no_of_laptops) values (?,?,?,?,?,?,?,?,?,?,?,?); `;

            val.push(data.gnr_challan_no,data.gnr_date,data.c_no,data.collection_request_date,data.collection_type,data.collected_by,data.collected_date,data.attached_scanned_document,data.transport_amount,data.note_remark,user_id,data.no_of_laptops)
            
            for (let i = 0; i < data.no_of_laptops; i++) {
                sql +=`insert into GNR_device_required(gnr_challan_no,laptop_serial_no) values (?,?); `
                val.push(data.gnr_challan_no,data.laptops[i])
                sql +=`UPDATE inventory SET ? WHERE laptop_serial_no = ?; `
                val.push({available:true},data.laptops[i])
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
            res.send({"status":"failed","message":"Failed to create GNR...."})                
        }    
    },
    addLaptopSNo:(no,laptop_serial_no,callBack)=>{
        try {
            let val=[];
            let sql =`insert into GNR_device_required(gnr_challan_no,laptop_serial_no) values (?,?); `
            val.push(no,laptop_serial_no)
            sql +=`UPDATE inventory SET ? WHERE laptop_serial_no = ?; `
            val.push({available:true},laptop_serial_no)
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
            res.send({"status":"failed","message":"Failed to add laptop in GNR...."})
        }
    },
    updateGNR:(no,newValues,callBack)=>{
        const updateQuery = 'UPDATE GNR SET ? WHERE gnr_challan_no = ?';
        pool.query(updateQuery, [newValues,no], (error, results) => {
            if(error){
                return callBack(error);
            }
            return callBack(null,results)
        });             
    },
    deleteGNR :(no,callBack)=>{    
        pool.query(
            `UPDATE inventory SET ? WHERE laptop_serial_no in(select laptop_serial_no from GNR_device_required where gnr_challan_no=?);delete from GNR_device_required where gnr_challan_no=?;delete from GNR where gnr_challan_no=?;`,
            [{available:false},no,no,no],
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
            `UPDATE inventory SET ? WHERE laptop_serial_no=?;delete from GNR_device_required where gnr_challan_no=? and laptop_serial_no=?`,
            [{available:false},laptop_serial_no,no,laptop_serial_no],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getAllGNR:callBack=>{
        pool.query(
            `SELECT * FROM GNR`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getDetailGNR :(no,callBack)=>{
        pool.query(
            `select * from GNR where gnr_challan_no=?;SELECT * FROM GNR_device_required WHERE gnr_challan_no=?;`,
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
            let sql = `select * from GNR `;
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
    checkGNRPresence:async(no)=>{
        const value=await query(`select * from GNR where gnr_challan_no=?`,[no])
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
    checkLaptopInGNR:async(no,laptop_serial_no)=>{
        const value=await query( `select laptop_status from GNR_device_required where gnr_challan_no=? and laptop_serial_no=? `,[no,laptop_serial_no])
        return (value.length>0);   
    },
    areAllElementsUnique:async(arr)=> {
        const uniqueSet = new Set(arr);
        return uniqueSet.size === arr.length;
      }
}