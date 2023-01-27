import { Express, Request, Response } from "express";
import userSchema from "../models/userSchema";
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
import { generateToken } from '../utils/jwt'
import { emailSenders } from '../utils/authUtils'
import { idText } from "typescript";

export const register = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password, phone, confirmPassword } = req.body
        if (fullName !== null && email !== null && phone !== null && password !== null) {
            if (password === confirmPassword) {
                const userExist = await userSchema.findOne({ email: email })
                if (!userExist) {
                    if (phone !== null && phone !== undefined && phone.length == 10) {
                        const emailValid = emailRegex.test(email)
                        if (emailValid) {
                            let timeRanges = Math.floor((Math.random() * 1000000) + 1)
                            const newUser = new userSchema({
                                fullName, email, phone, password, date: new Date, isVerified: false, timeRanges
                            })
                            await newUser.save()
                            await emailSenders(email, newUser.id, newUser.fullName)
                            res.status(200).json({ message: "User created successfully", userId: newUser.id, timeRanges })
                        } else {
                            res.status(400).json({ message: "Invalid Email" })
                        }
                    } else {
                        res.status(400).json({ message: "Invalid phone number" })
                    }
                } else {
                    return res.status(400).json({ message: "User already exist" })
                }
            } else {
                res.status(400).json({ message: "Passwords do not match" })
            }
        } else {
            return res.status(400).json({ message: "Please fill all fields" })
        }
    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}



export const verifyRegistration = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await userSchema.findById({ _id: userId })
        if (user) {
            if (user.timeRanges) {
                user.isVerified = true;
                user.save();
                res.status(200).json({ message: "User verified successfully" })
            } else {
                res.status(400).json({ message: "User not verified time is over limit" })
            }
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        return res.status(500).json({ message: 'server error' })
    }
}



export const emailReset = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userSchema.findById({ _id: id })
        if (user) {
            const timeRange = Math.floor((Math.random() * 1000 + 1))
            user.timeRanges = timeRange
            await user.save()
            await emailSenders(user.email, user.id, user.fullName)
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
     return res.status(404).json({ message:"server error"})
    }
}