import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    portId: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    status:{
        type:String,
        default:true,

    }
    
})

export default mongoose.model("bookingSchema", bookingSchema);