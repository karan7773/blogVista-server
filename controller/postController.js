const Post=require('../model/Postmodel')
const jwt=require('jsonwebtoken');  

const newPost=async (req,res)=>{
    try{
        const {title,summary,content,files}=req.body;

        if(!title){
            return res.json({
                error:'Title should be specified'
            })
        }

        if(!summary){
            return res.json({
                error:'Summary must'
            })
        }
        const {token}=req.cookies;
        if(token){
            jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
                if(err) throw err;
                const post=await Post.create({
                    title:title,
                    summary:summary,
                    content:content,
                    createdAt: new Date(),
                    author:user.id,
                    image:files,
                    like:[]
                })
                return res.json(post);
            })
        }else{
        res.json(null)
    }
        
    }catch(err){
        console.log(err);
    }
}

const getAllPosts=async (req,res)=>{
    try{
        const posts=await Post.find({})
        .populate('author')
        .sort({createdAt:-1})
        .limit(20);
        // console.log(posts);
        return res.json(posts)
    }catch(err){
        console.log(err);
    }
}

const getPost=async(req,res)=>{
    const {id}=req.params;
    try{
        const post=await Post.findById(id).populate('author',['name']);
        return res.json(post)
    }catch(error){
        console.log(error);
    }
}

const deletePost=async(req,res)=>{
    const {id}=req.params;
    await Post.findByIdAndDelete(id).then(() => {
        res.send("deleted successfully")
        // console.log("deleted successfully");  
    }).catch((err) => {
        console.log(err);        
    });
}

const UpdatePost=async(req,res)=>{
    const {id}=req.params;
    try{
        const {title,summary,content,files}=req.body;
        // console.log(files);

        if(!title){
            return res.json({
                error:'Title should be specified'
            })
        }

        if(!summary){
            return res.json({
                error:'Summary must'
            })
        }
        const {token}=req.cookies;
        if(token){
            jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
                if(err) throw err;
                const post=await Post.findByIdAndUpdate(id,{
                    title:title,
                    summary:summary,
                    content:content,
                    createdAt: new Date(),
                    author:user.id,
                    image:files
                })
                return res.json(post);
            })
        }else{
        res.json(null)
    }
        
    }catch(err){
        console.log(err);
    }
}

const LikePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        console.log(req.body.user_id);
        if(post.like.filter((l)=>l.user==req.body.user_id).length>0){
            return res.status(409).send("You have already Liked this Post");
        }
        else{
            await post.like.push({user: req.body.user_id});
            await post.save();
            return res.status(201).send(post.like); 
        }  
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const  DislikePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.like.filter((l)=>l.user==req.body.user_id).length===0){
            return res.status(409).send("You have not yet Liked this Post");
        }
        else{
            const removeIdx=post.like.map((l)=>l.user.toString())
            post.like.splice(removeIdx,1)
            await post.save()
            return res.status(201).send(post.like); 
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");    
    }
}

module.exports={
    newPost,
    getAllPosts,
    getPost,
    deletePost,
    UpdatePost,
    LikePost,
    DislikePost
}