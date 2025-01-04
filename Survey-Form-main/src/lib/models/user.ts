import { Schema, model, models } from "mongoose";

// Define the schema for the survey responses
const surveySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email validation
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/, // Ensure 10-digit phone number
  },
  clothingSpending: {
    type: String,
    enum: ["< ₹3000", "₹3000 - ₹5000", "₹5000 - ₹7000", "> ₹7000"], // Options for spending range
  },
  shoppingFrequency: {
    type: String,
    enum: [
      "Once a month",
      "2-3 times a month",
      "Once every 2-3 months",
      "Once every 4-6 months",
      "Once a year or less",
    ], // Shopping frequency
  },
  favoriteBrand: {
    type: String, // Optional field for user’s favorite brand
    trim: true,
  },
  chooseUbacco: {
    type: String,
    enum: ["Yes", "No"], // Answer to whether they'd choose your brand
  },
  onlineShoppingIssues: {
    type: String,
    enum: ["Yes", "No"], // Answer to issues faced with online shopping
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-sets the creation date
  },
});

// Use existing Survey model or create a new one
const Survey = models.Survey || model("Survey", surveySchema);

export default Survey;
