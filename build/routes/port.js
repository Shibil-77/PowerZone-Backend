"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware = require("../middleware/authMiddleware");
const portController_1 = require("../controllers/portController");
const router = express_1.default.Router();
router.post('/addChargingPort', authMiddleware, portController_1.addChargingPort);
router.patch('/addMapValue', authMiddleware, portController_1.addMapValue);
router.get('/mapData', authMiddleware, portController_1.mapData);
router.post("/findPortData", authMiddleware, portController_1.findPortData);
router.post('/booking', authMiddleware, portController_1.bookings);
exports.default = router;
