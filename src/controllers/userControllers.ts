import { Express, Request, Response } from "express";
import userSchema from "../models/userSchema";

export const getUserData = async (req: Request, res: Response) => {
   try {
      const userData = await userSchema.find()
      console.log(userData);
      if (userData) {
         res.status(200).json(userData);
      } else {
         res.status(500).json({ message: "server error" });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
   }
}

export const getUserAccess = async (req: Request, res: Response) => {
   try {
      console.log(req.params.id);
      const id = req.params.id
      const userData: any = await userSchema.findOne({ _id: id })
      if (userData) {
         console.log(userData.access);
         if (userData.access) {
            userData.access = false
         } else {
            userData.access
         }
         const result = await userData.save()
         if (result) {
            res.status(200).json('success')
         } else {
            res.status(500).json('server error')
         }
      } else {
         res.status(500).json('server error')
      }
   } catch (error) {
      res.status(500).json('server error')
   }

}
