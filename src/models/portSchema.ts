import mongoose from "mongoose";

// {kW,rate,dayStart,dayEnd,timeStart,timeEnd,type,address,city,postalCode,country}
const portSchema = new mongoose.Schema({
    kW: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    dayStart: {
        type: String,
        required: true
    },
    dayEnd: {
        type: String,
        required: true
    },  
    timeStart: {
        type: String,
        default: false
    },
    timeEnd:{
        type: String,
        required: true
    },
    type:{
        type: String,
        require:true,
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
    ,
    postalCode:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    map:{
        type:Array
    },
    userId: {
        type: String,
        require:true
    },
    access:{
        type:Boolean,
        required:true
    }
})

export default mongoose.model("portSchema", portSchema);