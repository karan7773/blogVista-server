const express=require('express')
const cors=require('cors')
const {registerUser,loginUser,getProfile,logout}=require('../controller/authController')
const {newPost,getAllPosts,getPost,deletePost,UpdatePost,LikePost}=require('../controller/postController')
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

//get specific post details
router.get('/post/:id',getPost)

//delete post 
router.delete('/post/:id',deletePost)

//update the post 
router.patch('/update/:id',UpdatePost)

//like Post
router.patch('/post/like/:id',LikePost)

module.exports = router 