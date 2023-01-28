import nodemailer from 'nodemailer'
import userSchema from '../models/userSchema'

export const emailSenders =async (email:string,id:string,fullName:string,url:string)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 587,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      })
  
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Email verification from powerZone",
        text:`Hi ${fullName},\n\nPlease verify your account by clicking 
        http://localhost:3000/${url}/${id}
        \nThanks `
      })
       setTimeout(async() => {
         await userSchema.updateOne({_id:id},{ $unset: { timeRanges: 1}})
      }, 6000*20);
}