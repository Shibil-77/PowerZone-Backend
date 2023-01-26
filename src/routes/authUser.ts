
import express from 'express'
import  {register,verifyRegistration} from '../controllers/authControllers'
const router = express.Router()


router.post('/register',register)
router.get('/verify/:id',verifyRegistration)

export default router  