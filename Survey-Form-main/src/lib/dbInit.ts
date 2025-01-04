"use server";
import connectDB from "./db"; // Your database connection logic
import fetch from 'node-fetch'; // Without 'node:' prefix
// Required for making API calls

// Initialize DB connection and make multiple API calls
export const initializeDbAndTriggerApi = async () => {
  try {
    // Connect to the DB
    await connectDB();
    console.log("Database connected during Next.js server startup");

    // Trigger API Call for `/api/userForm` route
    const userFormApiUrl = `${process.env.BASE_URL}/api/userForm`;
    const userFormResponse = await fetch(userFormApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Dummy User",
        gender: "Male",
        email: "dummyuser@example.com",
        age: 30,
        pincode: "123456",
        phoneNumber: "1234567890",
      }),
    });

    if (!userFormResponse.ok) {
      console.error("Error in triggering the API call for userForm:", userFormResponse.statusText);
    } else {
      console.log("API call for userForm triggered successfully!");
    }

    // Trigger API Call for `/api/survey` route with dummy data
    const surveyApiUrl = `${process.env.BASE_URL}/api/survey`;
    const surveyResponse = await fetch(surveyApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "isOnlineExperienceRuined": "Yes", // Valid values: 'true' or 'false'
        "willChooseUbacco": "Yes", // Valid values: 'true' or 'false'
        "revolutionaryShoppingExperience": "Very Positive", // Match valid enum values
        "shoppingFrequency": "Once a month", // Correct enum values like 'Daily', 'Weekly', 'Monthly', etc.
        "favoriteBrand": "dfasf", // Any string is valid
        "clothingSpending": "< ₹3000", // Any integer is valid
        "name": "siddhart",
        "email": "siddharth@gmail.com",
        "phone": "2222222222"
      }),
    });

    if (!surveyResponse.ok) {
      console.error("Error in triggering the API call for survey:", surveyResponse.statusText);
    } else {
      console.log("API call for survey triggered successfully!");
    }
  } catch (error) {
    console.error("Error initializing DB or triggering APIs:", error);
  }
};
