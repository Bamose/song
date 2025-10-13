import { Request, Response } from "express";
import { Song } from "../models/song";
import { SongService } from "../services/songService";

export class SongController {
  // Create a new song
  static async createSong(req: Request, res: Response): Promise<void> {
    try {
      const { title, artist, album, genre } = req.body;

      const song = new Song({
        title,
        artist,
        album,
        genre,
      });

      const savedSong = await song.save();
      res.status(201).json(savedSong);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all songs with optional filters
  static async getAllSongs(req: Request, res: Response): Promise<void> {
    try {
      const { artist, genre, album } = req.query;
      const filter: any = {};

      if (artist) filter.artist = artist;
      if (genre) filter.genre = genre;
      if (album) filter.album = album;

      const songs = await Song.find(filter).sort({ createdAt: -1 });
      res.json(songs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a single song by ID
  static async getSongById(req: Request, res: Response): Promise<void> {
    try {
      const song = await Song.findById(req.params.id);

      if (!song) {
        res.status(404).json({ message: "Song not found" });
        return;
      }

      res.json(song);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a song
  static async updateSong(req: Request, res: Response): Promise<void> {
    try {
      const { title, artist, album, genre } = req.body;

      const song = await Song.findByIdAndUpdate(
        req.params.id,
        { title, artist, album, genre },
        { new: true, runValidators: true }
      );

      if (!song) {
        res.status(404).json({ message: "Song not found" });
        return;
      }

      res.json(song);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a song
  static async deleteSong(req: Request, res: Response): Promise<void> {
    try {
      const song = await Song.findByIdAndDelete(req.params.id);

      if (!song) {
        res.status(404).json({ message: "Song not found" });
        return;
      }

      res.json({ message: "Song deleted successfully", song });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get statistics
  static async getStatistics(req: Request, res: Response): Promise<void> {
    try {
      const stats = await SongService.getStatistics();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
