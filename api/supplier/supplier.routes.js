import express from "express"
import supplierController from "./supplier.controller.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const supplierRoutes=express.Router();

// route level middleware
supplierRoutes.use('/create',checkUserAuth)
supplierRoutes.use('/update',checkUserAuth)
supplierRoutes.use('/delete',checkUserAuth)
supplierRoutes.use('/getAll',checkUserAuth)
supplierRoutes.use('/getDetailProfile',checkUserAuth)
supplierRoutes.use('/filter',checkUserAuth)

// protected routes
supplierRoutes.post('/create',supplierController.create)
supplierRoutes.patch('/update',supplierController.update)
supplierRoutes.delete('/delete',supplierController.delete)
supplierRoutes.get('/getAll',supplierController.getAllProfile)
supplierRoutes.get('/getDetailProfile',supplierController.getDetailProfile)
supplierRoutes.get('/filter',supplierController.dynamicFilter)

// export
export default supplierRoutes