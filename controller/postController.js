const Post=require('../model/Postmodel')
const newPost=async (req,res)=>{
    try{
        const {title,summary,content}=req.body;

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

        const post=await Post.create({
            title:title,
            summary:summary,
            content:content
        })
        return res.json(post);
    }catch(err){
        console.log(err);
    }
}

const getAllPosts=async (req,res)=>{
    try{
        const posts=await Post.find({});
        // console.log(posts);
        return res.json(posts)
    }catch(err){
        console.log(err);
    }
}

module.exports={
    newPost,
    getAllPosts
}