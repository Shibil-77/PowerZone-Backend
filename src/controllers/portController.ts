import { Express, Request, Response } from "express";
import portSchema from "../models/portSchema"

export const addChargingPort = async(req:Request,res:Response)=>{
    try {
    const {kW,rate,dayStart,dayEnd,timeStart,timeEnd,type,address,city,postalCode,country,userId} = req.body
       if(req.body) {
            console.log(dayEnd);
            
             const newPort  = new portSchema({
                kW,rate,dayStart,dayEnd,timeStart,timeEnd,type,address,city,postalCode,country,userId,access:false
             })
              console.log(newPort);
              
             await newPort.save()
              console.log(newPort);
              
             res.status(200).json({message:"success"})
       }      
    } catch (error) {
            return res.status(500).json({message:"error"})
    }
}