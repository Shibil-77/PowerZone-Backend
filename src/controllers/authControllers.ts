import { Express, Request, Response } from "express";
import nodemailer from "nodemailer";
import userSchema from "../models/userSchema";
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
import {generateToken} from '../utils/jwt'

export const register = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { fullName, email, password, phone, confirmPassword } = req.body
        if (fullName !== null && email !== null && phone !== null && password !== null) {
            if (password === confirmPassword) {
                const userExist = await userSchema.findOne({ email: email })
                if (!userExist) {
                    console.log(phone.length);
                    if (phone !== null && phone !== undefined && phone.length == 10 ) {
                        const emailValid = emailRegex.test(email)
                        if (emailValid) {
                             const newUser = new userSchema({
                                fullName,
                                email,
                                phone,
                                password,
                                date: new Date,
                                isVerified: false
                             })
                             await newUser.save()
                              let id:string = newUser._id.toString()
                             const userJwt = generateToken(id)
                             const transporter = nodemailer.createTransport({
                                service: "gmail",
                                auth: {
                                    user: process.env.EMAIL,
                                    pass: process.env.PASSWORD
                                }
                            })
                            const mailOptions = {
                                from: process.env.EMAIL,
                                to: newUser.email,
                                subject: "Verify your account",
                                text: `Hi ${newUser.fullName},\n\nPlease verify your account by clicking
                                <a href="http://localhost:4000/api/user/verify/${newUser._id}/${userJwt}">
                                here</a>.\n\nThanks,`
                            }
                                transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("Email sent: " + info.response);
                                }
                            })
                           console.log("=============2=========",newUser);
                           
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
        }
    } catch (error) {
        
    }
   
}

export const verifyRegistration = (req: Request, res: Response)=>{
    console.log(req.params.id); 
}