
import express from 'express'
import  {register,verifyRegistration,emailReset} from '../controllers/authControllers'
const router = express.Router()


router.post('/register',register)
router.get('/verify/:userId',verifyRegistration)
router.get('/timeReset/:id',emailReset)

export default router  