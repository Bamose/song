import mongoose from "mongoose";
import { logger } from "@song-app/utils";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/songdb";

    await mongoose.connect(mongoURI);

    logger.log("✅ MongoDB connected successfully");
  } catch (error) {
    logger.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  logger.log("⚠️  MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  logger.error("❌ MongoDB error:", error);
});
