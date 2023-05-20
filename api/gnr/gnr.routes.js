import express from "express"
import gnrController from "./gnr.controller.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const gnrRoutes=express.Router();

// route level middleware
gnrRoutes.use('/create',checkUserAuth)
gnrRoutes.use('/addLaptopSNo',checkUserAuth)
gnrRoutes.use('/update',checkUserAuth)
gnrRoutes.use('/delete',checkUserAuth)
gnrRoutes.use('/deleteLaptopSNo',checkUserAuth)
gnrRoutes.use('/getAll',checkUserAuth)
gnrRoutes.use('/getDetailGNR',checkUserAuth)
gnrRoutes.use('/filter',checkUserAuth)

// protected routes
gnrRoutes.post('/create',gnrController.create)
// gnrRoutes.post('/addLaptopSNo',gnrController.addLaptopSNo)
gnrRoutes.patch('/update',gnrController.update)
gnrRoutes.delete('/delete',gnrController.delete)
gnrRoutes.delete('/deleteLaptopSNo',gnrController.deleteLaptopSNo)
gnrRoutes.get('/getAll',gnrController.getAllGNR)
gnrRoutes.get('/getDetailGNR',gnrController.getDetailGNR)
gnrRoutes.get('/filter',gnrController.dynamicFilter)

// export
export default gnrRoutes