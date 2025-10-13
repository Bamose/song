import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Song,
  Statistics,
  SongFormData,
  SongFilters,
  PaginatedSongs,
  PaginationMeta,
} from "@song-app/types";

export type FetchSongsPayload = SongFilters & { silent?: boolean };

interface SongState {
  songs: Song[];
  statistics: Statistics | null;
  selectedSong: Song | null;
  filters: SongFilters;
  pagination: PaginationMeta | null;
  isFetching: boolean;
  isMutating: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  statistics: null,
  selectedSong: null,
  filters: {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  pagination: null,
  isFetching: false,
  isMutating: false,
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (
      state,
      action: PayloadAction<FetchSongsPayload | undefined>
    ) => {
      const payload = action.payload;
      const silent = payload?.silent ?? false;
      state.isFetching = !silent;
      state.error = null;

      if (payload) {
        const { silent: _silent, ...incomingFilters } = payload;
        const filters = state.filters as Record<string, unknown>;
        Object.entries(incomingFilters).forEach(([key, value]) => {
          if (value === undefined || value === null) {
            delete filters[key];
          } else {
            filters[key] = value as unknown;
          }
        });
      }
    },
    fetchSongsSuccess: (state, action: PayloadAction<PaginatedSongs>) => {
      state.isFetching = false;
      state.songs = action.payload.data;
      state.pagination = action.payload.pagination;
      state.filters.page = action.payload.pagination.page;
      state.filters.limit = action.payload.pagination.limit;
      if (action.payload.pagination.sortBy) {
        state.filters.sortBy = action.payload.pagination.sortBy;
      }
      if (action.payload.pagination.sortOrder) {
        state.filters.sortOrder = action.payload.pagination.sortOrder;
      }
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    createSongRequest: (state, action: PayloadAction<SongFormData>) => {
      state.isMutating = true;
      state.error = null;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.isMutating = false;
      state.songs.unshift(action.payload);

      if (state.pagination) {
        const { limit, page } = state.pagination;
        if (limit && state.songs.length > limit) {
          state.songs.pop();
        }

        const total = (state.pagination.total ?? 0) + 1;
        state.pagination.total = total;
        if (limit) {
          state.pagination.totalPages = Math.ceil(total / limit);
          state.pagination.hasNextPage = page < state.pagination.totalPages;
        } else {
          state.pagination.totalPages = 1;
          state.pagination.hasNextPage = false;
        }
        state.pagination.hasPrevPage = page > 1;
      }
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.isMutating = false;
      state.error = action.payload;
    },

    updateSongRequest: (
      state,
      action: PayloadAction<{ id: string; data: SongFormData }>
    ) => {
      state.isMutating = true;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.isMutating = false;
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.selectedSong = null;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.isMutating = false;
      state.error = action.payload;
    },

    deleteSongRequest: (state, action: PayloadAction<string>) => {
      state.isMutating = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.isMutating = false;
      state.songs = state.songs.filter((song) => song._id !== action.payload);

      if (state.pagination) {
        const { limit } = state.pagination;
        const previousPage = state.pagination.page;
        const total = Math.max((state.pagination.total ?? 0) - 1, 0);
        state.pagination.total = total;

        let nextPage = previousPage;
        if (total === 0) {
          nextPage = 1;
        } else if (state.songs.length === 0 && previousPage > 1) {
          nextPage = previousPage - 1;
        }

        state.pagination.page = nextPage;
        state.filters.page = nextPage;

        if (limit) {
          const totalPages =
            total === 0 ? 1 : Math.max(Math.ceil(total / limit), 1);
          state.pagination.totalPages = totalPages;
          state.pagination.hasNextPage =
            nextPage < totalPages && total > 0;
          state.pagination.hasPrevPage = nextPage > 1;
        } else {
          state.pagination.totalPages = 1;
          state.pagination.hasNextPage = false;
          state.pagination.hasPrevPage = nextPage > 1;
        }
      }
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.isMutating = false;
      state.error = action.payload;
    },

    fetchStatisticsRequest: (state) => {
      state.error = null;
    },
    fetchStatisticsSuccess: (state, action: PayloadAction<Statistics>) => {
      state.statistics = action.payload;
    },
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    selectSong: (state, action: PayloadAction<Song | null>) => {
      state.selectedSong = action.payload;
    },
    setFilters: (state, action: PayloadAction<SongFilters>) => {
      const filters = state.filters as Record<string, unknown>;
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          delete filters[key];
        } else {
          filters[key] = value as unknown;
        }
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
  selectSong,
  setFilters,
  clearError,
} = songSlice.actions;

export default songSlice.reducer;
