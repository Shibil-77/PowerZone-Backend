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
exports.resetPassword = exports.forgotPassword = exports.login = exports.emailReset = exports.verifyRegistration = exports.register = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const jwt_1 = require("../utils/jwt");
const authUtils_1 = require("../utils/authUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password, phone, confirmPassword } = req.body;
        if (fullName !== null && email !== null && phone !== null && password !== null) {
            if (password === confirmPassword) {
                const userExist = yield userSchema_1.default.findOne({ email: email });
                if (!userExist && (userExist === null || userExist === void 0 ? void 0 : userExist.isVerified)) {
                    if (phone !== null && phone !== undefined && phone.length == 10) {
                        const emailValid = emailRegex.test(email);
                        if (emailValid) {
                            let timeRanges = Math.floor((Math.random() * 1000000) + 1);
                            const bcryptPassword = yield bcrypt_1.default.hash(password, 10);
                            const newUser = new userSchema_1.default({
                                fullName, email, phone, password: bcryptPassword, date: new Date, isVerified: false, timeRanges, access: true
                            });
                            yield newUser.save();
                            const url = 'verify';
                            yield (0, authUtils_1.emailSenders)(email, newUser.id, newUser.fullName, url);
                            res.status(200).json({ message: "User created successfully", userId: newUser.id, timeRanges });
                        }
                        else {
                            res.status(400).json({ message: "Invalid Email" });
                        }
                    }
                    else {
                        res.status(400).json({ message: "Invalid phone number" });
                    }
                }
                else {
                    return res.status(400).json({ message: "User already exist" });
                }
            }
            else {
                res.status(400).json({ message: "Passwords do not match" });
            }
        }
        else {
            return res.status(400).json({ message: "Please fill all fields" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
});
exports.register = register;
const verifyRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield userSchema_1.default.findById({ _id: userId });
        if (user) {
            if (user.timeRanges) {
                user.isVerified = true;
                user.save();
                const { fullName, _id } = user;
                const token = yield (0, jwt_1.generateToken)(user.id);
                res.status(200).json({ message: "User verified successfully", user, token });
            }
            else {
                res.status(400).json({ message: "User not verified time is over limit" });
            }
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'server error' });
    }
});
exports.verifyRegistration = verifyRegistration;
const emailReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userSchema_1.default.findById({ _id: id });
        if (user) {
            const timeRange = Math.floor((Math.random() * 1000 + 1));
            user.timeRanges = timeRange;
            yield user.save();
            const url = 'verify';
            yield (0, authUtils_1.emailSenders)(user.email, user.id, user.fullName, url);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "server error" });
    }
});
exports.emailReset = emailReset;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email !== null && password !== null) {
            const emailValid = emailRegex.test(email);
            if (emailValid) {
                const user = yield userSchema_1.default.findOne({ email: email });
                if (user) {
                    if (user === null || user === void 0 ? void 0 : user.access) {
                        if (yield bcrypt_1.default.compare(password, user.password)) {
                            const token = yield (0, jwt_1.generateToken)(user.id);
                            res.status(200).json({ message: "Login successful", token, user });
                        }
                        else {
                            res.status(400).json({ message: "Invalid password" });
                        }
                    }
                    else {
                        res.status(400).json({ message: "Blocked This Account" });
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
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email !== null) {
            const emailValid = emailRegex.test(email);
            if (emailValid) {
                const user = yield userSchema_1.default.findOne({ email: email });
                if (user) {
                    const url = 'resetPassword';
                    yield (0, authUtils_1.emailSenders)(email, user.id, user.fullName, url);
                    res.status(200).json({ message: "Email sent" });
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
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { password, confirmPassword } = req.body;
        if (userId !== null && password !== null && password.length <= 8) {
            const user = yield userSchema_1.default.findById({ _id: userId });
            if (user) {
                const bcryptPassword = yield bcrypt_1.default.hash(password, 10);
                if (bcryptPassword) {
                    user.password = yield bcrypt_1.default.hash(password, 10);
                    yield user.save();
                    res.status(200).json({ message: "Password reset successful" });
                }
                else {
                    res.status(400).json({ message: "Invalid password" });
                }
            }
            else {
                res.status(400).json({ message: "User not found" });
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
exports.resetPassword = resetPassword;
