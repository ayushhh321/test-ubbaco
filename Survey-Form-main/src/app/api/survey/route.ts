import connectDB from "@/lib/db";
import Survey from "@/lib/models/user";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const answers: SurveyAnswers = await request.json();

    // Convert answers object to an array
    const [
      isOnlineExperienceRuined,
      willChooseUbacco,
      revolutionaryShoppingExperience,
      shoppingFrequency,
      favoriteBrand,
      annualSpending,
      name,
      email,
      phoneNumber,
    ] = Object.values(answers); // Convert object to array

    // Validate required fields
    if (!name || !email || !phoneNumber) {
      return NextResponse.json(
        { message: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { message: "Phone number must be 10 digits." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create and save survey
    const survey = new Survey({
      onlineShoppingIssues: isOnlineExperienceRuined,
      chooseUbacco: willChooseUbacco,
      revolutionaryShoppingExperience,
      shoppingFrequency,
      favoriteBrand,
      clothingSpending: annualSpending,
      name,
      email,
      phone: phoneNumber,
    });

    await survey.save();

    // Proceed with Google Sheets API call
    const glAuth = await google.auth.getClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    // Perform Google Sheets append
    await glSheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: process.env.GOOGLE_SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            isOnlineExperienceRuined,
            willChooseUbacco,
            revolutionaryShoppingExperience,
            shoppingFrequency,
            favoriteBrand,
            annualSpending,
            name,
            email,
            phoneNumber,
          ],
        ],
      },
    });

    return NextResponse.json(
      { message: "Survey submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting survey:", error);
    return NextResponse.json(
      { message: "Error submitting survey." },
      { status: 500 }
    );
  }
};
