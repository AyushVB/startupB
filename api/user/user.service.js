import pool from '../../config/database.js'

// findOne insert findByIdAndUpdate findById
export default{
    findOne:(email,callBack)=>{
        pool.query(
            `select * from user where email=?`,
            [email],
            (error,results,fields)=>{
                if(error){
                    console.log(error)
                    return callBack(error);
                }
                
                return callBack(null,results)
            }
        )
    },
    insert:(data,callBack)=>{
        pool.query(
            `insert into user (name,email,password) values (?,?,?)`,
            [
              data.name,
              data.email,
              data.password
            ],
            (error,results ,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    findByIdAndUpdate:(id,password,callBack)=>{
        pool.query(
            `update user set password=? where user_id=?`,
            [
                password,id
            ],
            (error,results ,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    findById:(id,callBack)=>{
        pool.query(
            `select * from user where user_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        )
    }
}
