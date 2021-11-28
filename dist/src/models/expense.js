"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = exports.ExpenseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ExpenseSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true });
exports.Expense = (0, mongoose_1.model)('Expense', exports.ExpenseSchema);
