import express from "express"
import dcController from "./dc.controller.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const dcRoutes=express.Router();

// route level middleware
dcRoutes.use('/create',checkUserAuth)
dcRoutes.use('/addLaptopSNo',checkUserAuth)
dcRoutes.use('/update',checkUserAuth)
dcRoutes.use('/delete',checkUserAuth)
dcRoutes.use('/deleteLaptopSNo',checkUserAuth)
dcRoutes.use('/getAll',checkUserAuth)
dcRoutes.use('/getDetailDC',checkUserAuth)
dcRoutes.use('/filter',checkUserAuth)

// protected routes
dcRoutes.post('/create',dcController.create)
// dcRoutes.post('/addLaptopSNo',dcController.addLaptopSNo)
dcRoutes.patch('/update',dcController.update)
dcRoutes.delete('/delete',dcController.delete)
dcRoutes.delete('/deleteLaptopSNo',dcController.deleteLaptopSNo)
dcRoutes.get('/getAll',dcController.getAllDC)
dcRoutes.get('/getDetailDC',dcController.getDetailDC)
dcRoutes.get('/filter',dcController.dynamicFilter)

// export
export default dcRoutes