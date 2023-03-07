import express  from "express"
import {getUserData ,getUserAccess,adminLogin,getPortData,portAccess,adminFindNewBookings,getDashBoardData,salesReport} from '../controllers/adminControllers'
const router = express.Router()

router.get('/getUsersData',getUserData)

router.get('/userAccess/:id',getUserAccess)

router.post('/adminLogin',adminLogin)

router.get('/getPortData',getPortData)

router.get('/portRequest/:id',portAccess)

router.get('/adminFindNewBookings',adminFindNewBookings)

router.get('/dashBoard',getDashBoardData)

router.get('/salesReport',salesReport)

export default router






