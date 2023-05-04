import express from "express"
import customerController from "./customer.controller.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const customerRoutes=express.Router();

// route level middleware
customerRoutes.use('/create',checkUserAuth)
customerRoutes.use('/update',checkUserAuth)
customerRoutes.use('/delete',checkUserAuth)
customerRoutes.use('/getAll',checkUserAuth)
customerRoutes.use('/getDetailProfile',checkUserAuth)
customerRoutes.use('/filter',checkUserAuth)

// protected routes
customerRoutes.post('/create',customerController.create)
customerRoutes.patch('/update',customerController.update)
customerRoutes.delete('/delete',customerController.delete)
customerRoutes.get('/getAll',customerController.getAllProfile)
customerRoutes.get('/getDetailProfile',customerController.getDetailProfile)
customerRoutes.get('/filter',customerController.dynamicFilter)

// export
export default customerRoutes