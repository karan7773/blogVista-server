const User=require('../model/UserModel')
const {hashPassword,comparePassword}=require('../helpers/auth')
const jwt=require('jsonwebtoken');  

const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        //check if name is entered
        if(!name){
            return res.json({
                error:'Name is required'
            })
        }

        if(!email){
            return res.json({
                error:'Enter email'
            })
        }

        //check if password is entered
        if(!password || password.length<6){
            return res.json({
                error:'Password is required and should be at least 6 characters long'
            })
        }

        //check email
        const exists=await User.findOne({email});
        if(exists){
            return res.json({
                error:'Email is taken already'
            })
        }

        const hashedPassword=await hashPassword(password);
        // console.log(hashPassword)
        const user=await User.create({
            name,email,password:hashedPassword
        })
        return res.json(user);

    }catch(err){
        console.log(err);
    }
}

const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        // console.log(req.body)
        // check if user exists
        const user=await User.findOne({email});
        if(!user){
            // console.log(user);
            return res.json({
                error:"User does not exist"
            })
        }
        // console.log("tyghj")
        //check if password match
        const match=await comparePassword(password,user.password)
        
        if(match){
            jwt.sign({email:user.email,id:user._id,name:user.name}, process.env.JWT_SECRET ,{}, (err,token)=>{
                if(err) throw err;
                // console.log('token : ',token);
                res.cookie('token',token).json(user)
            })
            // console.log('match')
            // return res.json('password matched')
        }
        if(!match){
            res.json({
                error:"Password doesn't match"
            })
        }
    }catch(err){
        console.log(err);
    }
}

const getProfile=(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

const logout=(req,res)=>{
    res.cookie('token','').json('ok')
}

module.exports={
    registerUser,
    loginUser,
    getProfile,
    logout
}