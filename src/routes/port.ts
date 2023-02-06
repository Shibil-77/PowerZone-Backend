import express from 'express'
const authMiddleware = require("../middleware/authMiddleware");
import {addChargingPort,addMapValue,mapData,findPortData,bookings} from '../controllers/portController';

const router = express.Router()

router.post('/addChargingPort',authMiddleware,addChargingPort)

router.patch('/addMapValue',authMiddleware,addMapValue)

router.get('/mapData',authMiddleware,mapData)

router.post("/findPortData",authMiddleware,findPortData)

router.post('/booking',bookings)


export default router