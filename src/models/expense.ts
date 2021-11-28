import { Schema, model } from 'mongoose';

export const ExpenseSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);
export const Expense = model('Expense', ExpenseSchema);
