import express  from "express"
import {getUserData ,getUserAccess,adminLogin,getPortData,portAccess,adminFindNewBookings} from '../controllers/adminControllers'
const router = express.Router()

router.get('/getUsersData',getUserData)

router.get('/userAccess/:id',getUserAccess)

router.post('/adminLogin',adminLogin)

router.get('/getPortData',getPortData)

router.get('/portRequest/:id',portAccess)

router.get('/adminFindNewBookings',adminFindNewBookings)

export default router






