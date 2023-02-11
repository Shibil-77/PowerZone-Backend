import { Express, Request, Response } from "express";
import userSchema from "../models/userSchema";
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
import { generateToken } from '../utils/jwt'
import { emailSenders } from '../utils/authUtils'
import { idText } from "typescript";
import bcrypt from "bcrypt"


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
                            const bcryptPassword = await bcrypt.hash(password, 10)
                            const newUser = new userSchema({
                                fullName, email, phone, password: bcryptPassword, date: new Date, isVerified: false, timeRanges,access:true
                            })
                            await newUser.save()
                            const url = 'verify'
                            await emailSenders(email, newUser.id, newUser.fullName,url)
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
                const { fullName, _id } = user
                const token =await generateToken(user.id)
                res.status(200).json({ message: "User verified successfully",user,token});
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
            const url = 'verify'
            await emailSenders(user.email, user.id, user.fullName,url)
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        return res.status(404).json({ message: "server error" })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (email !== null && password !== null) {
            const emailValid = emailRegex.test(email)
            if (emailValid) {
                const user = await userSchema.findOne({ email: email })
                if (user) {
                    if (await bcrypt.compare(password, user.password)) {
                        const token =await generateToken(user.id)
                        res.status(200).json({ message: "Login successful", token,user})
                    } else {
                        res.status(400).json({ message: "Invalid password" })
                    }
                } else {
                    res.status(400).json({ message: "Invalid email" })
                }
            } else {
                res.status(400).json({ message: "Invalid email" })
            }
        } else {
            res.status(400).json({ message: "Please fill all fields" })
        }
    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}

export const forgotPassword =  async (req: Request, res: Response) => {
    try {
        const { email,password} = req.body
        if (email!== null) {
            const emailValid = emailRegex.test(email)
            if (emailValid) {
                const user = await userSchema.findOne({ email: email })
                if (user) {
                    const url = 'resetPassword'
                    await emailSenders(email,user.id,user.fullName,url)
                    res.status(200).json({ message: "Email sent"})
                }else {
                    res.status(400).json({ message: "Invalid email" })
                }
            }else{
                res.status(400).json({ message: "Invalid email" })
            }
        }else{
            res.status(400).json({ message: "Please fill all fields" })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}


export const resetPassword = async (req: Request, res: Response) => {
    try { 
        const userId = req.params.id
        const {  password ,confirmPassword} = req.body
        if (userId!== null && password!== null && password.length<=8) {
        const user = await userSchema.findById({ _id: userId })
        if (user) {         
            const bcryptPassword = await bcrypt.hash(password, 10)
            if (bcryptPassword) {                
                user.password = await bcrypt.hash(password, 10)
                await user.save()
                res.status(200).json({ message: "Password reset successful" })
            }else{
                res.status(400).json({ message: "Invalid password" })
            }
        }
        else {
            res.status(400).json({ message: "User not found" })
        }
        }else {
        res.status(400).json({ message: "Please fill all fields" })
         }
        } catch (error) {
            return res.status(500).json({ message: "server error" })
        }
    }


