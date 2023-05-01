import express from "express"
import gnrDeviceRequiredController from "./gnr_device_required.controller.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const gnrDeviceRequiredRoutes=express.Router();

// route level middleware
gnrDeviceRequiredRoutes.use('/update',checkUserAuth)
gnrDeviceRequiredRoutes.use('/delete',checkUserAuth)
gnrDeviceRequiredRoutes.use('/getAll',checkUserAuth)
gnrDeviceRequiredRoutes.use('/filter',checkUserAuth)

// protected routes
gnrDeviceRequiredRoutes.patch('/update',gnrDeviceRequiredController.update)
gnrDeviceRequiredRoutes.delete('/delete',gnrDeviceRequiredController.delete)
gnrDeviceRequiredRoutes.get('/getAll',gnrDeviceRequiredController.getAllLaptops)
gnrDeviceRequiredRoutes.get('/filter',gnrDeviceRequiredController.dynamicFilter)

// export
export default gnrDeviceRequiredRoutes