import express from 'express'
const authMiddleware = require("../middleware/authMiddleware");
import {addChargingPort} from '../controllers/portController';

const router = express.Router()

router.post('/addChargingPort',authMiddleware,addChargingPort)


export default router