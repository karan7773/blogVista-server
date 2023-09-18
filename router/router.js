const express=require('express')
const cors=require('cors')
const {registerUser,loginUser,getProfile,logout}=require('../controller/authController')

const router=express.Router();

//middleware
router.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))

// router.get('/',test);
router.post('/register',registerUser) 
router.post('/login',loginUser)
router.get('/profile',getProfile)
router.post('/logout',logout)

module.exports = router 