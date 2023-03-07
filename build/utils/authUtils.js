"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSenders = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const emailSenders = (email, id, fullName, url) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 587,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    yield transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Email verification from powerZone",
        text: `Hi ${fullName},\n\nPlease verify your account by clicking 
        https://smartshoping.club/${url}/${id}
        \nThanks `
    });
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userSchema_1.default.updateOne({ _id: id }, { $unset: { timeRanges: 1 } });
    }), 6000 * 20);
});
exports.emailSenders = emailSenders;
