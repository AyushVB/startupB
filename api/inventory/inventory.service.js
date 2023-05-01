import pool from '../../config/database.js'
import util from 'util';
const query = util.promisify(pool.query).bind(pool);

// insert updateByCNo deleteByID GetAllDetails DynamicFilter
export default{
    updateByLSNo:(no,newValues,callBack)=>{
        const updateQuery = 'UPDATE inventory SET ? WHERE laptop_serial_no = ?';
        pool.query(updateQuery, [newValues, no], (error, results) => {
            if(error){
                return callBack(error);
            }
            return callBack(null,results)
        });
    },
    deleteLaptop :(no,callBack)=>{
        pool.query(
            `delete from inventory where laptop_serial_no=?`,
            [no],
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
    checkLaptopPresence: async(laptop_serial_no)=>{
        const value=await query( `select * from inventory where laptop_serial_no=?`,[laptop_serial_no])
        return (value.length>0);   
    }
}