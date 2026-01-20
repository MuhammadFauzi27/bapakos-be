import { Router } from 'express'
import authRoute from "./authRoute.js"
import landlordRoute from "./landlordRoute.js"
import tenantRoute from "./tenantRoute.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const routes = Router()

routes.use("/auth", authRoute)
routes.use("/landlord", authMiddleware,landlordRoute)
routes.use("/tenant", authMiddleware,tenantRoute)

export default routes