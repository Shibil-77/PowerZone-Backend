import express  from "express"
import {getUserData ,getUserAccess,adminLogin} from '../controllers/adminControllers'
const router = express.Router()

router.get('/getUsersData',getUserData)
router.get('/userAccess/:id',getUserAccess)
router.post('/adminLogin',adminLogin)

export default router






