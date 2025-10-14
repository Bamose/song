import dotenv from "dotenv";
import mongoose from "mongoose";
import { logger } from "@song-app/utils";
import { connectDB } from "./config/db";
import { Song } from "./models/song";

dotenv.config();

const seedSongs = [
  {
    title: "Neon Mirage",
    artist: "Aurora Bloom",
    album: "Midnight Canvas",
    genre: "Synthwave",
  },
  {
    title: "Chromatic Dreams",
    artist: "Aurora Bloom",
    album: "Electric Pulse",
    genre: "Indie Pop",
  },
  {
    title: "Skyline Reverie",
    artist: "Aurora Bloom",
    album: "City Lights",
    genre: "Ambient",
  },
  {
    title: "Pulse Runner",
    artist: "Neon Drift",
    album: "Electric Pulse",
    genre: "Synthwave",
  },
  {
    title: "Strobe Horizon",
    artist: "Neon Drift",
    album: "Waves of Glass",
    genre: "Alternative Rock",
  },
  {
    title: "Static Love",
    artist: "Neon Drift",
    album: "Celestial Lines",
    genre: "Indie Pop",
  },
  {
    title: "Rainy Avenue",
    artist: "Echo Street",
    album: "City Lights",
    genre: "Jazz Fusion",
  },
  {
    title: "Late Night Signals",
    artist: "Echo Street",
    album: "Midnight Canvas",
    genre: "Alternative Rock",
  },
  {
    title: "Concrete Lanterns",
    artist: "Echo Street",
    album: "Electric Pulse",
    genre: "Indie Pop",
  },
  {
    title: "Satin Sunsets",
    artist: "Velvet Horizon",
    album: "Waves of Glass",
    genre: "Ambient",
  },
  {
    title: "Golden Paradox",
    artist: "Velvet Horizon",
    album: "Celestial Lines",
    genre: "Jazz Fusion",
  },
  {
    title: "Ivory Echo",
    artist: "Velvet Horizon",
    album: "City Lights",
    genre: "Synthwave",
  },
  {
    title: "Tidal Bloom",
    artist: "Solaris Tide",
    album: "Celestial Lines",
    genre: "Ambient",
  },
  {
    title: "Luminary Drift",
    artist: "Solaris Tide",
    album: "Waves of Glass",
    genre: "Jazz Fusion",
  },
  {
    title: "Orbital Trails",
    artist: "Solaris Tide",
    album: "Midnight Canvas",
    genre: "Alternative Rock",
  },
];

const seed = async (): Promise<void> => {
  try {
    await connectDB();
    await Song.deleteMany({});
    await Song.insertMany(seedSongs);
    logger.success(`Seeded ${seedSongs.length} songs successfully.`);
  } catch (error) {
    logger.error("Failed to seed songs", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    logger.log("Database connection closed.");
  }
};

void seed();
