import {Router} from "express"
import upload from "../middlewares/upload.js"
import kostController from "../controllers/kostController.js";
import landlordController from "../controllers/landlordController.js";

const landlordRoute = Router()

// landlordRoute.get("/dashboard")
landlordRoute.get("/dashboard/kost", kostController.getAllKosts)
landlordRoute.get("/dashboard/kost/:kostId", kostController.getKostById)
landlordRoute.get("/transaction", landlordController.getAllBookings)
// landlordRoute.get("/transaction/booking?=")

landlordRoute.post("/dashboard/kost/files/:kostId", upload.single("image"), kostController.uploadImage)
landlordRoute.post("/dashboard/kost", kostController.createKost)

landlordRoute.patch("/dashboard/kost/:kostId", kostController.updateKostById)
landlordRoute.patch("/transaction/booking/:bookingId", landlordController.updateBookingStatus)

landlordRoute.delete("/dashboard/kost/:kostId", kostController.deleteKost)

export default landlordRoute