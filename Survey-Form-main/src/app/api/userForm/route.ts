import connectDB from "@/lib/db";
import UserForm from "@/lib/models/userForm";
import { NextResponse } from "next/server";
import { google } from "googleapis";

export const POST = async (request: Request) => {
  try {
    const { name, gender, email, age, pincode, phoneNumber } = await request.json();

    // Validation
    if (!name || !email || !phoneNumber) {
      return NextResponse.json(
        { message: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { message: "Phone number must be 10 digits." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Create and save the user form
    const userForm = new UserForm({
      name,
      gender,
      email,
      age,
      pincode,
      phoneNumber,
    });

    await userForm.save();

    // Google Sheets API call
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
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_IDUSER,
      range: process.env.GOOGLE_SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, gender, email, age, pincode, phoneNumber]],
      },
    });

    // Successful response after database and Google Sheets processing
    return NextResponse.json(
      { message: "Form submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Error submitting form." },
      { status: 500 }
    );
  }
};
