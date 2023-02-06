import { Request, Response } from "express";
import portSchema from "../models/portSchema"
import bookingSchema from "../models/bookingSchema"

export const addChargingPort = async (req: Request, res: Response) => {
   try {
      const { kW, rate, dayStart, dayEnd, timeStart, timeEnd, type, location, city, postalCode, country, userId } = req.body
      if (req.body) {
         const newPort = new portSchema({
            kW, rate, dayStart, dayEnd, timeStart, timeEnd, type, location, city, postalCode, country, userId, access: false
         })
         await newPort.save()
         res.status(200).json({ message: newPort.id })
      }
   } catch (error) {
      return res.status(500).json({ message: "error" })
   }
}

export const addMapValue = async (req: Request, res: Response) => {
   try {
      const { map, id } = req.body;
      if (req.body) {
         console.log(id);
         const myArray = id.split("#");
         console.log(myArray);
         await portSchema.updateOne({ _id: myArray[1] }, { $set: { map: map } },)
         res.status(200).json({ message: "MapValue successfully added" })
      } else {
         return res.status(404).json({ message: "server error" })
      }
   } catch (error) {
      return res.status(404).json({ message: "server error" })
   }
}

export const mapData = async (req: Request, res: Response) => {
   try {
      const mapValue = await portSchema.find()
      if (mapValue) {
         res.status(200).json(mapValue)
      }
   } catch (error) {
      return res.status(500).json({ message: "server error" })
   }
}

export const findPortData = async (req: Request, res: Response) => {
   try {
      const { userId, portId } = req.body;
      if (portId) {
         const myArray = portId.split("#");
         const portData = await portSchema.findOne({ portId:myArray[1] })
         console.log(portData);
         res.status(200).json(portData)
      }
   } catch (error) {
      res.status(500).json({ error: error })
   }
}


export const bookings = async (req: Request, res: Response) => {
   try { 
      const { time,date, id } = req.body;

       console.log(req.body)
      const newBooking = new bookingSchema({
        time,
        date,
        portId: req.body.id,
        userId: req.body.userId,
      })

      console.log(newBooking);
      
      await newBooking.save()
      res.status(200).json({ message: newBooking.id })
   } catch (error) {
        
   }
}
