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
    dayDetail: {
        type: Array,
        required: true
    },
    type:{
        type: String,
        require:true,
    },
    location:{
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