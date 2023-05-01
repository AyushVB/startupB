import express from "express"
import dcDeviceRequiredController from "./dc_device_required.controller.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const dcDeviceRequiredRoutes=express.Router();

// route level middleware
dcDeviceRequiredRoutes.use('/update',checkUserAuth)
dcDeviceRequiredRoutes.use('/delete',checkUserAuth)
dcDeviceRequiredRoutes.use('/getAll',checkUserAuth)
dcDeviceRequiredRoutes.use('/filter',checkUserAuth)

// protected routes
dcDeviceRequiredRoutes.patch('/update',dcDeviceRequiredController.update)
dcDeviceRequiredRoutes.delete('/delete',dcDeviceRequiredController.delete)
dcDeviceRequiredRoutes.get('/getAll',dcDeviceRequiredController.getAllLaptops)
dcDeviceRequiredRoutes.get('/filter',dcDeviceRequiredController.dynamicFilter)

// export
export default dcDeviceRequiredRoutes