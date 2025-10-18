import mongoose from "mongoose";
import dns from "node:dns";
import { logger } from "@song-app/utils";

export const connectDB = async (): Promise<void> => {
  // Optional: allow overriding DNS servers to avoid corporate resolver issues
  const dnsServers = process.env.DNS_SERVERS?.split(",").map((s) => s.trim()).filter(Boolean);
  if (dnsServers && dnsServers.length > 0) {
    try {
      dns.setServers(dnsServers);
      logger.info(`Using custom DNS servers: ${dnsServers.join(", ")}`);
    } catch (e) {
      logger.warn("Failed to set custom DNS servers:", e);
    }
  }
  const primaryUri = process.env.MONGO_URI || "mongodb://localhost:27017/songdb";
  const fallbacks = [
    process.env.MONGO_URI_FALLBACK,
    // local dev default
    "mongodb://127.0.0.1:27017/songdb",
  ].filter(Boolean) as string[];

  const commonOptions: mongoose.ConnectOptions = {
    serverSelectionTimeoutMS: 10000,
    family: 4, // prefer IPv4 to avoid IPv6 DNS quirks on Windows
  };

  const tryConnect = async (uri: string) => {
    logger.info(`Attempting MongoDB connection -> ${uri}`);
    await mongoose.connect(uri, commonOptions);
  };

  try {
    await tryConnect(primaryUri);
    logger.success("MongoDB connected successfully");
    return;
  } catch (error: any) {
    const message = String(error?.message || error);
    const isDnsSrvIssue =
      message.includes("queryTxt") ||
      message.includes("ENOTFOUND") ||
      message.includes("ETIMEDOUT");

    logger.error("MongoDB connection error on primary URI:", message);

    if (!isDnsSrvIssue || fallbacks.length === 0) {
      throw error;
    }

    for (const uri of fallbacks) {
      try {
        await tryConnect(uri);
        logger.success(`MongoDB connected using fallback URI: ${uri}`);
        return;
      } catch (fallbackError) {
        logger.warn(`Fallback connection failed for ${uri}:`, fallbackError);
      }
    }

    throw error;
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  logger.error("MongoDB error:", error);
});
