import express from "express"
import activityLogController from "./activityLog.controller.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const activityLogRoutes=express.Router();

// route level middleware
activityLogRoutes.use('/getAll',checkUserAuth)
activityLogRoutes.use('/filter',checkUserAuth)

// protected routes
activityLogRoutes.get('/getAll',activityLogController.getAllActivityLog)
// activityLogRoutes.get('/filter',activityLogController.dynamicFilter)

// export
export default activityLogRoutes