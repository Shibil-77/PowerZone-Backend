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
exports.userPortBooking = exports.bookingCancel = exports.deleteChargingPort = exports.portDetailsFinding = exports.findNewBookings = exports.getProfileData = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bookingSchema_1 = __importDefault(require("../models/bookingSchema"));
const portSchema_1 = __importDefault(require("../models/portSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const getProfileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield userSchema_1.default.findOne({ _id: req.body.userId }, { password: 0 });
        const newBookings = yield bookingSchema_1.default.countDocuments({ userId: req.body.userId }, { date: { $gte: new Date() } });
        const portData = yield portSchema_1.default.countDocuments({ userId: req.body.userId });
        if (newBookings !== null && portData !== null && userData !== null) {
            res.status(200).send({ newBookings, portData, userData });
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.getProfileData = getProfileData;
const findNewBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const newBookings = yield bookingSchema_1.default.find({ userId: req.body.userId, date: { $gte: today } });
        if (newBookings) {
            res.status(200).send({ newBookings });
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.findNewBookings = findNewBookings;
const portDetailsFinding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chargingData = yield portSchema_1.default.find({ userId: req.body.userId });
        if (chargingData) {
            res.status(200).send({ chargingData });
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.portDetailsFinding = portDetailsFinding;
const deleteChargingPort = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield portSchema_1.default.deleteOne({ _id: req.params.id });
        res.status(200).send({ massage: "successFully deleted" });
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.deleteChargingPort = deleteChargingPort;
const bookingCancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookingSchema_1.default.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) });
        res.status(200).send({ massage: "successFully booking Cancel" });
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.bookingCancel = bookingCancel;
const userPortBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portData = yield portSchema_1.default.find({ userId: req.body.userId });
        const filterData = portData.map((data) => data.id);
        if (portData) {
            const bookingData = yield bookingSchema_1.default.find({ portId: { $in: filterData } });
            res.status(200).send(bookingData);
        }
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.userPortBooking = userPortBooking;
