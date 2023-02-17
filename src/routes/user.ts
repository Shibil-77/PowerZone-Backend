import express from 'express'
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware");
import {getProfileData,findNewBookings,findChargingPort} from '../controllers/user'


router.get('/getProfileData',authMiddleware,getProfileData)

router.get("/findNewBookings",authMiddleware,findNewBookings)


router.get('/findChargingPort',authMiddleware,findChargingPort)


export default router