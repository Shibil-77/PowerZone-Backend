import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },  
    isVerified: {
        type: Boolean,
        default: false
    },
    phone:{
        type: Number,
        required: true
    },
    access:{
        type: Boolean,
        require:true,
    }
    })

export default mongoose.model("UserSchema", userSchema);
