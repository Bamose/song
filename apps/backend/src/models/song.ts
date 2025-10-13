import mongoose, { Schema, Document, Types } from "mongoose";
import { Song as ISong } from "@song-app/types";

export interface SongDocument
  extends Omit<ISong, "_id" | "createdAt" | "updatedAt">,
    Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SongSchema = new Schema<SongDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "Artist is required"],
      trim: true,
    },
    album: {
      type: String,
      required: [true, "Album is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
SongSchema.index({ artist: 1 });
SongSchema.index({ genre: 1 });
SongSchema.index({ album: 1 });

export const Song = mongoose.model<SongDocument>("Song", SongSchema);
