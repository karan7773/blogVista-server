const express=require('express')
const cors=require('cors')
const {registerUser,loginUser,getProfile,logout}=require('../controller/authController')
const {newPost,getAllPosts}=require('../controller/postController')

const router=express.Router();

//middleware
router.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))

//login routes
router.post('/login',loginUser)

//resister new user route
router.post('/register',registerUser) 

//get user profile route
router.get('/profile',getProfile)

//logout route
router.post('/logout',logout)

//create new post route
router.post('/newpost',newPost);

//get all posts route
router.get('/getAllPosts',getAllPosts)
module.exports = router 