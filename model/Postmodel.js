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
    }
})

const PostModel=mongoose.model('Post',PostSchema);

module.exports=PostModel;