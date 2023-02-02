import express from 'express'
const authMiddleware = require("../middleware/authMiddleware");
import {addChargingPort,addMapValue,mapData} from '../controllers/portController';

const router = express.Router()

router.post('/addChargingPort',authMiddleware,addChargingPort)

router.patch('/addMapValue',authMiddleware,addMapValue)

router.get('/mapData',authMiddleware,mapData)


export default router