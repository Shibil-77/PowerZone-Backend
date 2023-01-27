import { Express, Request, Response } from "express";
import userSchema from "../models/userSchema";

export const getUserData = async(req:Request, res:Response) => {
    try {
      const  userData =await userSchema.find()
      console.log(userData);
         if(userData){
            res.status(200).json(userData);
         }else {
            res.status(500).json({ message: "server error" });
         }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"});
    }
}