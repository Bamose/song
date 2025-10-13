export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SortOrder = "asc" | "desc";

export type SongSortField =
  | "title"
  | "artist"
  | "album"
  | "genre"
  | "createdAt"
  | "updatedAt";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  sortBy?: SongSortField;
  sortOrder?: SortOrder;
}

export interface PaginatedSongs {
  data: Song[];
  pagination: PaginationMeta;
}

export interface SongsByCategory {
  _id: string;
  count: number;
}

export interface SongsByAlbum extends SongsByCategory {
  artist: string;
}

export interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: SongsByCategory[];
  songsByArtist: SongsByCategory[];
  songsByAlbum: SongsByAlbum[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface SongFormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface SongFilters {
  artist?: string;
  genre?: string;
  album?: string;
  search?: string;
  sortBy?: SongSortField;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}
