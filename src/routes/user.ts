import express from 'express'
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware");
import {getProfileData,findNewBookings,portDetailsFinding,deleteChargingPort,bookingCancel,userPortBooking} from '../controllers/userController'


router.get('/getProfileData',authMiddleware,getProfileData)

router.get("/findNewBookings",authMiddleware,findNewBookings)

router.get('/portDetailsFinding',authMiddleware,portDetailsFinding)

router.get('/deletePort/:id',authMiddleware,deleteChargingPort)

router.get('/bookingCancel/:id',authMiddleware,bookingCancel)

router.get('/userPortBooking',authMiddleware,userPortBooking)

// router.get('/addAdmin',addAdmin)

export default router