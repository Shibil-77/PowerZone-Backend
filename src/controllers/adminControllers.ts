import { Express, Request, Response } from "express";
import userSchema from "../models/userSchema";
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
import bcrypt from "bcrypt"
import adminSchema from '../models/admin'
import { generateToken } from '../utils/jwt'
import portSchema from "../models/portSchema"
import bookingSchema from "../models/bookingSchema";

export const getUserData = async (req: Request, res: Response) => {
   try {
      const userData = await userSchema.find()
      if (userData) {
         res.status(200).json(userData);
      } else {
         res.status(500).json({ message: "server error" });
      }
   } catch (error) {
      res.status(500).json({ message: "server error" });
   }
}


export const getUserAccess = async (req: Request, res: Response) => {
   try {
      const id = req.params.id
      const userData: any = await userSchema.findOne({ _id: id })
      if (userData) {
         if (userData.access) {
            userData.access = false
         }else{
            userData.access = true
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


export const adminLogin =  async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body
      if (email !== null && password !== null) {
          const emailValid = emailRegex.test(email)
          if (emailValid) {
              const admin = await adminSchema.findOne({ email: email })
              if (admin) {
                  if (await bcrypt.compare(password, admin.password)) {
                      const adminToken =await generateToken(admin.id)
                      res.status(200).json({ message: "Admin Login successful",admin,adminToken})
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



export const getPortData = async (req: Request, res: Response) => {
   try {
      const portData = await portSchema.find()
      if (portData) {
         res.status(200).json(portData)
      }
   } catch (error) {
      return res.status(500).json({ message: "server error" })
   }
}

export const portAccess =  async (req: Request, res: Response) => {
   try { 
      const id = req.params.id
      const portData: any = await portSchema.findOne({ _id: id })
      if (portData) {
         if (portData.access) {
            portData.access = false
         }else{
            portData.access = true
         }
         const result = await portData.save()
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


export const adminFindNewBookings = async (req: Request, res: Response) => {
   try {
      const bookingData = await bookingSchema.find()
      if (bookingData) {
         res.status(200).json(bookingData)
      }
   } catch (error) {
      return res.status(500).json({ message: "server error" })
   }
}

export const getDashBoardData =  async (req: Request, res: Response) => {
   try {
      const bookingData = await bookingSchema.aggregate([
         {
            $group: {
              _id: {
                day: { $dayOfMonth: '$date' }
              },
              count: { $count: {} }
            }
         }
      ])

       console.log(bookingData,"bookingData");
       
     return res.status(200).json(bookingData)
      // if (bookingData) {
      //    res.status(200).json(bookingData)
      // }
   } catch (error) {
      return res.status(500).json({ message: "server error" })
   }
}

export const salesReport = async (req: Request, res: Response) => {
   console.log("--------------0-0-0-0-0-0-------");
   
   try {
      const salesData = await bookingSchema.aggregate([
         {
            $group: {
              _id: {
                day: { $dayOfMonth: '$date' }
              },
              count: { $count: {} }
            }
         }
      ])

       console.log(salesData,"salesData");
       
     return res.status(200).json(salesData)
      // if (bookingData) {
      //    res.status(200).json(bookingData)
      // }
   } catch (error) {
      return res.status(500).json({ message: "server error" })
   }
}