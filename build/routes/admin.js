"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminControllers_1 = require("../controllers/adminControllers");
const router = express_1.default.Router();
router.get('/getUsersData', adminControllers_1.getUserData);
router.get('/userAccess/:id', adminControllers_1.getUserAccess);
router.post('/adminLogin', adminControllers_1.adminLogin);
router.get('/getPortData', adminControllers_1.getPortData);
router.get('/portRequest/:id', adminControllers_1.portAccess);
router.get('/adminFindNewBookings', adminControllers_1.adminFindNewBookings);
router.get('/dashBoard', adminControllers_1.getDashBoardData);
router.get('/salesReport', adminControllers_1.salesReport);
exports.default = router;
