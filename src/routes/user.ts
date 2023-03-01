import express from 'express'
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware");
import {getProfileData,findNewBookings,portDetailsFinding,deleteChargingPort,bookingCancel} from '../controllers/user'


router.get('/getProfileData',authMiddleware,getProfileData)

router.get("/findNewBookings",authMiddleware,findNewBookings)

router.get('/portDetailsFinding',authMiddleware,portDetailsFinding)

router.get('/deletePort/:id',deleteChargingPort)


router.get('/bookingCancel/:id',bookingCancel)


export default router