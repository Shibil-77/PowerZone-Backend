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
exports.bookings = exports.findPortData = exports.mapData = exports.addMapValue = exports.addChargingPort = void 0;
const portSchema_1 = __importDefault(require("../models/portSchema"));
const bookingSchema_1 = __importDefault(require("../models/bookingSchema"));
const addChargingPort = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { kW, rate, dayDetail, type, location, city, postalCode, country, userId } = req.body;
        if (req.body) {
            const newPort = new portSchema_1.default({
                kW, rate, dayDetail, type, location, city, postalCode, country, userId, access: false
            });
            yield newPort.save();
            res.status(200).json({ message: newPort.id });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "error" });
    }
});
exports.addChargingPort = addChargingPort;
const addMapValue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { map, id } = req.body;
        if (req.body) {
            const myArray = id.split("#");
            yield portSchema_1.default.updateOne({ _id: myArray[1] }, { $set: { map: map } });
            res.status(200).json({ message: "MapValue successfully added" });
        }
        else {
            return res.status(404).json({ message: "server error" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "server error" });
    }
});
exports.addMapValue = addMapValue;
const mapData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mapValue = yield portSchema_1.default.find({ access: true });
        if (mapValue) {
            res.status(200).json(mapValue);
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
});
exports.mapData = mapData;
const findPortData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, portId } = req.body;
        if (portId) {
            const today = new Date();
            const myArray = portId.split("#");
            const portData = yield portSchema_1.default.findOne({ _id: myArray[1] });
            const bookingData = yield bookingSchema_1.default.find({ portId: myArray[1], date: { $gte: today } });
            res.status(200).json({ portData, bookingData });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.findPortData = findPortData;
const bookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { time, date, id, userId } = req.body;
        const port = id.split("#");
        const portId = port[1];
        const newBooking = new bookingSchema_1.default({
            time,
            date,
            portId,
            userId,
        });
        yield newBooking.save();
        res.status(200).json({ message: newBooking.id });
    }
    catch (error) {
    }
});
exports.bookings = bookings;
