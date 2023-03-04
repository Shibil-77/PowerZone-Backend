"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// {kW,rate,dayStart,dayEnd,timeStart,timeEnd,type,address,city,postalCode,country}
const portSchema = new mongoose_1.default.Schema({
    kW: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    dayDetail: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    map: {
        type: Array
    },
    userId: {
        type: String,
        require: true
    },
    access: {
        type: Boolean,
        required: true
    }
});
exports.default = mongoose_1.default.model("portSchema", portSchema);
