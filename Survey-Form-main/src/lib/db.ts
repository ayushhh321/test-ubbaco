import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Declare a global type for mongoose connection caching
interface GlobalWithMongooseConnection {
  mongooseConnection?: mongoose.Connection;
}

const globalWithMongoose = global as typeof global & GlobalWithMongooseConnection;

let cachedConnection: mongoose.Connection | null = null;

const connectDB = async (): Promise<mongoose.Connection> => {
  // Check if the global connection cache exists in development
  if (process.env.NODE_ENV === "development") {
    if (globalWithMongoose.mongooseConnection) {
      console.log("Using cached DB connection in development");
      return globalWithMongoose.mongooseConnection;
    }
  }

  // Return the cached connection if available
  if (cachedConnection) {
    console.log("Using cached DB connection");
    return cachedConnection;
  }

  try {
    // Establish a new connection
    const connection = await mongoose.connect(MONGODB_URI, {
      dbName: "surveyform",
      bufferCommands: false,
    });

    console.log("Connected to DB");

    // Cache the connection
    cachedConnection = connection.connection;

    // Store in global cache for development
    if (process.env.NODE_ENV === "development") {
      globalWithMongoose.mongooseConnection = cachedConnection;
    }

    return cachedConnection;
  } catch (error) {
    console.error("Error connecting to DB", error);
    throw new Error("Error connecting to DB");
  }
};

export default connectDB;
