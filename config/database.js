import { createPool } from 'mysql';
import dotenv from 'dotenv'
dotenv.config()
const pool=createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE,
    multipleStatements: true,
    connectionLimit:10
});

export default pool;