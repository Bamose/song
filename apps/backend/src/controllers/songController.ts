import { Request, Response } from "express";
import { Song } from "../models/song";
import { SongService } from "../services/songService";

export class SongController {
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
    } catch (error) {
      res.status(400).json({ message: "Failed to create song" });
    }
  }

  static async getAllSongs(req: Request, res: Response): Promise<void> {
    try {
      const {
        artist,
        genre,
        album,
        search,
        sortBy = "createdAt",
        sortOrder = "desc",
        page = "1",
        limit = "10",
      } = req.query;

      const escapeRegExp = (value: string) =>
        value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const buildCaseInsensitiveRegex = (value: string) =>
        new RegExp(escapeRegExp(value.trim()), "i");

      const filter: Record<string, unknown> = {};

      if (typeof artist === "string" && artist.trim()) {
        filter.artist = { $regex: buildCaseInsensitiveRegex(artist) };
      }
      if (typeof genre === "string" && genre.trim()) {
        filter.genre = { $regex: buildCaseInsensitiveRegex(genre) };
      }
      if (typeof album === "string" && album.trim()) {
        filter.album = { $regex: buildCaseInsensitiveRegex(album) };
      }

      if (search && typeof search === "string") {
        const searchTerm = search.trim();
        if (searchTerm.length > 0) {
          const regex = buildCaseInsensitiveRegex(searchTerm);
          filter.$or = [
            { title: regex },
            { artist: regex },
            { album: regex },
            { genre: regex },
          ];
        }
      }

      const parsePositiveInt = (value: unknown, fallback: number): number => {
        const parsed = parseInt(String(value), 10);
        if (Number.isNaN(parsed) || parsed < 1) {
          return fallback;
        }
        return parsed;
      };

      const parsedLimit = Math.min(parsePositiveInt(limit, 10), 50);
      const parsedPage = parsePositiveInt(page, 1);

      const allowedSortFields = [
        "title",
        "artist",
        "album",
        "genre",
        "createdAt",
        "updatedAt",
      ];
      const sortField = allowedSortFields.includes(String(sortBy))
        ? String(sortBy)
        : "createdAt";
      const sortDirection: 1 | -1 =
        String(sortOrder).toLowerCase() === "asc" ? 1 : -1;
      const sortOptions: Record<string, 1 | -1> = {
        [sortField]: sortDirection,
      };

      const [songs, total] = await Promise.all([
        Song.find(filter)
          .sort(sortOptions)
          .skip((parsedPage - 1) * parsedLimit)
          .limit(parsedLimit),
        Song.countDocuments(filter),
      ]);

      const totalPages = Math.max(Math.ceil(total / parsedLimit), 1);

      res.json({
        data: songs,
        pagination: {
          total,
          page: parsedPage,
          limit: parsedLimit,
          totalPages,
          hasNextPage: parsedPage < totalPages,
          hasPrevPage: parsedPage > 1,
          sortBy: sortField,
          sortOrder: sortDirection === 1 ? "asc" : "desc",
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch songs" });
    }
  }

  static async getSongById(req: Request, res: Response): Promise<void> {
    try {
      const song = await Song.findById(req.params.id);

      if (!song) {
        res.status(404).json({ message: "Song not found" });
        return;
      }

      res.json(song);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch song" });
    }
  }

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
    } catch (error) {
      res.status(400).json({ message: "Failed to update song" });
    }
  }

  static async deleteSong(req: Request, res: Response): Promise<void> {
    try {
      const song = await Song.findByIdAndDelete(req.params.id);

      if (!song) {
        res.status(404).json({ message: "Song not found" });
        return;
      }

      res.json({ message: "Song deleted successfully", song });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete song" });
    }
  }

  static async getStatistics(req: Request, res: Response): Promise<void> {
    try {
      const stats = await SongService.getStatistics();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve statistics" });
    }
  }
}
