import { Request, Response } from "express";
import portSchema from "../models/portSchema"
import bookingSchema from "../models/bookingSchema"

export const addChargingPort = async (req: Request, res: Response) => {
   try {
      const { kW, rate, dayDetail, type, location, city, postalCode, country, userId } = req.body
      if (req.body) {
         const newPort = new portSchema({
            kW, rate, dayDetail, type, location, city, postalCode, country, userId, access: false
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
         const myArray = id.split("#");
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
      const mapValue: object = await portSchema.find({ access: true })
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
         const today = new Date();
         const myArray = portId.split("#");
         const portData = await portSchema.findOne({ _id: myArray[1] })
         const bookingData = await bookingSchema.find({ portId: myArray[1], date: { $gte: today } })
         res.status(200).json({ portData, bookingData })
      }
   } catch (error) {
      res.status(500).json({ error: error })
   }
}


export const bookings = async (req: Request, res: Response) => {
   try {
      const { time, date, id, userId } = req.body;
      const port = id.split("#");
      const portId: string = port[1]
      const newDate = new Date(date)
      newDate.setDate(newDate.getDate() + 1);
      const newBooking: any = new bookingSchema({
         time,
         date:newDate,
         portId,
         userId,
      })
      await newBooking.save()
      res.status(200).json({ message: newBooking.id })
   } catch (error) {

   }
}
function getDate() {
   throw new Error("Function not implemented.");
}

