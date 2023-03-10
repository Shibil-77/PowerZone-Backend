"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
router.get('/getProfileData', authMiddleware, userController_1.getProfileData);
router.get("/findNewBookings", authMiddleware, userController_1.findNewBookings);
router.get('/portDetailsFinding', authMiddleware, userController_1.portDetailsFinding);
router.get('/deletePort/:id', authMiddleware, userController_1.deleteChargingPort);
router.get('/bookingCancel/:id', authMiddleware, userController_1.bookingCancel);
router.get('/userPortBooking', authMiddleware, userController_1.userPortBooking);
// router.get('/addAdmin',addAdmin)
exports.default = router;
