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
exports.getUserAccess = exports.getUserData = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield userSchema_1.default.find();
        console.log(userData);
        if (userData) {
            res.status(200).json(userData);
        }
        else {
            res.status(500).json({ message: "server error" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});
exports.getUserData = getUserData;
const getUserAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        const userData = yield userSchema_1.default.findOne({ _id: id });
        if (userData) {
            console.log(userData.access);
            if (userData.access) {
                userData.access = false;
            }
            else {
                userData.access;
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
