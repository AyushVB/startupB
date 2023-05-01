import express from "express"
import supplierPurchaseOrderController from "./supplierPurchaseOrder.controller.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const supplierPurchaseOrderRoutes=express.Router();

// route level middleware
supplierPurchaseOrderRoutes.use('/create',checkUserAuth)
supplierPurchaseOrderRoutes.use('/update',checkUserAuth)
supplierPurchaseOrderRoutes.use('/delete',checkUserAuth)
supplierPurchaseOrderRoutes.use('/getAll',checkUserAuth)
supplierPurchaseOrderRoutes.use('/getDetailPO',checkUserAuth)
supplierPurchaseOrderRoutes.use('/filter',checkUserAuth)

// protected routes
supplierPurchaseOrderRoutes.post('/create',supplierPurchaseOrderController.create)
supplierPurchaseOrderRoutes.patch('/update',supplierPurchaseOrderController.update)
supplierPurchaseOrderRoutes.delete('/delete',supplierPurchaseOrderController.delete)
supplierPurchaseOrderRoutes.get('/getAll',supplierPurchaseOrderController.getAllPO)
supplierPurchaseOrderRoutes.get('/getDetailPO',supplierPurchaseOrderController.getDetailPO)
supplierPurchaseOrderRoutes.get('/filter',supplierPurchaseOrderController.dynamicFilter)

// export
export default supplierPurchaseOrderRoutes