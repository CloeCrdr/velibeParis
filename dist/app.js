"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("./config/db.config"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
db_config_1.default.connect((err) => {
    if (err)
        return err;
});
const app = (0, express_1.default)();
const port = 3001;
app.set('view engine', 'ejs');
app.use((0, cors_1.default)());
app.use('/api/login', userRoutes_1.default);
