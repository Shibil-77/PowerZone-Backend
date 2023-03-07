"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authMiddleware = require("../middleware/authMiddleware");
const user_1 = require("../controllers/user");
router.get('/getProfileData', authMiddleware, user_1.getProfileData);
router.get("/findNewBookings", authMiddleware, user_1.findNewBookings);
router.get('/portDetailsFinding', authMiddleware, user_1.portDetailsFinding);
router.get('/deletePort/:id', authMiddleware, user_1.deleteChargingPort);
router.get('/bookingCancel/:id', authMiddleware, user_1.bookingCancel);
router.get('/userPortBooking', authMiddleware, user_1.userPortBooking);
router.get('/addAdmin', user_1.addAdmin);
exports.default = router;
