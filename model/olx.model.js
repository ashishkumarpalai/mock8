const mongoose = require("mongoose")

const olxSchema = mongoose.Schema({
    name:String,
    description:String,
    category:String,
    image:String,
    location:String,
    postedAt:Date,
    price:String,
    user:String
})

const OlxModel = mongoose.model("olxdatas", olxSchema)

module.exports = { OlxModel }