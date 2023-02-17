import { Request, Response } from "express";
import userSchema from "../models/userSchema";
import bookingSchema from "../models/bookingSchema";
import portSchema from "../models/portSchema";


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
            console.log("==================");
            
            res.status(200).send({ newBookings })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const findChargingPort =async (req: Request, res: Response) => {
    try {
        console.log("=================");
        
        const chargingData = await portSchema.find({ userId: req.body.userId })
        if (chargingData) {
            res.status(200).send({ chargingData })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}