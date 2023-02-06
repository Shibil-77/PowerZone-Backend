import express  from "express"
import {getUserData ,getUserAccess} from '../controllers/adminControllers'
const router = express.Router()

router.get('/getUsersData',getUserData)
router.get('/userAccess/:id',getUserAccess)

export default router






