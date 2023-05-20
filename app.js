import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './api/user/user.routes.js'
import customerRoutes from './api/customer/customer.routes.js'
import supplierRoutes from './api/supplier/supplier.routes.js'
import supplierPurchaseOrderRoutes from './api/supplierPurchaseOrder/supplierPurchaseOrder.routes.js'
import inventoryRoutes from './api/inventory/inventory.routes.js'
import dcRoutes from './api/dc/dc.routes.js'
import GNRRoutes from './api/gnr/gnr.routes.js'
// import activityLogRoutes from './api/activityLog/activityLog.routes.js' 

dotenv.config()
const app=express()

const PORT=process.env.PORT || 3000

// CORS policy
app.use(cors())

// JSON
app.use(express.json())

// LOAD user routes
app.use('/api/user',userRoutes)

// LOAD customer routes
app.use('/api/customer',customerRoutes)

// LOAD supplier routes
app.use('/api/supplier',supplierRoutes)

// // LOAD supplierPO routes
app.use('/api/supplierPO',supplierPurchaseOrderRoutes)

// LOAD inventory routes
app.use('/api/inventory',inventoryRoutes)

// LOAD DC routes
app.use('/api/dc',dcRoutes)

// LOAD GNR routes
app.use('/api/gnr',GNRRoutes)

// // LOAD activityLog routes
// app.use('/api/activityLog',activityLogRoutes)

app.listen(PORT,()=>{
    console.log(`listen on PORT: ${PORT}`)
})