const express = require("express")

const { OlxModel } = require("../model/olx.model")
const {authenticate}=require("../middlewares/authenticate.middlewares")
const olxRouter = express.Router()


//get the data
olxRouter.get("/", async (req, res) => {
    let query = req.query
    try {
        const data = await OlxModel.find(query)
        res.send(data)
    } catch (error) {
        res.send({"msg":"Cannot get the data","error":error.message})
    }
})
//post data
olxRouter.post("/create",async(req,res)=>{
    try {
        const data=new OlxModel(req.body)
        await data.save()
        res.send({"msg":"successfully created data"})
    } catch (error) {
        res.send({"msg":"cannot create the data","error":error.message})
    }
})

//edit data
olxRouter.patch("/update/:id",authenticate,async(req,res)=>{
    const id=req.params.id
    const payload=req.body
    const olx=await OlxModel.findOne({"_id":id})
    const userID_in_olx=olx.user
    const userID_makingReq=req.body.user

    try {
        if(userID_makingReq!=userID_in_olx){
            res.send({"msg":"You are not Authorized"})
        }else{
            await OlxModel.findByIdAndUpdate({"_id":id},payload)
            res.send({"msg":`olx data with id:-${id} has been updated`})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went Wrong","error":error.message})
    }
})




//delete data
olxRouter.delete("/delete/:id",authenticate,async(req,res)=>{
    const id=req.params.id
    const payload=req.body
    const olx=await OlxModel.findOne({"_id":id})
    const userID_in_olx=olx.user
    const userID_makingReq=req.body.user

    try {
        if(userID_makingReq!=userID_in_olx){
            res.send({"msg":"You are not Authorized"})
        }else{
            await OlxModel.findByIdAndDelete({"_id":id})
            res.send({"msg":`olx data with id:-${id} has been Deleted`})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went Wrong","error":error.message})
    }
})

//sort

olxRouter.get("/lth",async(req,res)=>{
    let query=req.query
    const data=await OlxModel.find(query).sort({"postedAt":1})
    res.send(data)
})
olxRouter.get("/htl",async(req,res)=>{
    let query=req.query
    const data=await OlxModel.find(query).sort({"postedAt":-1})
    res.send(data)
})
module.exports = { olxRouter }