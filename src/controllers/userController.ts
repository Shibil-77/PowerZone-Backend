import { Request, Response } from "express";
import userSchema from "../models/userSchema";
import bookingSchema from "../models/bookingSchema";
import portSchema from "../models/portSchema";
import mongoose, { Mongoose } from "mongoose";
import adminSchema from "../models/adminSchema";


export const getProfileData = async (req: Request, res: Response) => {
    try {
        const userData = await userSchema.findOne({ _id: req.body.userId }, { password: 0 });
        const newBookings = await bookingSchema.countDocuments({ userId: req.body.userId }, { date: { $gte: new Date() } })
        const portData = await portSchema.countDocuments({ userId: req.body.userId })
        if (newBookings !== null && portData !== null && userData !== null) {            
            res.status(200).send({ newBookings, portData, userData })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const findNewBookings = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        const newBookings = await bookingSchema.find({ userId: req.body.userId, date: { $gte: today } })
        if (newBookings) {
            res.status(200).send({ newBookings })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}


export const portDetailsFinding = async (req: Request, res: Response) => {
    try {
        const chargingData = await portSchema.find({ userId: req.body.userId })
        if (chargingData) {
            res.status(200).send({ chargingData })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const deleteChargingPort = async (req: Request, res: Response) => {
    try {
        await portSchema.deleteOne({ _id: req.params.id })
        res.status(200).send({ massage: "SuccessFully deleted" })
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const bookingCancel = async (req: Request, res: Response) => {
    try {
        await bookingSchema.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.status(200).send({ massage: "SuccessFully booking Cancel" })

    } catch (error) {
        res.status(500).send({ error })
    }
}

export const userPortBooking = async (req: Request, res: Response) => {
    try {
        const portData = await portSchema.find({ userId: req.body.userId });
         const filterData = portData.map((data)=>data.id)
        if (portData) {
            const bookingData = await bookingSchema.find({ portId: { $in: filterData } })
            res.status(200).send(bookingData)
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}

// export const addAdmin =  async (req: Request, res: Response) => {
//     try {
//         const newAdmin = new adminSchema({
//             email:"admin@gmail.com",password:"$2b$10$t2t0KNyRKfVno1TpLPmjieg737o63f5wLhsFTDo9Ik1nomtiCdLuu",isAdmin:true
//         })
//         console.log("----=-=--==--=--=---");
        
//        await newAdmin.save()
//        res.status(200).send({message:"Admin Added successfully"})
//     } catch (error) {
//        res.status(404).send({message:error})
//     }
// }