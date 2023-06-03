const express=require("express")

const {connection}=require("./configs/db")
const {userRouter}=require("./routes/user.routes")
const {olxRouter}=require("./routes/olx.routes")
const {authenticate}=require("./middlewares/authenticate.middlewares")
require("dotenv").config()

const cors=require("cors")

const app=express()
app.use(express.json())

app.use(cors())




app.get("/",(req,res)=>{
    res.send("Wellcome to Olx")
})
app.use("/users",userRouter)

app.use(authenticate)

app.use("/olx",olxRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected with MongoDb")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running ${process.env.port}`)
})