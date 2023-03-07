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
exports.getDashBoardData = exports.adminFindNewBookings = exports.portAccess = exports.getPortData = exports.adminLogin = exports.getUserAccess = exports.getUserData = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = __importDefault(require("../models/admin"));
const jwt_1 = require("../utils/jwt");
const portSchema_1 = __importDefault(require("../models/portSchema"));
const bookingSchema_1 = __importDefault(require("../models/bookingSchema"));
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield userSchema_1.default.find();
        if (userData) {
            res.status(200).json(userData);
        }
        else {
            res.status(500).json({ message: "server error" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
});
exports.getUserData = getUserData;
const getUserAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userData = yield userSchema_1.default.findOne({ _id: id });
        if (userData) {
            if (userData.access) {
                userData.access = false;
            }
            else {
                userData.access = true;
            }
            const result = yield userData.save();
            if (result) {
                res.status(200).json('success');
            }
            else {
                res.status(500).json('server error');
            }
        }
        else {
            res.status(500).json('server error');
        }
    }
    catch (error) {
        res.status(500).json('server error');
    }
});
exports.getUserAccess = getUserAccess;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email !== null && password !== null) {
            const emailValid = emailRegex.test(email);
            if (emailValid) {
                const admin = yield admin_1.default.findOne({ email: email });
                if (admin) {
                    if (yield bcrypt_1.default.compare(password, admin.password)) {
                        const adminToken = yield (0, jwt_1.generateToken)(admin.id);
                        res.status(200).json({ message: "Admin Login successful", admin, adminToken });
                    }
                    else {
                        res.status(400).json({ message: "Invalid password" });
                    }
                }
                else {
                    res.status(400).json({ message: "Invalid email" });
                }
            }
            else {
                res.status(400).json({ message: "Invalid email" });
            }
        }
        else {
            res.status(400).json({ message: "Please fill all fields" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
});
exports.adminLogin = adminLogin;
const getPortData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portData = yield portSchema_1.default.find();
        if (portData) {
            res.status(200).json(portData);
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
});
exports.getPortData = getPortData;
const portAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const portData = yield portSchema_1.default.findOne({ _id: id });
        if (portData) {
            if (portData.access) {
                portData.access = false;
            }
            else {
                portData.access = true;
            }
            const result = yield portData.save();
            if (result) {
                res.status(200).json('success');
            }
            else {
                res.status(500).json('server error');
            }
        }
        else {
            res.status(500).json('server error');
        }
    }
    catch (error) {
        res.status(500).json('server error');
    }
});
exports.portAccess = portAccess;
const adminFindNewBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = yield bookingSchema_1.default.find();
        if (bookingData) {
            res.status(200).json(bookingData);
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
});
exports.adminFindNewBookings = adminFindNewBookings;
const getDashBoardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = yield bookingSchema_1.default.aggregate([
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: '$date' }
                    },
                    count: { $count: {} }
                }
            }
        ]);
        console.log(bookingData, "bookingData");
        return res.status(200).json(bookingData);
        // if (bookingData) {
        //    res.status(200).json(bookingData)
        // }
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
});
exports.getDashBoardData = getDashBoardData;
