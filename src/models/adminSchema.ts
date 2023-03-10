import mongoose from "mongoose";

const adminSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type:Boolean,
        required: true
    }
    })

export default mongoose.model("admin", adminSchema);
