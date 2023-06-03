const express=require("express")
const { UserModel }=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")


const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const user=await UserModel.find({email})
        // console.log(user)
        if(user.length>0){
            res.send({"msg":"User already register"})
        }else{
            bcrypt.hash(password,5,async function(err,hash){
                if(err){
                    res.send({"msg":"Something Went Wrong","error":err.message})
                }else{
                    const user=new UserModel({name,email,password:hash})
                    await user.save()
                    res.send({"msg":"New user Register"})
                }
            })
        }
    } catch (error) {
        res.send({"msg":"Something Went Wrong","error":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,result){
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai",{expiresIn:"7h"})
                    res.send({"msg":"Logged in ","token":token,"user":user[0]._id})
                }else{
                    res.send({"msg":"wrong creadential"})
                }
            })
        }
    } catch (error) {
        res.send({"msg":"Something Went Wrong","error":error.message})
    }
})

module.exports={userRouter}