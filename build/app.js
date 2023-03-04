"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const dataBase = require('./index');
const authUser_1 = __importDefault(require("./routes/authUser"));
const admin_1 = __importDefault(require("./routes/admin"));
const port_1 = __importDefault(require("./routes/port"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://www.smartshoping.club", "https://smartshoping.club"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
}));
app.use('/api/auth', authUser_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/port', port_1.default);
app.use('/api/user', user_1.default);
dataBase.startServer();
