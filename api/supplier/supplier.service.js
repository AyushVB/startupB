import pool from '../../config/database.js'

// insert updateByCNo deleteByID GetAllDetails DynamicFilter
export default{
    insert:(user_id,data,callBack)=>{
        pool.query(
            `insert into supplier (supplier_name,address_line_1,address_line_2,city ,state ,pin_code,office_landline_1,office_landline_2,fax,mobile ,email_id ,website,contact_person_1_name,contact_person_1_designation,contact_person_1_email ,contact_person_2_name,contact_person_2_designation ,contact_person_2_email,mnc, sector,tax_GST_no,tax_PAN_no,tax_CIN,bank_account_name,bank_name,bank_account_no,bank_ifsc,bank_address,user_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.supplier_name,
                data.address_line_1,
                data.address_line_2,
                data.city,
                data.state,
                data.pin_code,
                data.office_landline_1,
                data.office_landline_2,
                data.fax,
                data.mobile,
                data.email_id,
                data.website,
                data.contact_person_1_name,
                data.contact_person_1_designation,
                data.contact_person_1_email,
                data.contact_person_2_name,
                data.contact_person_2_designation,
                data.contact_person_2_email,
                data.mnc,
                data.sector,
                data.tax_GST_no,
                data.tax_PAN_no,
                data.tax_CIN,
                data.bank_account_name,
                data.bank_name,
                data.bank_account_no,
                data.bank_ifsc,
                data.bank_address,
                user_id                
            ],
            (error,results ,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    updateBySNo:(sno,newValues,callBack)=>{
        const updateQuery = 'UPDATE supplier SET ? WHERE supplier_no = ?';
        pool.query(updateQuery, [newValues, sno], (error, results) => {
            if(error){
                return callBack(error);
            }
            return callBack(null,results)
        });
    },
    deleteSupplier :(sno,callBack)=>{
        pool.query(
            `delete from supplier where supplier_no=?`,
            [sno],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getAllProfiles:callBack=>{
        pool.query(
            `select * from supplier `,
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
            let sql = `select * from supplier `;
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
    }
}