import { Song } from "../models/song";

export interface SongStatistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: Array<{ _id: string; count: number }>;
  songsByArtist: Array<{ _id: string; count: number }>;
  songsByAlbum: Array<{ _id: string; count: number; artist: string }>;
}

export class SongService {
  static async getStatistics(): Promise<SongStatistics> {
    try {
      // Total songs
      const totalSongs = await Song.countDocuments();

      // Total unique artists
      const artists = await Song.distinct("artist");
      const totalArtists = artists.length;

      // Total unique albums
      const albums = await Song.distinct("album");
      const totalAlbums = albums.length;

      // Total unique genres
      const genres = await Song.distinct("genre");
      const totalGenres = genres.length;

      // Songs count by genre
      const songsByGenre = await Song.aggregate([
        { $group: { _id: "$genre", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      // Songs count by artist
      const songsByArtist = await Song.aggregate([
        { $group: { _id: "$artist", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      // Songs count by album (with artist info)
      const songsByAlbum = await Song.aggregate([
        {
          $group: {
            _id: "$album",
            count: { $sum: 1 },
            artist: { $first: "$artist" },
          },
        },
        { $sort: { count: -1 } },
      ]);

      return {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        songsByGenre,
        songsByArtist,
        songsByAlbum,
      };
    } catch (error) {
      throw new Error(`Failed to get statistics: ${error}`);
    }
  }
}
