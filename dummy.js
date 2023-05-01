import { createPool } from 'mysql';
import dotenv from 'dotenv'
dotenv.config()

const pool=createPool({
    port:3306,
    host:"bns27fyidsdeff9ez3lh-mysql.services.clever-cloud.com",
    user:"ugxntvxzyjreutcm",
    password:"tIGAl7sPGg9osGja2wId",
    database:"bns27fyidsdeff9ez3lh",
    connectionLimit:10
});
pool.query(
    `show tables;`,
    [],
    (error,results,fields)=>{
        if(error){
            console.log(error);
        }
       
        console.log(results,"hello")
    }
)