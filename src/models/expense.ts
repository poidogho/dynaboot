import { Schema, model } from 'mongoose';

export let ExpenseSchema: Schema = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    Date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);
export const Expense = model('Expense', ExpenseSchema);
