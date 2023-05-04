import express from "express"
import inventoryController from "./inventory.controller.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const inventoryRoutes=express.Router();

// route level middleware
inventoryRoutes.use('/add',checkUserAuth)
inventoryRoutes.use('/update',checkUserAuth)
inventoryRoutes.use('/delete',checkUserAuth)
inventoryRoutes.use('/getAll',checkUserAuth)
inventoryRoutes.use('/filter',checkUserAuth)

// protected routes
inventoryRoutes.post('/add',inventoryController.add)
inventoryRoutes.patch('/update',inventoryController.update)
inventoryRoutes.delete('/delete',inventoryController.delete)
inventoryRoutes.get('/getAll',inventoryController.getAllLaptops)
inventoryRoutes.get('/filter',inventoryController.dynamicFilter)

// export
export default inventoryRoutes