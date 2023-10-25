const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    title:{
        type:String
    },
    summary:{
        type:String
    },
    content:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{
        type:String
    }
})

const PostModel=mongoose.model('Post',PostSchema);

module.exports=PostModel;