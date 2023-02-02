
import express from 'express'
import  {register,verifyRegistration,emailReset,login,forgotPassword,resetPassword} from '../controllers/authControllers'
const router = express.Router()


router.post('/register',register)
router.get('/verify/:userId',verifyRegistration)
router.get('/timeReset/:id',emailReset)
router.post('/login',login)
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword/:id/',resetPassword)


export default router  