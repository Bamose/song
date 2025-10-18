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
      const buildRegexPattern = (value: string) => escapeRegExp(value.trim());

      const conditions: Array<Record<string, unknown>> = [];

      if (typeof artist === "string" && artist.trim()) {
        conditions.push({
          artist: { $regex: buildRegexPattern(artist), $options: "i" },
        });
      }
      if (typeof genre === "string" && genre.trim()) {
        conditions.push({
          genre: { $regex: buildRegexPattern(genre), $options: "i" },
        });
      }
      if (typeof album === "string" && album.trim()) {
        conditions.push({
          album: { $regex: buildRegexPattern(album), $options: "i" },
        });
      }

      if (search && typeof search === "string") {
        const searchTerm = search.trim();
        if (searchTerm.length > 0) {
          const pattern = buildRegexPattern(searchTerm);
          conditions.push({
            $or: [
              { title: { $regex: pattern, $options: "i" } },
              { artist: { $regex: pattern, $options: "i" } },
              { album: { $regex: pattern, $options: "i" } },
              { genre: { $regex: pattern, $options: "i" } },
            ],
          });
        }
      }

      const finalFilter: Record<string, unknown> =
        conditions.length > 1 ? { $and: conditions } : conditions[0] || {};

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

      let songs: unknown[] = [];
      let total = 0;

      // If searching, boost results where the title matches, giving it higher weight
      const isSearching = typeof search === "string" && search.trim().length > 0;
      if (isSearching) {
        const searchTerm = (search as string).trim();
        const pattern = buildRegexPattern(searchTerm);

        const titleExact = `^${pattern}$`;
        const titleStarts = `^${pattern}`;

        const sortStage: Record<string, 1 | -1> = { score: -1, ...sortOptions };

        const pipeline: object[] = [
          { $match: finalFilter },
          {
            $addFields: {
              score: {
                $add: [
                  // Title has the highest weight (exact > startsWith > contains)
                  {
                    $cond: [
                      { $regexMatch: { input: "$title", regex: titleExact, options: "i" } },
                      100,
                      {
                        $cond: [
                          { $regexMatch: { input: "$title", regex: titleStarts, options: "i" } },
                          60,
                          {
                            $cond: [
                              { $regexMatch: { input: "$title", regex: pattern, options: "i" } },
                              40,
                              0,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  // Other fields contribute smaller weights
                  { $cond: [{ $regexMatch: { input: "$artist", regex: pattern, options: "i" } }, 10, 0] },
                  { $cond: [{ $regexMatch: { input: "$album", regex: pattern, options: "i" } }, 8, 0] },
                  { $cond: [{ $regexMatch: { input: "$genre", regex: pattern, options: "i" } }, 5, 0] },
                ],
              },
            },
          },
          { $sort: sortStage },
          { $project: { score: 0 } },
          { $skip: (parsedPage - 1) * parsedLimit },
          { $limit: parsedLimit },
        ];

        const [docs, count] = await Promise.all([
          Song.aggregate(pipeline as any),
          Song.countDocuments(finalFilter),
        ]);

        songs = docs;
        total = count;
      } else {
        const [docs, count] = await Promise.all([
          Song.find(finalFilter)
            .sort(sortOptions)
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit),
          Song.countDocuments(finalFilter),
        ]);
        songs = docs as unknown[];
        total = count;
      }

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
