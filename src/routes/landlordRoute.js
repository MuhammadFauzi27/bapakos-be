import {Router} from "express"
import upload from "../middlewares/upload.js"
import kostController from "../controllers/kostController.js";

const landlordRoute = Router()

// landlordRoute.get("/dashboard")
// landlordRoute.get("/dashboard/kost")
// landlordRoute.get("/dashboard/kost/:kostId")
// landlordRoute.get("/transaction")
// landlordRoute.get("/api/landlord/transaction/booking?=")

landlordRoute.post("/dashboard/kost/files/:userId/:kostId", upload.single("image"), kostController.uploadImage)
landlordRoute.post("/dashboard/kost", kostController.createKost)

// landlordRoute.patch("/dashboard/kost/:kostId")
// landlordRoute.patch("/transaction/booking/:kostId")
//
// landlordRoute.delete("/dashboard/kost/:kostId")

export default landlordRoute