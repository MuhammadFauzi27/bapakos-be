import {Router} from "express";
import tenantController from "../controllers/tenantController.js";
import kostController from "../controllers/kostController.js";

const tenantRoute = Router()

tenantRoute.get("/kost", tenantController.getAll)
tenantRoute.get("/kost/:kostId", kostController.getKostById)
tenantRoute.get("/bookings", tenantController.getAllHistoryTransaction)
// tenantRoute.get("/notifications")

tenantRoute.post("/booking", tenantController.createBooking)

export default tenantRoute