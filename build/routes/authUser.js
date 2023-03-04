"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const router = express_1.default.Router();
router.post('/register', authControllers_1.register);
router.get('/verify/:userId', authControllers_1.verifyRegistration);
router.get('/timeReset/:id', authControllers_1.emailReset);
router.post('/login', authControllers_1.login);
router.post('/forgotPassword', authControllers_1.forgotPassword);
router.post('/resetPassword/:id/', authControllers_1.resetPassword);
exports.default = router;
