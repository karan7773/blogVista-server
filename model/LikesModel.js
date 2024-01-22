const mongoose=require('mongoose')

const LikeSchema=new mongoose.Schema({
    post_id:{
        type:mongoose.Types.ObjectId,
        ref:'Post'
    },
    iser_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const LikeModel=mongoose.model('Like',LikeSchema)

module.exports=LikeModel