const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      trim: true,
      required: true,
      uppercase: true,
    },
    color: {
      type: String,
      trim: true,
      uppercase: true,
    },
  },
  { collection: "budgetValues" }
);

module.exports = mongoose.model("budget", budgetSchema);
