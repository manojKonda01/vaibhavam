"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const db_1 = __importDefault(require("../config/db"));
dotenv_1.default.config();
const users = [
    {
        name: 'Admin User',
        email: 'admin@vaibhavam.com',
        password: 'password123',
        role: 'admin',
    },
    {
        name: 'Customer 1',
        email: 'customer@vaibhavam.com',
        password: 'password123',
        role: 'customer',
    },
    {
        name: 'Planner 1',
        email: 'planner@vaibhavam.com',
        password: 'password123',
        role: 'planner',
    }
];
const importData = async () => {
    try {
        await (0, db_1.default)();
        await User_1.default.deleteMany();
        await User_1.default.insertMany(users);
        console.log('✅ Data Imported with Default Users!');
        process.exit();
    }
    catch (error) {
        console.error('❌ Error with data import:', error);
        process.exit(1);
    }
};
const destroyData = async () => {
    try {
        await (0, db_1.default)();
        await User_1.default.deleteMany();
        console.log('✅ Data Destroyed Successfully (Rollback)!');
        process.exit();
    }
    catch (error) {
        console.error('❌ Error with data destruction:', error);
        process.exit(1);
    }
};
if (process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}
//# sourceMappingURL=seed.js.map